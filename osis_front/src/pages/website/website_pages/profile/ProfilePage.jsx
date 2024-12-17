import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaCog,
  FaUser,
  FaHistory,
  FaBox,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import "./ProfilePage.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { Modal, Button, Typography } from "@mui/material";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  // Helper function to get complete image URL
  const getImageUrl = (photoUrl) => {
    if (!photoUrl || photoUrl === "") {
      return "http://localhost:5000/api/uploads/avatar.png";
    }

    // Convert Windows backslashes to forward slashes and ensure proper path formatting
    const normalizedPath = photoUrl.replace(/\\/g, "/").replace(/^\//, "");
    return `http://localhost:5000/api/${normalizedPath}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get(
          "http://localhost:5000/api/auth/currentuser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = userResponse.data.user;
        if (user) {
          setUserData(user);
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  const handleCloseModal = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    // First show the goodbye message
    const toastId = toast.success("👋 À bientôt !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Then clear localStorage and close modal
    localStorage.clear();
    setOpenLogoutModal(false);

    // Wait for toast to be visible before navigating
    setTimeout(() => {
      // Ensure the toast is dismissed before navigation
      toast.dismiss(toastId);

      // Navigate to auth page and set login view
      navigate("/section_entreprise", {
        state: { initialView: "login" },
        replace: true,
      });
    }, 2000); // Increased delay to ensure toast is visible
  };

  if (loading) return <LoadingSpinner />;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="profile-left">
        <div className="profile-card">
          <div className="profile-image-container">
            <img
              src={getImageUrl(userData.photoUrl)}
              alt={`${userData.firstName}'s profile`}
              className="profile-picture"
              onError={(e) => {
                setImageError(true);
                e.target.onerror = null;
                e.target.src = "http://localhost:5000/api/uploads/avatar.png";
              }}
            />
          </div>
          <h1 className="profile-name">
            {userData.firstName} {userData.lastName}
          </h1>
          <p className="profile-email">{userData.email}</p>
          <div className="profile-details">
            {userData.titreSocial && (
              <p>
                <span>Titre: </span>
                {userData.titreSocial}
              </p>
            )}
            {userData.enterprise && (
              <p>
                <span>Enterprise: </span>
                {userData.enterprise}
              </p>
            )}
            {userData.taxNumber && (
              <p>
                <span>Tax Number: </span>
                {userData.taxNumber}
              </p>
            )}
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <div>
                <div className="stat-value">0</div>
                <div className="stat-label">Total Orders</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Active Orders</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Favorites</div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="orders-card">
          <h2 className="section-title">
            <FaHistory /> Order History
          </h2>
          <div className="no-orders">
            <p>No order history available</p>
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div className="profile-center">
        <div className="orders-card">
          <h2 className="section-title">
            <FaBox /> Active Orders
          </h2>
          <div className="no-orders">
            <p>No active orders</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="profile-right">
        <div className="settings-card">
          <h2 className="section-title">
            <FaCog /> Account Settings
          </h2>
          <ul className="settings-list">
            <li>
              <Link to="/edit-profile">
                <FaUser /> Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/change-password">
                <FaCog /> Change Password
              </Link>
            </li>
            <li>
              <button onClick={handleLogoutClick} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Favorites Section */}
        <div className="favorites-card">
          <h2 className="section-title">
            <FaHeart /> My Favorites
          </h2>
          <div className="no-favorite">
            <p>No favorite items yet</p>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        open={openLogoutModal}
        onClose={handleCloseModal}
        aria-labelledby="logout-modal-title"
      >
        <div style={modalStyle}>
          <Typography
            id="logout-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Confirmer la déconnexion
          </Typography>
          <Typography style={{ marginBottom: "20px" }}>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </Typography>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Oui, me déconnecter
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              style={{
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  borderColor: "#1565c0",
                },
              }}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Modal styling
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  padding: "20px",
  textAlign: "center",
  outline: "none",
};

export default ProfilePage;
