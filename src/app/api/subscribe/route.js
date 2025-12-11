import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, firstName, lastName, properties } = await request.json();

  if (!email || !email.length) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Error processing email subscription.' }, { status: 500 });
  }

  try {
    const contactData = {
      email: email,
      unsubscribed: false,
    };

    // Add first and last name if provided
    if (firstName) contactData.firstName = firstName;
    if (lastName) contactData.lastName = lastName;

    // Add custom properties (e.g., segment, tags, custom fields)
    if (properties && typeof properties === 'object') {
      contactData.properties = properties;
    }

    const { data, error } = await resend.contacts.create(contactData);

    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to subscribe' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Successfully subscribed',
      contactId: data.id
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
