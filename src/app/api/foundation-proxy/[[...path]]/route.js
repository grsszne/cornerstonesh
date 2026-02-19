// Headers that must not be forwarded to the upstream server
const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'x-foundation-tunnel-url',
  'x-foundation-subdomain',
]);

function buildForwardHeaders(incoming) {
  const out = new Headers();
  for (const [key, value] of incoming.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      out.set(key, value);
    }
  }
  return out;
}

async function proxy(request, { params }) {
  const tunnelUrl = request.headers.get('x-foundation-tunnel-url');
  if (!tunnelUrl) {
    return new Response('Missing tunnel URL — request did not come through the Foundation proxy middleware.', {
      status: 400,
    });
  }

  const pathParts = (await params).path ?? [];
  const path = pathParts.join('/');
  const { search } = new URL(request.url);
  const target = `${tunnelUrl}${path ? `/${path}` : ''}${search}`;

  const forwardHeaders = buildForwardHeaders(request.headers);
  // Tell the Foundation server its real public hostname
  const publicHost = `${request.headers.get('x-foundation-subdomain')}.foundation.cornerstone.sh`;
  forwardHeaders.set('host', new URL(tunnelUrl).hostname);
  forwardHeaders.set('x-forwarded-host', publicHost);
  forwardHeaders.set('x-forwarded-proto', 'https');

  const canHaveBody = !['GET', 'HEAD'].includes(request.method);

  let upstream;
  try {
    upstream = await fetch(target, {
      method: request.method,
      headers: forwardHeaders,
      body: canHaveBody ? request.body : null,
      redirect: 'follow',
      // Required for streaming request bodies in Node.js fetch
      duplex: 'half',
    });
  } catch (err) {
    return new Response(`Could not reach Foundation server: ${err.message}`, { status: 502 });
  }

  // Forward response headers, stripping hop-by-hop ones
  const responseHeaders = new Headers();
  for (const [key, value] of upstream.headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
