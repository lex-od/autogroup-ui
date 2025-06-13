import { NextResponse } from 'next/server';
import mockedUsers from '../mocked-users.json';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = mockedUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  return NextResponse.json({ token: user.token }, { status: 200 });
}
