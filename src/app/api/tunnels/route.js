import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const SUBDOMAIN_RE = /^[a-z0-9][a-z0-9-]{2,61}[a-z0-9]$/; // min 4 chars
const RESERVED = new Set(['www', 'api', 'mail', 'admin', 'foundation', 'app', 'static', 'assets']);
const BLOCKED = new Set([
  'fuck', 'shit', 'cunt', 'cock', 'dick', 'pussy', 'ass', 'asshole',
  'bitch', 'bastard', 'whore', 'slut', 'nigger', 'nigga', 'faggot',
  'fag', 'retard', 'tranny', 'kike', 'spic', 'chink', 'wetback',
  'porn', 'sex', 'nude', 'naked', 'xxx', 'anal', 'cum', 'dildo',
  'rape', 'kill', 'murder', 'hitler', 'nazi',
]);

function validateApiKey(request) {
  const key = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
  const expected = process.env.TUNNEL_REGISTRATION_KEY;
  if (!expected) throw new Error('TUNNEL_REGISTRATION_KEY is not configured on the server');
  return key === expected;
}

// POST /api/tunnels — register a Foundation server at a subdomain
export async function POST(request) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json({ error: 'Unauthorized — invalid or missing API key' }, { status: 401 });
    }

    const body = await request.json();
    const { subdomain, tunnel_url } = body;

    if (!subdomain || !SUBDOMAIN_RE.test(subdomain)) {
      return NextResponse.json(
        { error: 'Invalid subdomain. Use lowercase letters, numbers, and hyphens only (4–63 chars).' },
        { status: 400 }
      );
    }

    if (RESERVED.has(subdomain)) {
      return NextResponse.json({ error: `"${subdomain}" is a reserved subdomain.` }, { status: 400 });
    }

    if (BLOCKED.has(subdomain) || [...BLOCKED].some(w => subdomain.includes(w))) {
      return NextResponse.json({ error: `"${subdomain}" is not allowed.` }, { status: 400 });
    }

    if (!tunnel_url || !tunnel_url.startsWith('https://')) {
      return NextResponse.json({ error: 'tunnel_url must be an https:// URL' }, { status: 400 });
    }

    // Check if subdomain is already taken
    const existing = await kv.get(`tunnel:${subdomain}`);
    if (existing) {
      return NextResponse.json(
        { error: `"${subdomain}" is already registered. Choose a different subdomain.` },
        { status: 409 }
      );
    }

    const entry = {
      tunnel_url,
      registered_at: new Date().toISOString(),
    };

    await kv.set(`tunnel:${subdomain}`, entry);

    return NextResponse.json({
      success: true,
      subdomain,
      public_url: `https://${subdomain}.foundation.cornerstone.sh`,
      registered_at: entry.registered_at,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/tunnels?subdomain=johnsmith — check availability
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subdomain = searchParams.get('subdomain');

  if (!subdomain) {
    return NextResponse.json({ error: 'Provide ?subdomain= to check availability' }, { status: 400 });
  }

  const isBlocked = BLOCKED.has(subdomain) || [...BLOCKED].some(w => subdomain.includes(w));
  if (!SUBDOMAIN_RE.test(subdomain) || RESERVED.has(subdomain) || isBlocked) {
    return NextResponse.json({ available: false, reason: 'invalid, reserved, or not allowed' });
  }

  const existing = await kv.get(`tunnel:${subdomain}`);
  return NextResponse.json({ available: !existing, subdomain });
}

// DELETE /api/tunnels — deregister
export async function DELETE(request) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subdomain } = await request.json();
    if (!subdomain) {
      return NextResponse.json({ error: 'subdomain is required' }, { status: 400 });
    }

    await kv.del(`tunnel:${subdomain}`);
    return NextResponse.json({ success: true, subdomain });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
