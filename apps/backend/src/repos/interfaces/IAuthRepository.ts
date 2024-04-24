import { LoginResponse, RegisterResponse } from '@libs/models';

export interface IAuthRepository {
  register(email: string, password: string): Promise<RegisterResponse>;
  loginWithEmail(email: string, password: string): Promise<LoginResponse>;
  sendPasswordResetEmail(email: string): Promise<void>;
}
