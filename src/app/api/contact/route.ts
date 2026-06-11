import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email?: string;
  whatsapp: string;
  city?: string;
  subject: string;
  message?: string;
  puppyName?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  general: 'Renseignement general',
  reserve: 'Reservation',
  visit: 'Visite',
  'video-call': 'Appel video',
  'waiting-list': "Liste d'attente",
};

function esc(s: string): string {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Notify Zayd on Telegram (via @Perclubmarocbot). Best-effort, never blocks the response.
async function notifyTelegram(data: ContactFormData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_LEAD_CHAT_ID || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    console.log('[Telegram] not configured, skipping lead notification');
    return;
  }

  const wa = String(data.whatsapp || '').replace(/[^0-9]/g, '');
  const text = [
    '🐾 <b>Nouveau lead site web</b>',
    '',
    `<b>Nom:</b> ${esc(data.name)}`,
    `<b>WhatsApp:</b> +${wa}`,
    data.city ? `<b>Ville:</b> ${esc(data.city)}` : '',
    `<b>Demande:</b> ${esc(SUBJECT_LABELS[data.subject] || data.subject)}`,
    data.puppyName ? `<b>Chiot:</b> ${esc(data.puppyName)}` : '',
    data.email ? `<b>Email:</b> ${esc(data.email)}` : '',
    data.message ? `\n<i>${esc(data.message)}</i>` : '',
    `\n<a href="https://wa.me/${wa}">Ouvrir WhatsApp</a>`,
    data.source ? `<i>via ${esc(data.source)}</i>` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        });
        if (!res.ok) console.error('[Telegram] send failed:', await res.text());
      } catch (error) {
        console.error('[Telegram] error:', error);
      }
    })
  );
}

// Notify Zayd on WhatsApp (via the WAHA engine the agent runs on). Best-effort.
async function notifyWhatsApp(data: ContactFormData): Promise<void> {
  const wahaUrl = process.env.WAHA_URL;
  const apiKey = process.env.WAHA_API_KEY;
  const session = process.env.WAHA_SESSION || 'default';
  const to = (process.env.LEAD_WHATSAPP_TO || '').replace(/[^0-9]/g, '');

  if (!wahaUrl || !apiKey || !to) {
    console.log('[WhatsApp] not configured, skipping lead notification');
    return;
  }

  const wa = String(data.whatsapp || '').replace(/[^0-9]/g, '');
  const text = [
    '🐾 *Nouveau lead site web*',
    '',
    `*Nom:* ${data.name}`,
    `*WhatsApp:* +${wa}`,
    data.city ? `*Ville:* ${data.city}` : '',
    `*Demande:* ${SUBJECT_LABELS[data.subject] || data.subject}`,
    data.puppyName ? `*Chiot:* ${data.puppyName}` : '',
    data.email ? `*Email:* ${data.email}` : '',
    data.message ? `\n${data.message}` : '',
    `\nOuvrir: https://wa.me/${wa}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`${wahaUrl.replace(/\/$/, '')}/api/sendText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': apiKey },
      body: JSON.stringify({ session, chatId: `${to}@c.us`, text }),
    });
    if (!res.ok) console.error('[WhatsApp] send failed:', await res.text());
  } catch (error) {
    console.error('[WhatsApp] error:', error);
  }
}

// Rate limiting store (in production use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) {
    return false; // Max 5 submissions per minute
  }

  limit.count++;
  return true;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true; // Skip if not configured

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

async function createKommoContact(data: ContactFormData): Promise<void> {
  const apiUrl = process.env.KOMMO_API_URL;
  const apiToken = process.env.KOMMO_API_TOKEN;

  if (!apiUrl || !apiToken) {
    console.log('[Kommo] CRM not configured, skipping contact creation');
    return;
  }

  const subjectLabels: Record<string, string> = {
    general: 'Renseignement général',
    reserve: 'Réservation',
    visit: 'Visite',
    'video-call': 'Appel vidéo',
    'waiting-list': 'Liste d\'attente',
  };

  const tags = [
    'Website',
    subjectLabels[data.subject] || data.subject,
    ...(data.puppyName ? [`Chiot: ${data.puppyName}`] : []),
    ...(data.utm_source ? [`UTM: ${data.utm_source}`] : []),
  ];

  try {
    const response = await fetch(`${apiUrl}/api/v4/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          name: data.name,
          custom_fields_values: [
            {
              field_code: 'EMAIL',
              values: [{ value: data.email, enum_code: 'WORK' }],
            },
            {
              field_code: 'PHONE',
              values: [{ value: data.whatsapp, enum_code: 'MOB' }],
            },
          ],
          _embedded: {
            tags: tags.map((tag) => ({ name: tag })),
          },
        },
      ]),
    });

    if (!response.ok) {
      console.error('[Kommo] Failed to create contact:', await response.text());
    }
  } catch (error) {
    console.error('[Kommo] Error creating contact:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, whatsapp, city, subject, message, puppyName, recaptchaToken, ...utmParams } = body;

    // Validation — name + WhatsApp are the only required fields (low-friction lead capture)
    if (!name || !whatsapp || !subject) {
      return NextResponse.json(
        { error: 'Veuillez indiquer votre nom et votre WhatsApp.' },
        { status: 400 }
      );
    }

    // Email format validation (only if an email was provided)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Adresse email invalide.' },
          { status: 400 }
        );
      }
    }

    // reCAPTCHA verification
    if (recaptchaToken) {
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return NextResponse.json(
          { error: 'Vérification de sécurité échouée.' },
          { status: 403 }
        );
      }
    }

    const lead: ContactFormData = {
      name,
      email,
      whatsapp,
      city,
      subject,
      message,
      puppyName,
      ...utmParams,
    };

    // Notify Zayd on WhatsApp (primary, his channel) + Telegram (backup) + Kommo if configured.
    await Promise.all([notifyWhatsApp(lead), notifyTelegram(lead), createKommoContact(lead)]);

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès.',
    });
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
