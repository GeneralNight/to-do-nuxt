import { UserProfile } from '@libs/models';
import { ProfileRepositoryFirebase } from '../repos/implementations/ProfileRepositoryFirebase';
import { IProfileRepository } from '../repos/interfaces/IProfileRepository';
import { defaultErrorHandler } from '../utils/DefaultErrorHandler';



export class ProfileService {
  private _profileRepo: IProfileRepository;

  constructor(profileRepo?: IProfileRepository) {
    this._profileRepo = profileRepo ?? new ProfileRepositoryFirebase();
  }

  private _handleError(error: any): any {
    defaultErrorHandler(error);
  }

  async getProfile(profileId: string): Promise<UserProfile> {
    return this._profileRepo.getProfile(profileId)
  }
}
