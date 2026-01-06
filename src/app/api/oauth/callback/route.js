import { kv } from '@vercel/kv'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  
  // Handle OAuth errors
  if (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Authorization Failed</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .container {
              background: white;
              padding: 3rem;
              border-radius: 1rem;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              text-align: center;
              max-width: 400px;
            }
            .error-icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
            h1 {
              color: #e53e3e;
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }
            p {
              color: #4a5568;
              margin: 0;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">✗</div>
            <h1>Authorization Failed</h1>
            <p>There was an error authorizing your account. Please try again.</p>
          </div>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
  
  // Validate parameters
  if (!code || !state) {
    return new Response('Missing code or state parameter', { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }
  
  // Store OAuth code in Redis with 5-minute expiry
  await kv.set(`oauth:${state}`, code, { ex: 300 })
  
  // Return success page with auto-close script
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Authorization Complete</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .container {
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 400px;
          }
          .checkmark {
            font-size: 4rem;
            color: #48bb78;
            margin-bottom: 1rem;
            animation: scaleIn 0.5s ease-out;
          }
          @keyframes scaleIn {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }
          h1 {
            color: #2d3748;
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
          p {
            color: #4a5568;
            margin: 0;
            line-height: 1.5;
          }
        </style>
        <script>
          setTimeout(() => {
            window.close();
          }, 2000);
        </script>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Authorization Complete</h1>
          <p>This window will close automatically...</p>
          <p style="margin-top: 1rem; font-size: 0.875rem; color: #718096;">
            If it doesn't close, you can close it manually.
          </p>
        </div>
      </body>
    </html>
  `, {
    headers: { 
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  })
}