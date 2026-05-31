import { NextResponse } from 'next/server';
import { getResend, fromAddress } from '@/lib/email/resend';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testEmail = searchParams.get('email') || 'test@example.com';

    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY is not set in environment variables'
      }, { status: 400 });
    }

    // Try to get Resend client
    let resend;
    try {
      resend = getResend();
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        error: 'Failed to initialize Resend: ' + error.message
      }, { status: 400 });
    }

    // Try to send test email
    const { data, error } = await resend.emails.send({
      from: fromAddress(),
      to: testEmail,
      subject: 'ABZ Capital Test Email',
      html: '<p>This is a test email from ABZ Capital</p>'
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        errorDetails: error
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: data?.id,
      from: fromAddress(),
      to: testEmail
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
