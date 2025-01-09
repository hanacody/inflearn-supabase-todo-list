"use client";

import DropboxImage from "./dropbox-image";


/**
 * DropboxImageList 컴포넌트
 * - 업로드된 이미지 파일들을 그리드 형태로 표시
 * - 이미지 미리보기 기능 제공
 * 
 * @param files - 표시할 이미지 파일 배열
 */
interface DropboxImageListProps {
  files: string[];
  onRefresh: () => Promise<void>;
}

export default function DropboxImageList({ files, onRefresh }: DropboxImageListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {files.map((url, index) => (
        <DropboxImage 
          key={index} 
          src={url}
          alt={`Image ${index + 1}`}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
