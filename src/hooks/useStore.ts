import React from 'react';

import { storeContext } from '@/providers';

const useStore = () => {
  const context = React.useContext(storeContext);

  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};

export default useStore;
