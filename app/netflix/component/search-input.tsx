"use client";

import { Input } from "@material-tailwind/react";

/**
 * SearchInput 컴포넌트
 * - 검색어 입력을 처리하는 재사용 가능한 컴포넌트
 * - Material Tailwind Input 컴포넌트를 래핑하여 사용
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ 
  value, 
  onChange,
  placeholder = "Search..."
}: SearchInputProps) {
  return (
    <Input
      label="Search"
      placeholder={placeholder}
      icon={<i className="fas fa-search" />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
