import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function middleware(request) {
  const hostname = request.headers.get('host') || '';

  // Only handle *.foundation.cornerstone.sh subdomains
  const match = hostname.match(/^([a-z0-9-]+)\.foundation\.cornerstone\.sh$/);
  if (!match) {
    return NextResponse.next();
  }

  const subdomain = match[1];

  // Look up tunnel URL from KV store
  const entry = await kv.get(`tunnel:${subdomain}`);
  if (!entry) {
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:4rem">
        <h1>Server not found</h1>
        <p>No Foundation server is registered at <strong>${subdomain}.foundation.cornerstone.sh</strong>.</p>
        <p><a href="https://cornerstone.sh">Learn about Foundation</a></p>
      </body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const tunnelUrl = typeof entry === 'string' ? entry : entry.tunnel_url;

  // Rewrite to internal proxy route, injecting tunnel URL as a request header
  const url = request.nextUrl.clone();
  const originalPathname = url.pathname;

  url.pathname = `/api/foundation-proxy${originalPathname === '/' ? '' : originalPathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-foundation-tunnel-url', tunnelUrl);
  requestHeaders.set('x-foundation-subdomain', subdomain);

  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/:path*',
};
