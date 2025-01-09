"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "actions/upload-actions";

/**
 * FileDragDropZone 컴포넌트
 * - 파일 드래그 앤 드롭 기능을 제공하는 컴포넌트
 * - react-dropzone 라이브러리를 활용하여 구현
 * - Supabase Storage에 파일 업로드 기능 구현
 * 
 * @param onFilesDrop - 파일이 드롭되었을 때 실행될 콜백 함수
 */
interface FileDragDropZoneProps {
  onFilesDrop: (urls: string[]) => void;
}

export default function FileDragDropZone({ onFilesDrop }: FileDragDropZoneProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 파일 드롭 핸들러
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // FormData로 변환하여 전송
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return await uploadFiles(formData);
      });

      const uploadedUrlsArrays = await Promise.all(uploadPromises);
      const uploadedUrls = uploadedUrlsArrays.flat();
      
      console.log('업로드된 파일 URLs:', uploadedUrls);
      onFilesDrop(uploadedUrls);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      setUploadError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  }, [onFilesDrop]);

  // react-dropzone 훅 설정
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    disabled: isUploading // 업로드 중에는 추가 드롭 비활성화
  });

  return (
    <div className="w-full space-y-2">
      <div 
        {...getRootProps()} 
        className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <i className={`fas ${isUploading ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'} text-3xl mb-2 text-gray-400`} />
          <p className="text-gray-600">
            {isUploading ? '업로드 중...' :
              isDragActive ? '파일을 여기에 놓으세요' : 
              '파일을 드래그하여 놓거나 클릭하여 선택하세요'}
          </p>
        </div>
      </div>
      
      {/* 에러 메시지 표시 */}
      {uploadError && (
        <div className="text-red-500 text-sm text-center">
          {uploadError}
        </div>
      )}
    </div>
  );
}
