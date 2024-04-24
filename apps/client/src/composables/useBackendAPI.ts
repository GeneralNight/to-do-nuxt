import { FetchOptions } from 'ohmyfetch';

export default {
  async backendFetch<T>(path: string, options?: FetchOptions) {
    const token = (await useFirebase.user().value?.getIdToken()) || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalOptions: any = {
      headers: { Authorization: `Bearer ${token}` },
      ...options,
    };
    return $fetch<T>(`${'http://localhost:3000/'}${path}`, finalOptions);
  },
  signup(options?: FetchOptions): Promise<void> {
    return this.backendFetch(`auth/register/email`, { method: 'POST', ...options });
  },
}