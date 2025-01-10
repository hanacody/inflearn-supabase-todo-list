"use client";

import { Button } from "@material-tailwind/react";

/**
 * SubMenu 컴포넌트
 * - 영화 카테고리 필터링을 위한 서브 메뉴 컴포넌트
 * - 현재 선택된 카테고리를 시각적으로 표시
 */
interface SubMenuProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function SubMenu({
  selectedCategory,
  onCategoryChange
}: SubMenuProps) {
  const categories = ["전체", "드라마", "액션", "코미디", "로맨스"];

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "filled" : "outlined"}
          size="sm"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
