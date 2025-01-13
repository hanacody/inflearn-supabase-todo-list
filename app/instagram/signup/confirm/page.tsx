/**
 * 이메일 인증 확인 페이지
 * 
 * - 이메일 인증 처리 중 표시되는 로딩 화면
 * - route.ts에서 실제 인증 처리 후 리다이렉션 수행
 */
export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-4xl text-pink-500 mb-4"></i>
        <h1 className="text-2xl font-semibold mb-2">이메일 인증 처리 중...</h1>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
