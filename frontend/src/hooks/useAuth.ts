import { useState, useEffect } from 'react';
import { RootState } from '../store/index';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { LoginData, getLoginData } from '../utils/local-storage.util';
import { setUser, AuthSliceInterface } from '../store/auth/auth-slice';

export interface UseAuthReturn {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export default function useAuth(): UseAuthReturn {
  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loginData: LoginData | null = getLoginData();
    if (loginData?.user != null) {
      const payLoad: AuthSliceInterface = {
        isLoggedIn: true,
        user: { ...loginData.user },
      };
      dispatch(setUser(payLoad));
    }
    setIsLoading(false);
  }, [dispatch]);

  return { isLoggedIn, isLoading };
}
