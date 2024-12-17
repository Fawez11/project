export interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error"; // Add type for success or error
}
