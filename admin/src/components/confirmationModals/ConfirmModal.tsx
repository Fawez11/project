// admin/src/components/Modal/ConfirmModal.tsx
import React from "react";
import "../../styles/modal.css";
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "success" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  type = "info",
}) => {
  if (!isOpen) return null;

  const getTypeClass = () => {
    switch (type) {
      case "danger":
        return "modal-danger";
      case "warning":
        return "modal-warning";
      case "success":
        return "modal-success";
      default:
        return "modal-info";
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${getTypeClass()}`}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="sherah-btn sherah-btn__danger" onClick={onCancel}>
            {cancelText}
          </button>
          <button
            className="sherah-btn sherah-btn__primary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
