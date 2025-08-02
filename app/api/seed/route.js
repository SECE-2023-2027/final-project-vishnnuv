import { NextResponse } from 'next/server';
import { seedTalents } from '../../../server/data/talents';

export async function POST() {
  try {
    const talents = seedTalents();
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${talents.length} talents`,
      data: talents 
    });
  } catch (error) {
    console.error('Error seeding talents:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
