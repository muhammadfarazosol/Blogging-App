import React, { useState } from "react";
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while generating OTP"
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        {
          email,
          newPassword,
          otp,
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while resetting password"
      );
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={otpSent ? handleResetPassword : handleGenerateOTP}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800],
        bgcolor: "#c9dcf3",
        padding: "100px",
      }}
    >
      <Stack
        spacing={5}
        sx={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h4" fontWeight={600} color="#000000">
          Forgot Password
        </Typography>

        {message && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color="#000000">Email</Typography>
              <TextField
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter you email address"
              />
            </Stack>
            {otpSent && (
              <>
                <Stack spacing={1}>
                  <Typography color="#000000">New Password</Typography>
                  <TextField
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color="#000000">Confirm New Password</Typography>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color="#000000">OTP</Typography>
                  <TextField
                    name="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Stack>
              </>
            )}
          </Stack>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#000000",
              "&:hover": {
                bgcolor: colors.grey[800],
              },
            }}
          >
            {otpSent ? "Reset Password" : "Generate OTP"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
