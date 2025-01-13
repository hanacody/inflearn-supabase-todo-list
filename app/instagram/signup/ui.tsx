"use client";

import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useSignUp } from "../actions/signup.action";

/**
 * Instagram 회원가입 페이지 컴포넌트
 * 
 * - Material Tailwind 컴포넌트를 활용한 회원가입 폼 구현
 * - 반응형 디자인 적용 (모바일/데스크톱)
 * - 기본적인 입력값 검증 로직 포함
 * 
 * TODO:
 * - 실제 회원가입 로직 구현 필요
 * - 이메일 인증 기능 추가 검토
 * - 프로필 이미지 업로드 기능 구현 필요
 */
export default function SignUpUI() {
  const { signUp, isLoading, error } = useSignUp();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  /**
   * 회원가입 폼 제출 핸들러
   * - 폼 기본 동작 방지
   * - 비밀번호 일치 여부 확인
   * - 이메일 형식 검증
   * - 회원가입 요청 처리
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.username, formData.name);
      if (!error) {
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/instagram";
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        {/* Instagram 로고 */}
        <div className="flex justify-center mb-8">
          <i className="fab fa-instagram text-4xl text-pink-500"></i>
        </div>
        
        <Typography variant="h4" className="text-center mb-6">
          Instagram에 가입하기
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="이메일"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <Input
            type="text"
            label="이름"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />

          <Input
            type="text"
            label="사용자 이름"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          
          <Input
            type="password"
            label="비밀번호"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          <Input
            type="password"
            label="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            가입하기
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Typography color="gray" className="text-sm">
            이미 계정이 있으신가요?{" "}
            <a href="/instagram" className="text-pink-500 hover:text-pink-600">
              로그인
            </a>
          </Typography>
        </div>
      </div>
    </main>
  );
}
