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

const CF_API = 'https://api.cloudflare.com/client/v4';

function validateApiKey(request) {
  const key = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
  const expected = process.env.TUNNEL_REGISTRATION_KEY;
  if (!expected) throw new Error('TUNNEL_REGISTRATION_KEY is not configured on the server');
  return key === expected;
}

function isSubdomainAllowed(subdomain) {
  if (!SUBDOMAIN_RE.test(subdomain)) return { ok: false, reason: 'Invalid subdomain. Use lowercase letters, numbers, and hyphens only (4–63 chars).' };
  if (RESERVED.has(subdomain)) return { ok: false, reason: `"${subdomain}" is a reserved subdomain.` };
  if (BLOCKED.has(subdomain) || [...BLOCKED].some(w => subdomain.includes(w))) return { ok: false, reason: `"${subdomain}" is not allowed.` };
  return { ok: true };
}

async function createCloudflareDNS(subdomain, tunnelUuid) {
  const res = await fetch(`${CF_API}/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'CNAME',
      name: `${subdomain}.foundation`,
      content: `${tunnelUuid}.cfargotunnel.com`,
      proxied: true,
      ttl: 1,
      comment: `Foundation tunnel — ${subdomain}`,
    }),
  });
  return res.json();
}

async function deleteCloudflareDNS(dnsRecordId) {
  const res = await fetch(`${CF_API}/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${dnsRecordId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` },
  });
  return res.json();
}

// POST /api/tunnels — register a Foundation server at a subdomain
export async function POST(request) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json({ error: 'Unauthorized — invalid or missing API key' }, { status: 401 });
    }

    const body = await request.json();
    const { subdomain, tunnel_uuid } = body;

    const check = isSubdomainAllowed(subdomain);
    if (!check.ok) {
      return NextResponse.json({ error: check.reason }, { status: 400 });
    }

    if (!tunnel_uuid || !/^[0-9a-f-]{36}$/.test(tunnel_uuid)) {
      return NextResponse.json({ error: 'tunnel_uuid must be a valid UUID' }, { status: 400 });
    }

    const existing = await kv.get(`tunnel:${subdomain}`);
    if (existing) {
      return NextResponse.json(
        { error: `"${subdomain}" is already registered. Choose a different subdomain.` },
        { status: 409 }
      );
    }

    // Create DNS record in Cloudflare
    const cfData = await createCloudflareDNS(subdomain, tunnel_uuid);
    if (!cfData.success) {
      console.error('Cloudflare DNS error:', cfData.errors);
      return NextResponse.json(
        { error: 'Failed to create DNS record', details: cfData.errors },
        { status: 500 }
      );
    }

    const entry = {
      tunnel_uuid,
      dns_record_id: cfData.result.id,
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

  const check = isSubdomainAllowed(subdomain);
  if (!check.ok) {
    return NextResponse.json({ available: false, reason: check.reason });
  }

  const existing = await kv.get(`tunnel:${subdomain}`);
  return NextResponse.json({ available: !existing, subdomain });
}

// DELETE /api/tunnels — deregister and remove DNS record
export async function DELETE(request) {
  try {
    if (!validateApiKey(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subdomain } = await request.json();
    if (!subdomain) {
      return NextResponse.json({ error: 'subdomain is required' }, { status: 400 });
    }

    const entry = await kv.get(`tunnel:${subdomain}`);
    if (!entry) {
      return NextResponse.json({ error: `"${subdomain}" is not registered` }, { status: 404 });
    }

    // Remove DNS record from Cloudflare
    if (entry.dns_record_id) {
      await deleteCloudflareDNS(entry.dns_record_id);
    }

    await kv.del(`tunnel:${subdomain}`);
    return NextResponse.json({ success: true, subdomain });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
