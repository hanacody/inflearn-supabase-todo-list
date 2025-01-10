"use client";

import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { getMovies } from "actions/movie-action";
import { useQuery } from "@tanstack/react-query";
import MovieDetail from "./movie-card";

/**
 * MovieCardList 컴포넌트
 * - 영화 목록을 그리드 형태로 표시하는 컴포넌트
 * - React Query를 사용하여 서버로부터 영화 데이터를 가져옴
 * - 검색어와 카테고리 필터링 적용
 * - 영화 카드 클릭 시 상세 정보 모달 표시
 * - 무한 스크롤 구현: 초기 20개 로드 후 스크롤 시 8개씩 추가 로드
 * 
 * TODO: 
 * - 이미지 최적화 적용 필요
 */
interface Movie {
  id: number;
  title: string;
  image_url: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: number;
}

interface MovieCardListProps {
  movies: Movie[];
  searchKeyword: string;
  selectedCategory: string;
}

export default function MovieCardList({
  movies: initialMovies,
  searchKeyword,
  selectedCategory
}: MovieCardListProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20); // 초기 표시 개수
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // React Query를 사용하여 영화 데이터 가져오기
  const { data: movies = [] } = useQuery({
    queryKey: ['movies', searchKeyword, selectedCategory],
    queryFn: () => getMovies({ searchKeyword, category: selectedCategory })
  });

  /**
   * 무한 스크롤 구현을 위한 Intersection Observer 설정
   * - 스크롤이 감지되면 8개씩 추가 로드
   */
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && movies.length > visibleCount) {
      setVisibleCount(prev => Math.min(prev + 8, movies.length));
    }
  }, [movies.length, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1
    });
    observerRef.current = observer;

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  // 검색어나 카테고리가 변경되면 visible count 초기화
  useEffect(() => {
    setVisibleCount(20);
  }, [searchKeyword, selectedCategory]);

  const visibleMovies = movies.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleMovies.map((movie) => (
          <Card 
            key={movie.id} 
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              setSelectedMovie(movie);
              setIsModalOpen(true);
            }}
          >
            <CardHeader floated={false} className="relative">
              <img src={movie.image_url} alt={movie.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-lg flex items-center">
                <i className="fas fa-star text-yellow-500 mr-1"></i>
                <span className="text-white text-sm">{movie.vote_average}</span>
              </div>
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                {movie.title}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 무한 스크롤을 위한 관찰 대상 요소 */}
      <div ref={loadMoreRef} className="h-10" />

      {/* 영화 상세 정보 모달 */}
      {isModalOpen && selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }} 
        />
      )}
    </>
  );
}
