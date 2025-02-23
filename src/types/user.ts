export enum UserRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type UserDto = {
  id: string;
  userName: string;
  role: UserRoles;
  avatar: string | null;
  createdAt: string;
  updateAt: string;
  email?: string;
  isEmailVerified?: boolean;
};
