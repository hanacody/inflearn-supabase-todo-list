import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram",
};

/**
 * Instagram 메인 페이지 컴포넌트
 * 
 * - Supabase 세션을 통한 인증 상태 확인
 * - 세션이 없는 경우 로그인 페이지로 리다이렉트
 * 
 * 이전 문제점:
 * - auth-token 쿠키만으로는 실제 유효한 세션 확인 불가
 * - Supabase의 세션 관리 메커니즘과 불일치
 * 
 * 개선사항:
 * - Supabase 클라이언트를 통한 실제 세션 유효성 검증
 * - 서버 컴포넌트에서 안전한 인증 처리
 */
export default async function Page() {
  // Supabase 클라이언트 생성
  const supabase = createServerComponentClient({ cookies });
  
  // 실제 세션 상태 확인
  const { data: { session } } = await supabase.auth.getSession();

  // 유효한 세션이 없는 경우 로그인 페이지로 리다이렉트
  if (!session) {
    redirect("/instagram/signin");
  }

  return <UI />;
}
