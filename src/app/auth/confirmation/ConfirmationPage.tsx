'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useValidateConfirmationToken } from '@/hooks';
import { showToast } from '@/utils';

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useRouter();

  const { isFetching, error, data } = useValidateConfirmationToken(token ?? undefined, {
    enabled: Boolean(token),
  });

  React.useEffect(() => {
    if (data?.message === 'EMAIL_VERIFIED') {
      navigate.push('/auth/login');
      showToast('success', 'Почта успешно подтверждена');
    }
  }, [data]);

  return (
    <div>
      {isFetching && <h3 className="title-m">Идет проверка ссылки</h3>}
      {!isFetching && !error && <h3 className="title-m">Ссылка недействительна</h3>}
    </div>
  );
};

export default ConfirmationPage;
