export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterData extends LoginCredentials {
  fullName: string;
  phoneNumber: string;
  
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
