"use client";

import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

/**
 * MovieDetail 컴포넌트
 * - 선택된 영화의 상세 정보를 좌우 배치로 표시하는 컴포넌트
 * - 왼쪽에는 영화 포스터, 오른쪽에는 상세 정보 배치
 * - Material Tailwind 컴포넌트를 활용하여 일관된 UI 제공
 * 
 * TODO:
 * - 추가 영화 정보 표시 (장르, 러닝타임 등) 구현 필요
 * - 모바일 환경에서의 반응형 디자인 최적화 필요
 */
interface MovieDetailProps {
  movie: {
    id: number;
    title: string;
    image_url: string;
    overview: string;
    popularity: number;
    release_date: string;
    vote_average: number;
  };
  onClose: () => void;
}

export default function MovieDetail({ movie, onClose }: MovieDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 z-10"
        >
          <i className="fas fa-times" />
        </button>
        <div className="w-full md:w-2/5">
          <CardHeader floated={false} className="h-[400px] md:h-full m-0">
            <img 
              src={movie.image_url} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="fas fa-star text-yellow-500" />
                <span className="text-white">{movie.vote_average}</span>
              </div>
            </div>
          </CardHeader>
        </div>
        <div className="w-full md:w-3/5">
          <CardBody className="h-full flex flex-col">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {movie.title}
            </Typography>
            <Typography variant="small" color="gray" className="mb-4">
              개봉일: {new Date(movie.release_date).toLocaleDateString()}
            </Typography>
            <Typography color="gray" className="mb-8 flex-grow">
              {movie.overview}
            </Typography>
            <div className="flex items-center gap-4">
              <Typography variant="small" color="gray">
                인기도: {movie.popularity}
              </Typography>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
}
