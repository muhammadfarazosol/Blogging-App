import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  Alert,
} from "@mui/material";
import OTPVerification from "./OTPVerification";
import { toast } from "react-toastify";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (value.length > 0 && !nameRegex.test(value)) {
        setNameError("Name must only contain alphabets");
        setIsSignUpDisabled(true);
      } else if (value.length > 30) {
        setNameError("Cannot exceed 30 characters");
        setIsSignUpDisabled(true);
      } else {
        setNameError("");
        setIsSignUpDisabled(false);
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length > 0 && !emailRegex.test(value)) {
        setEmailError("Invalid email address");
        setIsSignUpDisabled(true);
      } else {
        setEmailError("");
        setIsSignUpDisabled(false);
      }
    }

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

      if (value.length > 0 && !passwordRegex.test(value)) {
        setPasswordError(
          "Password must have at least 6 characters,one uppercase n lowercase letter,number and symbol."
        );
        setIsSignUpDisabled(true);
      } else {
        setPasswordError("");
        setIsSignUpDisabled(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setShowOTPVerification(true);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during registration."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSuccess = () => {
    onSwitchMode("SIGN_IN");
  };

  if (showOTPVerification) {
    return (
      <OTPVerification
        email={formData.email}
        onVerificationSuccess={handleVerificationSuccess}
      />
    );
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: colors.grey[800],
      }}
    >
      <Stack
        spacing={5}
        sx={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Stack>
          <Typography variant="h4" fontWeight={600} color="#000000">
            Create an account
          </Typography>
          <Typography color={colors.grey[600]}>
            Fill in your details to get started
          </Typography>
        </Stack>

        {/* {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )} */}

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color="#000000">
                Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {nameError && (
                <Typography color="error" variant="body2">
                  {nameError}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">
                Email <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {emailError && (
                <Typography color="error" variant="body2">
                  {emailError}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">
                Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError && (
                <Typography color="error" variant="body2">
                  {passwordError}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="password2"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.password2}
                onChange={handleChange}
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
          </Stack>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSignUpDisabled || isLoading}
            sx={{
              bgcolor: isSignUpDisabled ? colors.grey[400] : "#000000",
              "&:hover": {
                bgcolor: isSignUpDisabled ? colors.grey[400] : colors.grey[600],
              },
            }}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode("SIGN_IN")}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Sign in
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignUp;
