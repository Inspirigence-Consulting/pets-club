import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
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

    // Validation
    if (!name || !email || !whatsapp || !subject) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
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

    // Create contact in Kommo CRM
    await createKommoContact({
      name,
      email,
      whatsapp,
      city,
      subject,
      message,
      puppyName,
      ...utmParams,
    });

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
