import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 미들웨어 - 인증 및 라우팅 제어
 * 
 * - 보호된 경로에 대한 인증 검사
 * - 인증 페이지 접근 제어
 * - 이메일 확인 페이지 처리
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 인증이 필요한 페이지 목록
  const protectedPaths = ['/instagram/feed', '/instagram/chat', '/instagram/discover'];
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  // 인증 관련 페이지
  const isAuthPage = req.nextUrl.pathname.startsWith('/instagram/signin') || 
                    req.nextUrl.pathname.startsWith('/instagram/signup');
  const isConfirmPage = req.nextUrl.pathname.startsWith('/instagram/signup/confirm');

  // 이메일 확인 페이지는 인증 검사에서 제외
  if (isConfirmPage) {
    return res;
  }

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/instagram/signin', req.url));
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/instagram', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/instagram/:path*']
};
