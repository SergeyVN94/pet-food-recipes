'use client';

import React, { Suspense } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { protectedRoutes } from '@/constants';
import { useCheckAccessToken } from '@/hooks';

const protectedRoutesMap = protectedRoutes.reduce<Record<string, boolean>>((acc, route) => ({ ...acc, [route]: true }), {});

type AuthCheckProps = React.PropsWithChildren<{
  feedback?: React.ReactNode;
}>;

const AuthCheck = ({ children, feedback }: AuthCheckProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigation = useRouter();
  const { data: checkResult, isFetching: isCheckResultFetching } = useCheckAccessToken({
    enabled: protectedRoutesMap[pathname],
  });

  React.useLayoutEffect(() => {
    const isProtectedRoute = protectedRoutesMap[pathname];

    if (isProtectedRoute && !isCheckResultFetching && checkResult?.message !== 'OK') {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set('redirect', pathname);
      const query = nextSearchParams.toString();

      navigation.push(`/auth/login${query ? `?${query}` : ''}`);
    }
  }, [isCheckResultFetching, checkResult, navigation, pathname]);

  const feedbackElement =
    feedback === undefined ? <div className="skeleton w-[9.375rem] h-[2.75rem] cursor-progress rounded-full" /> : feedback;
  const content = (!protectedRoutesMap[pathname] || (!isCheckResultFetching && checkResult?.message === 'OK')) && children;

  return isCheckResultFetching ? feedbackElement : content;
};

const AuthCheckWrapper = (props: AuthCheckProps) => (
  <Suspense fallback={props.feedback}>
    <AuthCheck {...props} />
  </Suspense>
);

export default AuthCheckWrapper;
