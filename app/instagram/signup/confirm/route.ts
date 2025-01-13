import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 이메일 인증 처리 라우트 핸들러
 * 
 * - Supabase 인증 토큰 검증
 * - 세션 생성 및 쿠키 설정
 * - 인증 결과에 따른 리다이렉션
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    try {
      // 로딩 페이지로 먼저 이동
      return NextResponse.redirect(new URL('/instagram/signup/confirm/loading', request.url));
      
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('인증 코드 교환 실패:', error);
        return NextResponse.redirect(
          new URL('/instagram/signin?error=auth_failed', request.url)
        );
      }

      // 인증 성공 시 메인 페이지로 리다이렉션
      return NextResponse.redirect(new URL('/instagram', request.url));
      
    } catch (error) {
      console.error('인증 처리 중 오류:', error);
      return NextResponse.redirect(
        new URL('/instagram/signin?error=server_error', request.url)
      );
    }
  }

  // 인증 코드가 없는 경우
  return NextResponse.redirect(
    new URL('/instagram/signin?error=missing_code', request.url)
  );
}
