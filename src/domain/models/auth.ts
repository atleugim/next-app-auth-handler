export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface SignInRequest {
  data: {
    email: string;
    password: string;
  };
}
