import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

import { UserService } from '@/services';

import { protectedRoutes } from './constants';

const middleware: NextMiddleware = async (request: NextRequest) => {
  const authToken = request.cookies.get('authToken')?.value;
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const loginUrl = new URL('/auth/login', request.url);

  if (isProtected) {
    try {
      const user = await UserService.getUser({ headers: { Authorization: `Bearer ${authToken}` } });

      if (!user) {
        return NextResponse.redirect(loginUrl);
      }
    } catch (err) {
      return NextResponse.redirect(loginUrl);
    }
  }

  NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export default middleware;
