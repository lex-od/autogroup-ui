import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_TOKENS = ['token123', 'token456', 'token789'];

export async function middleware(request: NextRequest) {
  console.log('hello');

  const authHeader = request.headers.get('Authorization');

  if (
    !authHeader ||
    !VALID_TOKENS.includes(authHeader.replace('Bearer ', ''))
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/users', '/api/profiles'],
};
