import { UserProfile } from '@libs/models';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { PROFILE_STORE } from '../constants';

interface IState {
  loadingProfile: boolean;
  errorLoadProfile: boolean;
  profile?: UserProfile;
}

export const useProfileStore = defineStore(PROFILE_STORE, {
  state: (): IState => ({
    profile: undefined,
    loadingProfile: false,
    errorLoadProfile: false,
  }),
  getters: {},
  actions: {
    async loadProfile(profileId: string) {
      this.errorLoadProfile = false
      this.loadingProfile = true
      try {
        this.profile = await useBackendAPI.getUserProfile(profileId)
      } catch (error) {
        this.errorLoadProfile = true
      } finally {
        this.loadingProfile = false
      }
    }

  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
