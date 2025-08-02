import { NextResponse } from 'next/server';
import { getTalentById, removeTalentById } from '../../../../server/data/talents';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const talent = getTalentById(id);
    
    if (!talent) {
      return NextResponse.json(
        { success: false, error: 'Talent not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: talent });
  } catch (error) {
    console.error('Error fetching talent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch talent' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const removed = removeTalentById(id);

    if (!removed) {
      return NextResponse.json(
        { success: false, error: 'Talent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Talent removed successfully' });
  } catch (error) {
    console.error('Error removing talent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove talent' },
      { status: 500 }
    );
  }
}
