import { Metadata } from 'next';

import { PageLayout } from '@/layouts';

import { ProfileHead } from './components';

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль пользователя',
  category: 'profile',
  keywords: 'профиль, пользователь',
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => (
  <PageLayout>
    <ProfileHead />
    <div className="mt-8">{children}</div>
  </PageLayout>
);

export default ProfileLayout;
