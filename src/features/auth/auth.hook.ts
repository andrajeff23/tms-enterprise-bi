import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginAPI } from './auth.api';
import { loginSuccess, logout } from '../../shared/lib/store/authSlice';
import { LoginCredentials } from './auth.schema';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAPI(credentials);
      
      // Simpan token ke LocalStorage
      localStorage.setItem('tms_auth_token', response.token);
      localStorage.setItem('tms_user', JSON.stringify(response.user));
      
      // Dispatch ke Redux
      dispatch(loginSuccess(response));
      return true;
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login');
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('tms_auth_token');
    localStorage.removeItem('tms_user');
    dispatch(logout());
  }, [dispatch]);

  return {
    login,
    logout: handleLogout,
    loading,
    error,
    clearError: () => setError(null)
  };
};
