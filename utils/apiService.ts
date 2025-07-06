import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StorageService } from './storage';

// API Base URL - Kendi backend URL'nizi buraya yazın
const API_BASE_URL = 'https://your-api-url.com/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Axios instance oluştur
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - JWT token ekle
    this.setupRequestInterceptor();
    
    // Response interceptor - Token yenileme ve hata yönetimi
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (config: any) => {
        try {
          // JWT token'ı storage'dan al
          const token = await StorageService.getAuthToken();
          
          if (token) {
            // Authorization header'ına token ekle
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            };
          }

          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
          return config;
        } catch (error) {
          console.error('Request interceptor error:', error);
          return config;
        }
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }

  private setupResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Refresh token ile yeni access token al
            const refreshToken = await StorageService.getRefreshToken();
            
            if (refreshToken) {
              const newToken = await this.refreshAuthToken(refreshToken);
              
              if (newToken) {
                // Yeni token'ı kaydet
                await StorageService.setAuthToken(newToken);
                
                // Original request'i yeni token ile tekrar gönder
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return this.axiosInstance(originalRequest);
              }
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Token yenileme başarısız - kullanıcıyı logout yap
            await this.handleLogout();
          }
        }

        // Diğer hataları logla
        console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  private async refreshAuthToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      return response.data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  private async handleLogout() {
    try {
      // Tüm auth bilgilerini temizle
      await StorageService.clearAuthData();
      await StorageService.setIsLoggedIn(false);
      
      console.log('User logged out due to token expiry');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Public API methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  // Raw axios instance'a erişim (özel durumlar için)
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;