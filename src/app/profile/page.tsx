import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import { Avatar } from '@/components/ui/Avatar';
import { userRolesNamesMap } from '@/constants';
import { PageLayout } from '@/layouts';
import { UserService } from '@/services';

const ProfilePage = async () => {
  const authToken = await getCookie('authToken', { cookies });
  const user = (await UserService.getUser({ headers: { Authorization: `Bearer ${authToken}` } })).data;

  return (
    <PageLayout>
      <div>
        <div className="flex flex-nowrap gap-3 elevation-3 p-4">
          <Avatar user={user} className="size-16" />
          <div>
            <p className="title-l">{user.userName}</p>
            <p className="body-m mt-2">{userRolesNamesMap[user.role]}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
