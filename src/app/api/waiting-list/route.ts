import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, city, breedPreference, timeline, message } = body;

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // Create in Kommo CRM with waiting list tag
    const apiUrl = process.env.KOMMO_API_URL;
    const apiToken = process.env.KOMMO_API_TOKEN;

    if (apiUrl && apiToken) {
      const tags = ['Website', 'Liste d\'attente'];
      if (breedPreference) tags.push(`Préférence: ${breedPreference}`);
      if (timeline) tags.push(`Délai: ${timeline}`);

      try {
        await fetch(`${apiUrl}/api/v4/contacts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              name,
              custom_fields_values: [
                { field_code: 'EMAIL', values: [{ value: email, enum_code: 'WORK' }] },
                { field_code: 'PHONE', values: [{ value: whatsapp, enum_code: 'MOB' }] },
              ],
              _embedded: {
                tags: tags.map((tag) => ({ name: tag })),
              },
            },
          ]),
        });
      } catch (error) {
        console.error('[Kommo] Waiting list error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Vous êtes inscrit(e) sur notre liste d\'attente.',
    });
  } catch (error) {
    console.error('[Waiting List API] Error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue.' },
      { status: 500 }
    );
  }
}
