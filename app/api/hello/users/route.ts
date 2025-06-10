import { NextResponse } from 'next/server';

const helloUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

export async function GET() {
  return NextResponse.json(helloUsers);
}
