import { UserRoles } from '@/types';

export const protectedRoutes = ['/recipe/new', '/profile', '/settings', '/bookmarks'];

export const userRolesNamesMap: Record<UserRoles, string> = {
  [UserRoles.ADMIN]: 'Администратор',
  [UserRoles.USER]: 'Пользователь',
};
