import { NextResponse } from 'next/server';
import mockedUsers from '../mocked-users.json';

export async function GET() {
  const users = mockedUsers.map(({ id, name, email }) => {
    return { id, name, email };
  });

  return NextResponse.json(users);
}
