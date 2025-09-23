import { NextResponse } from 'next/server';

const { MEDIUM_API_URL } = process.env;

export async function GET() {
  if (!MEDIUM_API_URL) {
    return NextResponse.json({ error: 'Medium API URL not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(MEDIUM_API_URL, {
      // Revalidate the data every hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Medium feed');
    }

    const data = await response.json();

    // We only want the articles (items) from the response
    const articles = data.items || [];

    return NextResponse.json({ articles });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Medium feed' }, { status: 500 });
  }
}