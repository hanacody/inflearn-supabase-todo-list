import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * 로그인 상태 관리를 위한 Recoil Atoms
 */
const loadingState = atom({
  key: 'signInLoadingState',
  default: false
});

const errorState = atom({
  key: 'signInErrorState',
  default: null as string | null
});

const authState = atom({
  key: 'signInAuthState', 
  default: false
});

const signInStateSelector = selector({
  key: 'signInStateSelector',
  get: ({get}) => ({
    isLoading: get(loadingState),
    error: get(errorState),
    isAuthenticated: get(authState)
  })
});

export function useSignIn() {
  const supabase = createClientComponentClient();
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [isAuthenticated, setAuthenticated] = useRecoilState(authState);

  /**
   * 사용자 로그인 처리 함수
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 로그인 성공 시 사용자 데이터, 실패 시 null
   */
  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Supabase 인증 요청
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        // 에러 메시지 한글화
        if (signInError.message === 'Invalid login credentials') {
          throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        throw signInError;
      }

      if (data?.user) {
        // 세션 검증
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
          throw new Error('세션 생성에 실패했습니다.');
        }
        
        setAuthenticated(true);
        return data;
      } else {
        throw new Error('사용자 데이터를 찾을 수 없습니다.');
      }
      
    } catch (error: any) {
      console.error('로그인 에러:', error);
      // 사용자 친화적인 에러 메시지 설정
      setError(error.message === 'Invalid login credentials' 
        ? '이메일 또는 비밀번호가 올바르지 않습니다.'
        : error.message || '로그인에 실패했습니다.');
      setAuthenticated(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 로그아웃 처리 함수
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setAuthenticated(false);
      setError(null);
    } catch (error: any) {
      console.error('로그아웃 에러:', error);
      setError('로그아웃에 실패했습니다.');
    }
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    signIn,
    signOut
  };
}