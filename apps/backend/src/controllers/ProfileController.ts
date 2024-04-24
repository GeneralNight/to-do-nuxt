import { Get, Path, Route, Tags } from 'tsoa';
import { ProfileService } from '../services/ProfileService';
import { defaultErrorHandler } from '../utils/DefaultErrorHandler';

@Route('profile')
@Tags('profile')
export class ProfileController {
  private _profileService: ProfileService = new ProfileService();

  private _handleError(error: any): any {
    defaultErrorHandler(error);
  }

  @Get('{profileId}')
  public async getProfile(@Path() profileId: string) {
    return await this._profileService.getProfile(profileId);
  }
}
