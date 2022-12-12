export interface UserAuth {
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  id: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
