import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/forgot-password`,
        { email }
      );
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred while generating OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/reset-password`,
        {
          email,
          newPassword,
          otp,
        }
      );
      toast.success(response.data.message);
      navigate("/auth");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while resetting password"
      );
    } finally {
      setLoading(false);
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
      className="min-h-screen"
    >
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h4" fontWeight={600} color="#000000">
          Forgot Password
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          color="#555555"
          // textAlign="center"
        >
          Oops! Forgot something? Let’s get you back on track
        </Typography>

        {/* {message && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )} */}

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
                disabled={otpSent}
              />
            </Stack>
            {otpSent && (
              <>
                <Stack spacing={1}>
                  <Typography color="#000000">New Password</Typography>
                  <TextField
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography color="#000000">Confirm New Password</Typography>
                  <TextField
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={toggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
            disabled={loading}
          >
            {loading
              ? otpSent
                ? "Resetting..."
                : "Generating..."
              : otpSent
              ? "Reset Password"
              : "Generate OTP"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
