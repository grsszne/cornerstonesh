import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Personalizes email content by replacing template variables
 * @param {string} content - The email HTML content
 * @param {object} contact - Contact data (email, first_name, last_name, properties)
 * @param {string} baseUrl - Base URL for unsubscribe link
 * @returns {string} - Personalized HTML content
 */
function personalizeEmail(content, contact, baseUrl) {
  let personalized = content;

  // Replace standard variables
  personalized = personalized.replace(/\{\{first_name\}\}/gi, contact.first_name || 'there');
  personalized = personalized.replace(/\{\{last_name\}\}/gi, contact.last_name || '');
  personalized = personalized.replace(/\{\{email\}\}/gi, contact.email || '');

  // Replace custom property variables if they exist
  if (contact.properties) {
    Object.keys(contact.properties).forEach(key => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'gi');
      personalized = personalized.replace(regex, contact.properties[key] || '');
    });
  }

  // Add unsubscribe link
  const unsubscribeUrl = `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(contact.email)}`;
  personalized = personalized.replace(/\{\{unsubscribe_url\}\}/gi, unsubscribeUrl);

  return personalized;
}

async function handleSendEmail(request) {
  try {
    const body = await request.json();
    const {
      subject = 'Message from Cornerstone',
      html = '<p>Hello {{first_name}},</p><p>This is a test message from Cornerstone.</p><p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>',
      from = 'Cornerstone <cornerstone@cornerstone.sh>',
      replyTo = 'cornerstonecomputingservices@gmail.com',
      segmentFilter = null // Optional: filter by custom property (e.g., {segment: 'newsletter'})
    } = body;

    // Get base URL for unsubscribe links
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                    request.headers.get('origin') ||
                    `https://${request.headers.get('host')}`;

    // Fetch all contacts from Resend
    const { data: contactsResponse, error: contactsError } = await resend.contacts.list();

    if (contactsError) {
      return NextResponse.json({
        error: 'Failed to fetch contacts',
        details: contactsError.message
      }, { status: 500 });
    }

    let contacts = contactsResponse.data.filter(contact => !contact.unsubscribed);

    // Apply segment filter if provided
    if (segmentFilter && typeof segmentFilter === 'object') {
      contacts = contacts.filter(contact => {
        if (!contact.properties) return false;

        return Object.keys(segmentFilter).every(key =>
          contact.properties[key] === segmentFilter[key]
        );
      });
    }

    if (contacts.length === 0) {
      return NextResponse.json({
        message: 'No subscribers found matching criteria',
        count: 0
      }, { status: 200 });
    }

    // Send personalized emails
    const results = [];
    const errors = [];

    // Process emails sequentially with delay to respect rate limits (2 req/sec)
    for (const contact of contacts) {
      const personalizedHtml = personalizeEmail(html, contact, baseUrl);
      const personalizedSubject = subject
        .replace(/\{\{first_name\}\}/gi, contact.first_name || 'there')
        .replace(/\{\{last_name\}\}/gi, contact.last_name || '')
        .replace(/\{\{email\}\}/gi, contact.email || '');

      const { data, error } = await resend.emails.send({
        from: from,
        to: [contact.email],
        replyTo: replyTo,
        subject: personalizedSubject,
        html: personalizedHtml,
      });

      if (error) {
        errors.push({ email: contact.email, error: error.message });
      } else {
        results.push({ email: contact.email, id: data.id });
      }

      // Wait 600ms between emails to stay under 2 requests/second rate limit
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({
      message: 'Email campaign completed',
      successCount: results.length,
      errorCount: errors.length,
      totalContacts: contacts.length,
      results: results,
      errors: errors.length > 0 ? errors : undefined
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error.message
    }, { status: 500 });
  }
}

export const POST = withAuth(handleSendEmail);