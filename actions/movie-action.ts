
"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type MovieRow = Database["public"]["Tables"]["movie"]["Row"];
export type MovieRowInsert = Database["public"]["Tables"]["movie"]["Insert"];
export type MovieRowUpdate = Database["public"]["Tables"]["movie"]["Update"];

/**
 * 에러 처리를 위한 유틸리티 함수
 * - 에러 발생 시 콘솔에 로깅하고 에러를 던짐
 */
function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

/**
 * 영화 목록을 조회하는 서버 액션
 * @param searchKeyword - 검색어 (선택)
 * @param category - 카테고리 필터 (선택)
 * @returns Promise<MovieRow[]>
 */
export async function getMovies({ 
  searchKeyword = "", 
  category = "전체" 
}): Promise<MovieRow[]> {
  const supabase = await createServerSupabaseClient();
  
  let query = supabase
    .from("movie")
    .select("*")
    .order("id", { ascending: false });

  // 검색어가 있는 경우 필터링
  if (searchKeyword) {
    query = query.like("title", `%${searchKeyword}%`);
  }

  // 카테고리 필터링 (전체가 아닌 경우에만)
  if (category !== "전체") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    handleError(error);
  }

  return data;
}

/**
 * 새로운 영화를 추가하는 서버 액션
 * @param movie - 추가할 영화 데이터
 */
export async function createMovie(movie: MovieRowInsert) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from("movie").insert({
    ...movie,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

/**
 * 영화 정보를 업데이트하는 서버 액션
 * @param movie - 업데이트할 영화 데이터
 */
export async function updateMovie(movie: MovieRowUpdate) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .update({
      ...movie,
      updated_at: new Date().toISOString(),
    })
    .eq("id", movie.id);

  if (error) {
    handleError(error);
  }

  return data;
}

/**
 * 영화를 삭제하는 서버 액션
 * @param id - 삭제할 영화의 ID
 */
export async function deleteMovie(id: number) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("movie")
    .delete()
    .eq("id", id);

  if (error) {
    handleError(error);
  }
}
