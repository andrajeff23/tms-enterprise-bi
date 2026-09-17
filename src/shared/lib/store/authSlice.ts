import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../features/auth/auth.schema';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const getUserFromStorage = () => {
  try {
    const item = localStorage.getItem('tms_user');
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('tms_auth_token'),
  user: getUserFromStorage(),
  token: localStorage.getItem('tms_auth_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
