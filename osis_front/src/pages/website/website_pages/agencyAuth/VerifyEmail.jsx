import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");

    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/verify-email",
          {
            token,
            email,
          }
        );
        setVerificationStatus(response.data.message);
      } catch (error) {
        setVerificationStatus(
          error.response?.data?.message || "Verification failed!"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token && email) {
      verifyEmail();
    } else {
      setVerificationStatus("Invalid verification link.");
      setLoading(false);
    }
  }, [location.search]);

  const handleRedirectToLogin = () => {
    history("/section_entreprise");
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {loading ? (
        <Typography variant="h6">Verifying your email...</Typography>
      ) : (
        <>
          <Typography variant="h6">{verificationStatus}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirectToLogin}
            style={{ marginTop: 20 }}
          >
            Proceed to Login
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
