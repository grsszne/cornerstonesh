import { NextResponse } from 'next/server';

/**
 * Validates API key from request headers
 * @param {Request} request - The incoming request
 * @returns {boolean} - True if API key is valid
 */
export function validateApiKey(request) {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
  const validApiKey = process.env.SEND_API_KEY;

  if (!validApiKey) {
    throw new Error('SEND_API_KEY not configured on server');
  }

  return apiKey === validApiKey;
}

/**
 * Middleware wrapper to protect endpoints with API key authentication
 * @param {Function} handler - The route handler function
 * @returns {Function} - Protected route handler
 */
export function withAuth(handler) {
  return async (request, context) => {
    try {
      if (!validateApiKey(request)) {
        return NextResponse.json(
          { error: 'Unauthorized - Invalid or missing API key' },
          { status: 401 }
        );
      }
      return await handler(request, context);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication error', details: error.message },
        { status: 500 }
      );
    }
  };
}
