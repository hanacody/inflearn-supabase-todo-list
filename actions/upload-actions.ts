"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

/**
 * FileUploadService - 파일 업로드 관련 비즈니스 로직을 처리하는 서비스 클래스
 * 
 * @description
 * - Repository Pattern을 적용하여 Storage 접근 로직을 캡슐화
 * - Dependency Injection을 통해 Supabase 클라이언트 주입
 * - 파일 업로드 상태 관리 및 에러 핸들링 구현
 */
class FileUploadService {
  private supabase;
  private bucketName = 'minibox';

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * FormData에서 파일을 추출하여 업로드
   */
  async uploadFile(formData: FormData): Promise<string> {
    try {
      const file = formData.get('file') as File;
      if (!file) throw new Error('파일이 없습니다.');

      // 유니크한 파일명 생성
      const fileExt = file.name.split('.').pop();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
      const fileName = `${uniqueId}.${fileExt}`;

      // 파일 업로드
      const { error: uploadError } = await this.supabase.storage
        .from(this.bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // 완전한 URL 생성
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, '');
      const fullUrl = `https://${supabaseUrl.replace('https://', '')}/storage/v1/object/public/${this.bucketName}/${fileName}`;
      
      console.log('Generated URL:', fullUrl); // 디버깅용
      return fullUrl;

    } catch (error) {
      console.error('상세 에러 정보:', {
        error,
        message: error instanceof Error ? error.message : '알 수 없는 에러',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * 파일 삭제 처리
   * @param fileUrl - 삭제할 파일의 URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // URL에서 파일명 추출 로직 개선
      const urlParts = fileUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (!fileName) {
        throw new Error('잘못된 파일 URL입니다.');
      }

      const { error } = await this.supabase.storage
        .from(this.bucketName)
        .remove([fileName]);

      if (error) throw error;
      revalidatePath('/dropbox');

    } catch (error) {
      console.error('파일 삭제 실패:', error);
      throw new Error('파일 삭제에 실패했습니다.');
    }
  }
}

// 싱글톤 인스턴스 생성
const fileUploadService = new FileUploadService();

// 서버 액션으로 노출할 함수들
export async function uploadFiles(formData: FormData): Promise<string[]> {
  try {
    const urls = await fileUploadService.uploadFile(formData);
    console.log('Uploaded file URL:', urls);
    return [urls];
  } catch (error) {
    console.error('Upload action failed:', error);
    throw error;
  }
}

export async function deleteFile(fileUrl: string) {
  return await fileUploadService.deleteFile(fileUrl);
}
