import { NextResponse } from 'next/server';
import { getResend, fromAddress } from '@/lib/email/resend';

const ACCOUNT_OWNER_EMAIL = 'abz1capital@gmail.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let testEmail = searchParams.get('email') || ACCOUNT_OWNER_EMAIL;

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
      // If it's a testing mode restriction, suggest the account owner email
      if (error.message?.includes('You can only send testing emails')) {
        return NextResponse.json({
          success: false,
          error: `Resend is in testing mode. Can only send to account owner email: ${ACCOUNT_OWNER_EMAIL}`,
          suggestion: `To send to other addresses, verify your domain (abzcapital.co.ke) at https://resend.com/domains`,
          testEmail: ACCOUNT_OWNER_EMAIL,
          errorDetails: error
        }, { status: 403 });
      }

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
      to: testEmail,
      note: testEmail === ACCOUNT_OWNER_EMAIL ? 'Sent to account owner email (testing mode)' : 'Email sent'
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
