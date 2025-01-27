import { UserRoles } from '@/types';

export const protectedRoutes = ['/recipe/new'];

export const userRolesNamesMap: Record<UserRoles, string> = {
  [UserRoles.ADMIN]: 'Администратор',
  [UserRoles.USER]: 'Пользователь',
};
