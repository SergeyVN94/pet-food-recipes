import { Suspense } from 'react';

import ConfirmationPage from './ConfirmationPage';

export const metadata = {
  title: 'Подтверждение токена',
  description: 'Подтверждение токена',
  category: 'authentication',
};

const ConfirmationPageWrapper = () => (
  <Suspense fallback={<div className="skeleton w-full h-[calc(4rem)]" />}>
    <ConfirmationPage />
  </Suspense>
);

export default ConfirmationPageWrapper;
