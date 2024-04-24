import { UserProfile } from "@libs/models";


export interface IProfileRepository {
  createProfile(data: Partial<UserProfile>): Promise<void>;
}
