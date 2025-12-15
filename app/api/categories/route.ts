import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://deisishop.pythonanywhere.com/categories/', {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
