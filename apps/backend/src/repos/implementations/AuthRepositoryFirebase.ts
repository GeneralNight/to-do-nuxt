import { LoginResponse, RegisterResponse } from '@libs/models';
import { getApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { IAuthRepository } from '../interfaces/IAuthRepository';

export class AuthRepositoryFirebase implements IAuthRepository {
  private auth = getAuth(getApp());

  async loginWithEmail(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    const credentials = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const token = await credentials.user.getIdToken();

    return { bearerToken: token, uid: credentials.user.uid };
  }

  async register(email: string, password: string): Promise<RegisterResponse> {

    const credentials = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const token = await credentials.user.getIdToken();

    return { bearerToken: token, uid: credentials.user.uid };
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }
}
