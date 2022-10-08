import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoogleUserProfile } from '../../types';
import {
  LoginData,
  setLoginData,
  clearLoginData,
} from '../../utils/local-storage.util';

export interface AuthSliceInterface {
  isLoggedIn: boolean;
  user: GoogleUserProfile | null;
  error?: any;
}

export const initialState: AuthSliceInterface = {
  isLoggedIn: false,
  user: null,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state: AuthSliceInterface,
      action: PayloadAction<AuthSliceInterface>
    ) {
      const loginData: LoginData = {
        user: action.payload.user != null ? { ...action.payload.user } : null,
      };
      setLoginData(loginData);
      state.user = action.payload.user;
      state.isLoggedIn = Boolean(
        action.payload.user != null && action.payload.isLoggedIn
      );
      state.error = undefined;
    },
    setError(state: AuthSliceInterface, action: PayloadAction<any>) {
      clearLoginData();
      return { ...initialState, error: action.payload };
    },
    logoutUser() {
      clearLoginData();
      return initialState;
    },
    setOfflineUser() {
      return initialState;
    },
  },
});

export const { setUser, setError, logoutUser, setOfflineUser } =
  authSlice.actions;
export default authSlice.reducer;
