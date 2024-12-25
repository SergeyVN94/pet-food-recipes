import { QueryClient } from '@tanstack/react-query';

import AuthStore from './AuthStore';

class RootStore {
  public authStore: AuthStore;

  constructor(private readonly queryClient: QueryClient) {
    this.authStore = new AuthStore(this, this.queryClient);
  }
}

export default RootStore;
