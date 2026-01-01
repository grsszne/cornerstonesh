import { kv } from '@vercel/kv'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const state = searchParams.get('state')
  
  if (!state) {
    return Response.json({ error: 'Missing state parameter' }, { status: 400 })
  }
  
  try {
    // Check if code exists in Redis
    const code = await kv.get(`oauth:${state}`)
    
    if (code) {
      // Code found! Delete it so it can only be used once
      await kv.del(`oauth:${state}`)
      
      return Response.json({ 
        success: true,
        code: code 
      })
    } else {
      // Code not yet available
      return Response.json({ 
        success: false,
        message: 'Code not yet available' 
      })
    }
  } catch (err) {
    console.error('Error polling OAuth code:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
