import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

import { protectedRoutes } from './constants';

const middleware: NextMiddleware = async (request: NextRequest) => {
  const authToken = request.cookies.get('authToken')?.value;
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const loginUrl = new URL('/auth/login', request.url);

  if (isProtected) {
    try {
      // если использовать axios, выдает ошибку "A Node.js API is used (process.nextTick at line: 698) which is not supported in the Edge Runtime."
      const user = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
      ).json();

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
