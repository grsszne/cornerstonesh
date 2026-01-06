import { kv } from '@vercel/kv'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get('state')
  
  if (!state) {
    return Response.json(
      { error: 'Missing state parameter' }, 
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  }
  
  try {
    // Check if code exists in Redis
    const code = await kv.get(`oauth:${state}`)
    
    if (code) {
      // Code found! Delete it so it can only be used once
      await kv.del(`oauth:${state}`)
      
      return Response.json(
        { success: true, code: code },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      )
    } else {
      // Code not yet available
      return Response.json(
        { success: false, message: 'Code not yet available' },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      )
    }
  } catch (err) {
    console.error('Error polling OAuth code:', err)
    return Response.json(
      { error: 'Internal server error' }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  }
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