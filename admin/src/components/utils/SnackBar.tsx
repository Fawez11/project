import React from "react";
import "../../styles/Snackbar.css"; // Import custom CSS for Snackbar
import { SnackbarProps } from "../../types/props/snackBar";

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isOpen,
  onClose,
  type,
}) => {
  return (
    <div className={`snackbar ${isOpen ? "show" : ""} ${type}`}>
      <div className="snackbar-message">{message}</div>
      <button
        type="button"
        className="btn-close btn-close-white" // Use Bootstrap's close button with white color
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Snackbar;
