// src/components/Toast/Toast.tsx
import React, { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  show,
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  return (
    <div className={`sherah-toast ${type} ${show ? "show" : ""}`} role="alert">
      <div className="sherah-toast__content">
        <span className="sherah-toast__icon">
          {type === "success" ? "✓" : "✕"}
        </span>
        <span className="sherah-toast__message">{message}</span>
        <button
          className="sherah-toast__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
