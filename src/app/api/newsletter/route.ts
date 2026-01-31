import { NextRequest, NextResponse } from 'next/server';

async function subscribeToBrevo(email: string): Promise<boolean> {
  const apiKey = process.env.NEWSLETTER_API_KEY;
  const listId = process.env.NEWSLETTER_LIST_ID;

  if (!apiKey || !listId) {
    console.log('[Newsletter] Not configured, skipping subscription');
    return true;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(listId)],
        updateEnabled: true,
      }),
    });

    return response.ok || response.status === 204;
  } catch (error) {
    console.error('[Newsletter] Error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Adresse email requise.' },
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

    await subscribeToBrevo(email);

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie !',
    });
  } catch (error) {
    console.error('[Newsletter API] Error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue.' },
      { status: 500 }
    );
  }
}
