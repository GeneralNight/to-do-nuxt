import { ApiError, LoginResponse, RegisterResponse, ResponseCode } from '@libs/models';
import { AuthRepositoryFirebase } from '../repos/implementations/AuthRepositoryFirebase';
import { IAuthRepository } from '../repos/interfaces/IAuthRepository';
import { defaultErrorHandler } from '../utils/DefaultErrorHandler';



export class AuthService {
  private _authRepo: IAuthRepository;
 
  constructor(authRepo?: IAuthRepository) {
    this._authRepo = authRepo ?? new AuthRepositoryFirebase();
  }

  private _handleError(error: any): any {
    defaultErrorHandler(error);
  }

  async loginWithEmail(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      const response = await this._authRepo.loginWithEmail(email, password);
      if (!response.uid) {
        throw new ApiError(ResponseCode.OK, 'Invalid credentials or user not found');
      }
     return response
    } catch (err) {
      return this._handleError(err);
    }
  }

  async register(email: string, password: string): Promise<RegisterResponse> {
    try {
      return this._authRepo.register(email, password);
    } catch (err) {
      return this._handleError(err);
    }
  }

  async recoveryPassword(email: string) {
    try {
      return await this._authRepo.sendPasswordResetEmail(email);
    } catch (err) {
      return this._handleError(err);
    }
  }
}
