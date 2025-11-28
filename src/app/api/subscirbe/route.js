import { NextRequest, NextResponse } from 'next/server';
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({ api_key: process.env.MAILERLITE_API_KEY });

export async function POST(request) {
  try {
    const { email, name = '' } = await request.json();
    
    const response = await mailerlite.subscribers.create({
      email,
      name,
      status: 'unconfirmed'
    });
    
    return NextResponse.json({ 
      message: 'Subscribed successfully!', 
      data: response.data 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: error.response?.data || 'Subscription failed' 
    }, { status: 400 });
  }
}
