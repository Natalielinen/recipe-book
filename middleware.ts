import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const lang = req.cookies.get('lang');

  if (!lang) {
    const res = NextResponse.next();
    res.cookies.set('lang', 'ru', {
      path: '/',
      httpOnly: false,
    });
    return res;
  }

  return NextResponse.next();
}

// Применяем ко всему сайту
export const config = {
  matcher: ['/((?!_next).*)'],
};