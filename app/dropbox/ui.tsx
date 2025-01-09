"use client";

import SearchInput from "./components/search-input";
import { useState, useEffect } from "react";
import FileDragDropZone from "./components/file-dragdropzone";
import DropboxImageList from "./components/dropbox-image-list";
import { createClient } from "@supabase/supabase-js";

export default function UI() {
    const [searchInput, setSearchInput] = useState("");
    const [files, setFiles] = useState<string[]>([]);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 검색어를 기반으로 필터링된 파일 목록
    const filteredFiles = files.filter(url => {
      if (!searchInput.trim()) return true; // 검색어가 없으면 모든 파일 표시
      
      const fileName = url.split('/').pop()?.toLowerCase() || '';
      return fileName.includes(searchInput.toLowerCase());
    });

    // 파일 목록 가져오기 함수
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .storage
        .from('minibox')
        .list();

      if (error) {
        console.error('파일 목록 가져오기 실패:', error);
        return;
      }

      const imageFiles = data.filter(file => {
        const isImage = file.metadata?.mimetype?.startsWith('image/');
        const isNotPlaceholder = file.name !== '.emptyFolderPlaceholder';
        return isImage && isNotPlaceholder;
      });

      const fileUrls = imageFiles.map(file => {
        const { data: { publicUrl } } = supabase
          .storage
          .from('minibox')
          .getPublicUrl(file.name);
        return publicUrl;
      });

      setFiles(fileUrls);
    };

    useEffect(() => {
      fetchFiles();
    }, []);

    const handleFilesDrop = (urls: string[]) => {
        setFiles(prev => [...prev, ...urls]);
    };

    return (
        <main>
            <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
                <h1 className="text-xl">DropBox</h1>
                <SearchInput value={searchInput} onChange={setSearchInput} />
                <FileDragDropZone onFilesDrop={handleFilesDrop} />
                <DropboxImageList files={filteredFiles} onRefresh={fetchFiles} />
                {filteredFiles.length === 0 && searchInput && (
                  <p className="text-gray-500 mt-4">
                    "{searchInput}"에 대한 검색 결과가 없습니다.
                  </p>
                )}
            </div>
        </main>
    );
}
