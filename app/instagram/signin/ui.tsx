"use client";

import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useSignIn } from "../actions/signin.action";

/**
 * Instagram 로그인 페이지 컴포넌트
 * 
 * - BLoC 패턴을 활용한 상태 관리 구현
 * - Material Tailwind 기반 UI 컴포넌트 활용
 * - 이메일/비밀번호 기반 인증 구현
 * 
 * TODO:
 * - 소셜 로그인 기능 추가 검토
 * - 비밀번호 재설정 기능 구현 필요
 */
export default function SignInUI() {
  const { signIn, isLoading, error } = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * 로그인 폼 제출 핸들러
   * 
   * - 이메일/비밀번호 유효성 검증
   * - Supabase Auth 기반 로그인 처리
   * - 에러 처리 및 성공 시 리다이렉션
   * 
   * TODO:
   * - 소셜 로그인 연동 
   * - 비밀번호 재설정 기능
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 이메일 유효성 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    // 비밀번호 유효성 검증 
    if (formData.password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      // Supabase Auth를 통한 로그인 시도
      const result = await signIn(formData.email, formData.password);
      
      // 로그인 성공 시 메인 페이지로 리다이렉션
      if (result && !error) {
        window.location.href = "/instagram";
      }
    } catch (err) {
      console.error("로그인 처리 중 오류 발생:", err);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        {/* Instagram 로고 */}
        <div className="flex justify-center mb-8">
          <i className="fab fa-instagram text-4xl text-pink-500"></i>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="이메일"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <Input
            type="password"
            label="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          {error && (
            <Typography color="red" className="text-sm text-center">
              {error}
            </Typography>
          )}
        </form>

        <div className="mt-6 text-center">
          <Typography color="gray" className="text-sm">
            계정이 없으신가요?{" "}
            <a href="/instagram/signup" className="text-pink-500 hover:text-pink-600">
              가입하기
            </a>
          </Typography>
        </div>
      </div>
    </main>
  );
}