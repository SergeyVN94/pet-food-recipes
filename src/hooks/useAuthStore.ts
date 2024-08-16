import React from 'react';

import { authStoreContext } from '@/providers';

const useAuthStore = () => {
  const context = React.useContext(authStoreContext);

  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};

export default useAuthStore;
