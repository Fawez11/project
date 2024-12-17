import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../services/ToastContext";
import ConfirmModal from "../../../components/confirmationModals/ConfirmModal";
import axios from "axios";

const ChangePassword: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      showToast("Les mots de passe ne correspondent pas.", "error");
      return false;
    }
    if (newPassword.length < 6) {
      showToast(
        "Le mot de passe doit contenir au moins 6 caractères.",
        "error"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setIsModalOpen(true);
  };

  const handleConfirmChange = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/change-password`, {
        currentPassword,
        newPassword,
      });
      showToast(response.data.message, "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      showToast(
        error.response?.data?.message ||
          "Erreur lors du changement de mot de passe",
        "error"
      );
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="tab-pane active" id="id5" role="tabpanel">
      <div className="sherah-paymentm sherah__item-group sherah-default-bg sherah-border">
        <h4 className="sherah__item-group sherah-default-bg sherah-border__title">
          Change Password
        </h4>
        <div className="row">
          <div className="col-xxl-8 col-lg-6 col-md-6 col-12">
            <form className="sherah-wc__form-main p-0" onSubmit={handleSubmit}>
              {/* Current Password */}
              <div className="form-group">
                <label className="sherah-wc__form-label">
                  Current Password *
                </label>
                <div className="form-group__input">
                  <input
                    className="sherah-wc__form-input"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-look"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showCurrentPassword ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div className="form-group">
                <label className="sherah-wc__form-label">New Password *</label>
                <div className="form-group__input">
                  <input
                    className="sherah-wc__form-input"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-look"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="sherah-wc__form-label">
                  Confirm Password *
                </label>
                <div className="form-group__input">
                  <input
                    className="sherah-wc__form-input"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="password-look"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </span>
                </div>
              </div>

              <div className="form-group mg-top-30">
                <button
                  type="submit"
                  className="sherah-btn sherah-btn__primary"
                  disabled={loading}
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Password Change"
        message="Are you sure you want to change your password?"
        confirmText="Yes, Change Password"
        cancelText="Cancel"
        type="warning"
        onConfirm={handleConfirmChange}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChangePassword;
