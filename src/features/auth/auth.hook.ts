import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginAPI } from './auth.api';
import { loginSuccess, logout } from '../../shared/lib/store/authSlice';
import { LoginCredentials } from './auth.schema';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat datang kembali di sistem TMS BI!',
        timer: 1500,
        showConfirmButton: false
      });
      return true;
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: err.message || 'Terjadi kesalahan saat login.'
      });
      setError(err.message || 'Terjadi kesalahan saat login');
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar dari sistem?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('tms_auth_token');
        localStorage.removeItem('tms_user');
        dispatch(logout());
        Swal.fire({
          icon: 'success',
          title: 'Logout Berhasil',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }, [dispatch]);

  return {
    login,
    logout: handleLogout,
    loading,
    error,
    clearError: () => setError(null)
  };
};
