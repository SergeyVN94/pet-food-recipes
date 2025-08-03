'use client';

import React from 'react';

import axios from 'axios';

import { useSendConfirmationEmail } from '@/hooks';
import { Button } from '@/ui';
import { showToast } from '@/utils';

const LOCK_TIME = 1000 * 60 * 60;

type SendEmailButtonProps = {
  email: string;
};

const SendEmailButton = ({ email }: SendEmailButtonProps) => {
  const emailSendingTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lockTime, setLockTime] = React.useState('');

  const setTimer = (lastTimeMs: number) => {
    if (emailSendingTimer.current) {
      clearInterval(emailSendingTimer.current);
    }

    emailSendingTimer.current = setInterval(() => {
      const diff = new Date().getTime() - lastTimeMs;

      if (diff >= LOCK_TIME) {
        clearInterval(emailSendingTimer.current!);
        emailSendingTimer.current = null;
        setLockTime('');
        return;
      }

      const millisecondsLeft = LOCK_TIME - diff;
      const minutes = Math.floor(millisecondsLeft / 1000 / 60);
      const seconds = Math.floor((millisecondsLeft / 1000) % 60);

      setLockTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
  };

  const { mutateAsync: sendConfirmationEmail, isPending: isSending } = useSendConfirmationEmail({
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'EMAIL_ALREADY_VERIFIED') {
          showToast('error', 'Почта уже подтверждена');
          return;
        }

        if (error.response?.data?.message === 'USER_NOT_EXIST') {
          showToast('error', 'Пользователь с такой почтой не найден');
          return;
        }

        if (error.response?.data?.message === 'EMAIL_ALREADY_SENT') {
          const lastTimeUtc = error.response?.data?.data;

          if (!lastTimeUtc) {
            showToast('warning', 'Письмо уже отправлено');
            console.error(error.response?.data);
            return;
          }

          const lastTimeMs = new Date(lastTimeUtc).getTime();

          setTimer(lastTimeMs);

          return;
        }
      }

      showToast('error', 'Что-то пошло не так');
      console.error(error);
    },
    onSuccess: () => {
      showToast('success', `Письмо отправлено на почту ${email}`);
      setTimer(new Date().getTime());
    },
  });

  React.useEffect(
    () => () => {
      if (emailSendingTimer.current) {
        clearInterval(emailSendingTimer.current);
      }
    },
    [],
  );

  return (
    <Button onClick={() => sendConfirmationEmail(email)} disabled={isSending || Boolean(lockTime)} variant="outline">
      Отправить повторно {lockTime && <span className="text-on-surf">(&nbsp;{lockTime})</span>}
    </Button>
  );
};
export default SendEmailButton;
