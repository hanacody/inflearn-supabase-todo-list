"use client";

import Image from "next/image";
import { deleteFile } from "actions/upload-actions";

/**
 * DropboxImage 컴포넌트
 * - 단일 이미지 파일을 표시하는 컴포넌트
 * - 이미지 미리보기와 파일명을 함께 표시
 * 
 * @param file - 표시할 이미지 파일
 */
interface DropboxImageProps {
  src: string;
  alt: string;
  onRefresh: () => Promise<void>;
}

export default function DropboxImage({ src, alt, onRefresh }: DropboxImageProps) {
  // 이미 완전한 URL이므로 추가 처리 불필요
  return (
    <div className="relative aspect-square group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-lg"
      />
      {/* 이미지 하단에 표시되는 정보 레이어 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-lg p-4 flex justify-between items-center">
        {/* 파일명 표시 영역 */}
        <div className="text-white text-sm truncate flex-1">
          {src.split('/').pop()}
        </div>
        
        {/* 삭제 버튼 */}
        <button 
          className="ml-2 bg-red-500 hover:bg-red-600 text-white px-1.5 py-0.5 rounded-full"
          onClick={async (e) => {
            e.stopPropagation();
            if (confirm('정말로 이 파일을 삭제하시겠습니까?')) {
              try {
                await deleteFile(src);
                await onRefresh();  // 삭제 후 목록 리프레시
              } catch (error) {
                console.error('파일 삭제 실패:', error);
                alert('파일 삭제에 실패했습니다.');
              }
            }
          }}
        >
          <i className="fas fa-trash-alt text-[10px]" />
        </button>
      </div>

    </div>
  );
}
