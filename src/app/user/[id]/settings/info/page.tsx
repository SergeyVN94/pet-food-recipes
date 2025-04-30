'use client';

import { useParams } from 'next/navigation';

import { DeleteAvatar, UpdateAvatar } from '../components';

const InfoSettingsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <p className="label-l mb-2">Обновить аватар</p>
        <UpdateAvatar />
      </div>
      <DeleteAvatar className="self-start" userId={id!} />
    </div>
  );
};

export default InfoSettingsPage;
