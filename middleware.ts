import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mockedUsers from '@/app/api/hello/mocked-users.json';

export async function middleware(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const headerToken = authHeader?.replace('Bearer ', '');

  if (!headerToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = mockedUsers.find(({ token }) => token === headerToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/hello/users'],
};
