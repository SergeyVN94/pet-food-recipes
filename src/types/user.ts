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
  ban?: BanDto;
  email?: string;
  isEmailVerified?: boolean;
};

export type BanDto = {
  id: string;
  user: UserDto;
  reason: string;
  endDate: string;
  createdAt: string;
  updateAt: string;
};

export type BanCreateDto = {
  reason: string;
  endDate: string;
};
