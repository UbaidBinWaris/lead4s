import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { callerNumber } = await request.json();

    if (!callerNumber) {
      return NextResponse.json(
        { error: 'Caller number is required' },
        { status: 400 }
      );
    }

    const url = `https://rtb.retreaver.com/rtbs.json?key=de52d107-77e6-4200-99e4-4b6d68bff683&publisher_id=cd471266&caller_number=${encodeURIComponent(
      callerNumber
    )}`;

    const retreaverRes = await fetch(url, {
      method: 'GET',
    });

    const data = await retreaverRes.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
