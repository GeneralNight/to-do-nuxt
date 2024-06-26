import { UserProfile } from "@libs/models";


export interface IProfileRepository {
  createProfile(data: Partial<UserProfile>): Promise<void>;
  getProfile(profileId: string): Promise<UserProfile>;
}
