import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN;

  if (!VERCEL_BEARER_TOKEN) {
    return NextResponse.json({ error: 'VERCEL_BEARER_TOKEN is not set' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Vercel API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch Vercel projects', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.projects);
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
