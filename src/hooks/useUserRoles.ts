import React from 'react';

import useUser from './useUser';

const useUserRoles = () => {
  const { data: user } = useUser();

  const roles = React.useMemo(
    () => ({
      isAdmin: user?.role === 'ADMIN',
      isModerator: user?.role === 'MODERATOR',
      isUser: user?.role === 'USER',
    }),
    [user],
  );

  return roles;
};

export default useUserRoles;
