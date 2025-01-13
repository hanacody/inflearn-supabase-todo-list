"use client";

import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useSignIn } from "../actions/signin.action";

/**
 * Instagram 사이드바 컴포넌트
 * 
 * - 네비게이션 메뉴 구현
 * - 로그인/로그아웃 기능 추가
 * - Material Tailwind 컴포넌트 활용
 */
type SidebarProps = {
  currentView: 'feed' | 'people' | 'discover' | 'chat';
  onViewChange: (view: 'feed' | 'people' | 'discover' | 'chat') => void;
};

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const router = useRouter();
  const { signOut } = useSignIn();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/instagram/signin");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <i className="fab fa-instagram text-2xl text-pink-500"></i>
          <Typography variant="h5">Instagram</Typography>
        </div>

        <nav className="space-y-2">
          <Button 
            variant="text" 
            className="flex items-center w-full justify-start"
            onClick={() => onViewChange('feed')}
          >
            <i className="fas fa-home mr-3"></i> 홈
          </Button>
          <Button 
            variant="text" 
            className="flex items-center w-full justify-start"
            onClick={() => onViewChange('people')}
          >
            <i className="fas fa-users mr-3"></i> 친구
          </Button>
          <Button 
            variant="text" 
            className="flex items-center w-full justify-start"
            onClick={() => onViewChange('discover')}
          >
            <i className="fas fa-compass mr-3"></i> 탐색
          </Button>
          <Button 
            variant="text" 
            className="flex items-center w-full justify-start"
            onClick={() => onViewChange('chat')}
          >
            <i className="fas fa-comment mr-3"></i> 메시지
          </Button>
          <Button 
            variant="text" 
            className="flex items-center w-full justify-start"
          >
            <i className="fas fa-user mr-3"></i> 프로필
          </Button>

          <Button 
            variant="text" 
            className="flex items-center w-full justify-start mt-auto text-red-500"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt mr-3"></i> 로그아웃
          </Button>
        </nav>
      </div>
    </aside>
  );
} 