import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // for Supabase
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    return NextResponse.json({
      success: true,
      message: 'Database connection works!',
      time: result.rows[0]
    });
  } catch (error: any) {
    console.error('DB test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code
    }, { status: 500 });
  }
}
