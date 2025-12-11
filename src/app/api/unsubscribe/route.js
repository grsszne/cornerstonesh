import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Update contact to unsubscribed status
    const { data, error } = await resend.contacts.update({
      email: email,
      unsubscribed: true,
    });

    if (error) {
      return NextResponse.json({
        error: 'Failed to unsubscribe',
        details: error.message
      }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Successfully unsubscribed'
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error.message
    }, { status: 500 });
  }
}

// Handle GET requests for unsubscribe links clicked from emails
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(
        '<html><body><h1>Invalid unsubscribe link</h1><p>Email parameter is missing.</p></body></html>',
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Update contact to unsubscribed status
    const { error } = await resend.contacts.update({
      email: email,
      unsubscribed: true,
    });

    if (error) {
      return new Response(
        '<html><body><h1>Unsubscribe Failed</h1><p>Could not process your unsubscribe request. Please try again later.</p></body></html>',
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new Response(
      `<html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1 style="color: #333;">You've been unsubscribed</h1>
          <p style="color: #666; font-size: 16px;">
            We're sorry to see you go! You have been successfully unsubscribed from our mailing list.
          </p>
          <p style="color: #666; font-size: 14px;">
            Email: <strong>${email}</strong>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If this was a mistake, you can subscribe again on our website.
          </p>
        </body>
      </html>`,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );

  } catch (error) {
    return new Response(
      '<html><body><h1>Error</h1><p>An unexpected error occurred.</p></body></html>',
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
