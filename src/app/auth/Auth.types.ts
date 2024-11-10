export type RegisterFormFields = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormFields = {
  email: string;
  password: string;
};

export type ResetPasswordFormFields = {
  email: string;
};

export type ChangePasswordFormFields = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
