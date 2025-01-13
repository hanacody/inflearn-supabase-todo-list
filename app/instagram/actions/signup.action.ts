import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * 회원가입 상태 관리를 위한 Recoil Atoms
 * - BLoC 패턴을 활용한 상태 관리 구현
 * - 로딩, 에러, 회원가입 상태를 개별 atom으로 관리
 */
const loadingState = atom({
  key: 'signUpLoadingState',
  default: false
});

const errorState = atom({
  key: 'signUpErrorState',
  default: null as string | null
});

const signUpSuccessState = atom({
  key: 'signUpSuccessState',
  default: false
});

/**
 * 회원가입 상태 통합 Selector
 */
const signUpStateSelector = selector({
  key: 'signUpStateSelector',
  get: ({get}) => ({
    isLoading: get(loadingState),
    error: get(errorState),
    isSuccess: get(signUpSuccessState)
  })
});

export function useSignUp() {
  const supabase = createClientComponentClient();
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [isSuccess, setSuccess] = useRecoilState(signUpSuccessState);
  const signUpState = useRecoilValue(signUpStateSelector);

  /**
   * 회원가입 처리 함수
   * - Supabase Auth를 활용한 회원가입 구현
   * - 에러 처리 및 상태 업데이트 포함
   */
  const signUp = async (email: string, password: string, username: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            name
          },
          emailRedirectTo: 'http://localhost:3000/instagram/signup/confirm'
        }
      });

      if (error) throw error;
      
      setSuccess(true);
      return data;
      
    } catch (error) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      console.error('회원가입 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
    isSuccess,
    signUpState
  };
}
