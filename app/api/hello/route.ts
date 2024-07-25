import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('ANOTHER ONE!!');
    console.warn('ANOTHER ONE!!');
    console.error('ANOTHER ONE!!');
    return NextResponse.json({ message: 'Testing console' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rumbles", error },
      { status: 500 }
    );
  }
}
