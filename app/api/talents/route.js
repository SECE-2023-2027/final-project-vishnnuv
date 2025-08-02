import { NextResponse } from 'next/server';
import { getAllTalents, addTalent } from '../../../server/data/talents';

export async function GET() {
  try {
    const talents = getAllTalents();
    return NextResponse.json({ success: true, data: talents });
  } catch (error) {
    console.error('Error fetching talents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch talents' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const talent = addTalent(body);
    return NextResponse.json({ success: true, data: talent }, { status: 201 });
  } catch (error) {
    console.error('Error creating talent:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
