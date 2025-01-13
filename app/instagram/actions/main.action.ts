import { atom, useRecoilState } from 'recoil';

interface Post {
  id: number;
  username: string;
  caption: string;
}

/**
 * 메인 피드 게시물 상태 관리
 * - Recoil atom으로 게시물 목록 관리
 * - 무한 스크롤을 위한 페이지네이션 상태 포함
 */
const postsState = atom<Post[]>({
  key: 'mainPagePosts',
  default: []
});

export function useMainPage() {
  const [posts, setPosts] = useRecoilState(postsState);
  const isLoading = false;

  const loadMore = async () => {
    // TODO: API 호출 및 상태 업데이트 구현
    console.log('더 많은 게시물 로딩');
  };

  return { posts, isLoading, loadMore };
} 