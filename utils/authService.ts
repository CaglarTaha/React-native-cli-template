import apiService from './apiService';
import { StorageService } from './storage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  // Login işlemi
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      // Token'ları ve user data'yı kaydet
      await StorageService.setAuthToken(response.accessToken);
      await StorageService.setRefreshToken(response.refreshToken);
      await StorageService.setUserData(response.user);
      await StorageService.setIsLoggedIn(true);
      
      console.log('✅ Login successful');
      return response;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  // Register işlemi
  static async register(registerData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', registerData);
      
      // Token'ları ve user data'yı kaydet
      await StorageService.setAuthToken(response.accessToken);
      await StorageService.setRefreshToken(response.refreshToken);
      await StorageService.setUserData(response.user);
      await StorageService.setIsLoggedIn(true);
      
      console.log('✅ Registration successful');
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  }

  // Logout işlemi
  static async logout(): Promise<void> {
    try {
      // Backend'e logout request gönder (optional)
      try {
        await apiService.post('/auth/logout');
      } catch (logoutError) {
        console.warn('Backend logout failed, continuing with local logout');
      }
      
      // Local storage'ı temizle
      await StorageService.clearAuthData();
      await StorageService.setIsLoggedIn(false);
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      throw error;
    }
  }

  // Token refresh işlemi
  static async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await apiService.post<{ accessToken: string }>('/auth/refresh', {
        refreshToken,
      });
      
      await StorageService.setAuthToken(response.accessToken);
      
      return response.accessToken;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      throw error;
    }
  }

  // Kullanıcı profilini getir
  static async getUserProfile(): Promise<any> {
    try {
      const response = await apiService.get('/auth/profile');
      
      // Güncel user data'yı kaydet
      await StorageService.setUserData(response);
      
      return response;
    } catch (error) {
      console.error('❌ Get user profile failed:', error);
      throw error;
    }
  }

  // Şifre değiştirme
  static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      await apiService.post('/auth/change-password', {
        oldPassword,
        newPassword,
      });
      
      console.log('✅ Password changed successfully');
    } catch (error) {
      console.error('❌ Password change failed:', error);
      throw error;
    }
  }

  // Şifre sıfırlama
  static async forgotPassword(email: string): Promise<void> {
    try {
      await apiService.post('/auth/forgot-password', { email });
      
      console.log('✅ Password reset email sent');
    } catch (error) {
      console.error('❌ Forgot password failed:', error);
      throw error;
    }
  }

  // Token geçerliliğini kontrol et
  static async validateToken(): Promise<boolean> {
    try {
      await apiService.get('/auth/validate');
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  // Stored user data'yı al
  static async getStoredUserData(): Promise<any | null> {
    return await StorageService.getUserData();
  }
}

export default AuthService;