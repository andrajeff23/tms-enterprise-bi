import { AuthResponse, LoginCredentials } from './auth.schema';

// Simulasi delay jaringan
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await delay(1200); // Simulasi delay 1.2 detik
  
  if (credentials.email === 'admin@tms.com' && credentials.password === 'admin123') {
    return {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_payload.signature',
      user: {
        id: 'USR-001',
        name: 'Administrator TMS',
        email: 'admin@tms.com',
        role: 'ADMIN',
        avatar: 'https://ui-avatars.com/api/?name=Admin+TMS&background=4F46E5&color=fff'
      }
    };
  }

  throw new Error('Email atau password salah!');
};
