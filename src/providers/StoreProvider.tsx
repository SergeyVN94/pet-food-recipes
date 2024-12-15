'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { RootStore } from '@/store';

let store: RootStore;

export const storeContext = React.createContext<RootStore | undefined>(undefined);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  if (!store) {
    store = new RootStore(queryClient);
  }

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export default StoreProvider;
