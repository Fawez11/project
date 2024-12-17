import { User } from "../dataTypes/user";
import { ErrorType } from "../utils/error";
export interface Snackbar {
  message: string;
  type: "success" | "error";
  isOpen: boolean;
}
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    role: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  error: ErrorType | null;
  snackbar: Snackbar;
  closeSnackbar: () => void;
  setSnackbar: any;
  getUser: () => void;
}
