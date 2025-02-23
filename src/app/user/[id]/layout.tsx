import { Metadata } from 'next';

import { AuthCheck } from '@/components';
import { PageLayout } from '@/layouts';

import { NavMenu, ProfileHead } from './components';

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль пользователя',
  category: 'profile',
  keywords: 'профиль, пользователь',
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => (
  <PageLayout>
    <ProfileHead />
    <div className="mt-8">
      <NavMenu className="mb-6" />
      <AuthCheck>{children}</AuthCheck>
    </div>
  </PageLayout>
);

export default ProfileLayout;
