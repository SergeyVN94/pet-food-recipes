'use client';

import React, { Suspense } from 'react';

import { useRouter } from 'next/router';

import { useUser } from '@/hooks';

type BanRedirectProps = React.PropsWithChildren<{}>;

const BanRedirect = ({ children }: BanRedirectProps) => {
  const { data: user, isFetching } = useUser();
  const navigate = useRouter();

  React.useLayoutEffect(() => {
    if (user?.ban) {
      navigate.push('/not-access');
    }
  }, [user]);

  return !isFetching && !user?.ban ? children : null;
};

const BanRedirectWrapper = (props: BanRedirectProps) => (
  <Suspense fallback={<></>}>
    <BanRedirect {...props} />
  </Suspense>
);

export default BanRedirectWrapper;
