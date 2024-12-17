export interface UsePasswordReset {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  requestResetPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}
