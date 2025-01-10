"use client";

import { useState } from "react";
import SearchInput from "./component/search-input";
import SubMenu from "./component/sub-menu";
import MovieCardList from "./component/movie-card-list";

export default function UI() {
    // 검색어 상태 관리
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [movies, setMovies] = useState([]);

    return (
        <main>
            <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
                <h1 className="text-xl">Netflix</h1>
                {/* TODO: 검색 기능 구현 */}
                <SearchInput value={searchInput} onChange={setSearchInput} />
                {/* TODO: 소메뉴 구현 */}
                <SubMenu selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                {/* TODO: 영화 목록 표시 구현 */}
                <MovieCardList movies={movies} searchKeyword={searchInput} selectedCategory={selectedCategory} />
                {/* TODO: 영화 상세 정보 표시 구현 */}
            </div>
        </main>
    );
}
