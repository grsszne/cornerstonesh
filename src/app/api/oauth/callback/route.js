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
          <title>Foundation - Authorization Failed</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              text-align: center; 
              padding: 50px; 
              background: #000; 
              color: #fff; 
              margin: 0;
            }
            .error { color: #ff4444; font-size: 48px; margin-bottom: 20px; }
            h1 { font-size: 32px; margin: 20px 0; }
            p { color: #999; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="error">✗</div>
          <h1>Authorization Failed</h1>
          <p>Error: ${error}</p>
          <p>You can close this window and try again.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
  
  // Validate required parameters
  if (!code || !state) {
    return new Response('Missing code or state parameter', { status: 400 })
  }
  
  try {
    // Store OAuth code in Redis with 5-minute expiry
    await kv.set(`oauth:${state}`, code, { ex: 300 })
    
    console.log(`Stored OAuth code for state: ${state}`)
    
    // Return success page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Foundation - Authorization Complete</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              text-align: center; 
              padding: 50px; 
              background: #000; 
              color: #fff; 
              margin: 0;
            }
            .success { color: #4ade80; font-size: 64px; margin-bottom: 20px; }
            h1 { font-size: 32px; margin: 20px 0; font-weight: 600; }
            p { color: #999; font-size: 16px; line-height: 1.6; }
            .close-note { margin-top: 40px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="success">✓</div>
          <h1>Authorization Complete</h1>
          <p>Your Gmail account is being added to Foundation...</p>
          <p class="close-note">This window will close automatically in 2 seconds</p>
          <script>
            setTimeout(() => {
              window.close();
              if (!window.closed) {
                document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h2>You can close this window now</h2></div>';
              }
            }, 2000);
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (err) {
    console.error('Error storing OAuth code:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
