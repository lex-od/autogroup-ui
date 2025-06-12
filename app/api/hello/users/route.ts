import { NextResponse } from 'next/server';
import mockedUsers from '../mockedUsers.json';

export async function GET() {
  const users = mockedUsers.map(({ id, name, email }) => {
    return { id, name, email };
  });

  return NextResponse.json(users);
}
