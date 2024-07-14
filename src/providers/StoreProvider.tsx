'use client';

import React from 'react';
import { AuthStore } from '@/store';

let store: AuthStore;

export const authStoreContext = React.createContext<AuthStore | undefined>(undefined);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  if (!store) {
    store = new AuthStore();
  }

  return <authStoreContext.Provider value={store}>{children}</authStoreContext.Provider>;
};

export default StoreProvider;
