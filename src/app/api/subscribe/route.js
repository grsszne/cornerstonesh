import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.length) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const API_KEY = process.env.MAILERLITE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ error: 'Error processing email subscription.' }, { status: 500 });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        groups: [], // Add group ID here if needed in the future
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Failed to subscribe' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Successfully subscribed' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
