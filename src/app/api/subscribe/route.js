import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generates confirmation email HTML with Cornerstone branding
 * @param {string} firstName - Subscriber's first name
 * @returns {string} - HTML email content
 */
function getConfirmationEmailHTML(firstName) {
  const name = firstName || 'there';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Cornerstone</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.cdnfonts.com/css/overused-grotesk" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Overused Grotesk', Arial, Helvetica, sans-serif; background-color: #ffffff; color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
    <tr>
      <td style="padding: 0;">
        <!-- Header -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px 20px 20px;">
              <p style="margin: 0; font-family: 'DM Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #000000;">
                CORNERSTONE &gt; FOUNDATION
              </p>
            </td>
          </tr>
        </table>

        <!-- Main Content -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="padding: 20px;">
              <!-- Hero Text -->
              <h1 style="margin: 0 0 10px 0; font-size: 48px; font-weight: 500; line-height: 1; letter-spacing: -2px; color: #000000;">
                Welcome,
              </h1>
              <h1 style="margin: 0 0 30px 0; font-size: 48px; font-weight: 500; line-height: 1; letter-spacing: -2px; color: transparent; -webkit-text-stroke: 2px #F7821B;">
                ${name}.
              </h1>

              <!-- Body Text -->
              <p style="margin: 0 0 20px 0; font-family: 'DM Mono', monospace; font-size: 16px; line-height: 1.6; color: #000000;">
                Thanks for subscribing to Cornerstone updates! You'll be the first to know about:
              </p>

              <ul style="margin: 0 0 30px 0; padding-left: 20px; font-family: 'DM Mono', monospace; font-size: 14px; line-height: 1.8; color: #000000;">
                <li>New product launches and updates</li>
                <li>Foundation system modules and features</li>
                <li>Exclusive pre-order opportunities</li>
                <li>Technical guides and tutorials</li>
              </ul>

              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0;">
                    <a href="https://cornerstone.sh/foundation" style="display: inline-block; padding: 16px 32px; font-family: 'DM Mono', monospace; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; color: #ffffff; background-color: #000000; border: 1px solid #000000; text-decoration: none; transition: background-color 0.3s;">
                      EXPLORE FOUNDATION
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; font-family: 'DM Mono', monospace; font-size: 14px; line-height: 1.6; color: #000000;">
                Build Your Server. Your Way.
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="padding: 40px 20px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px 0; font-family: 'DM Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #666666;">
                CORNERSTONE COMPUTING SERVICES
              </p>
              <p style="margin: 0 0 15px 0; font-size: 12px; line-height: 1.5; color: #666666;">
                You're receiving this email because you subscribed to updates from Cornerstone.
              </p>
              <p style="margin: 0; font-size: 12px; color: #666666;">
                <a href="{{unsubscribe_url}}" style="color: #F7821B; text-decoration: underline;">Unsubscribe</a> |
                <a href="https://cornerstone.sh/privacy" style="color: #666666; text-decoration: underline;">Privacy Policy</a> |
                <a href="https://cornerstone.sh/terms" style="color: #666666; text-decoration: underline;">Terms</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

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

    // Create the contact in Resend
    const { data, error } = await resend.contacts.create(contactData);

    if (error) {
      return NextResponse.json({ error: error.message || 'Failed to subscribe' }, { status: 400 });
    }

    // Send confirmation email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cornerstone.sh';
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`;
    const emailHtml = getConfirmationEmailHTML(firstName).replace('{{unsubscribe_url}}', unsubscribeUrl);

    const { error: emailError } = await resend.emails.send({
      from: 'Cornerstone <cornerstone@cornerstone.sh>',
      to: [email],
      replyTo: 'cornerstonecomputingservices@gmail.com',
      subject: 'Welcome to Cornerstone',
      html: emailHtml,
    });

    // Don't fail the subscription if email fails, just log it
    if (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return NextResponse.json({
      message: 'Successfully subscribed',
      contactId: data.id
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
