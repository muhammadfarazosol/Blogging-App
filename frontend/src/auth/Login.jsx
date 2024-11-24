import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  Link,
} from "@mui/material";
import { ScreenMode } from "./Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext, useState } from "react";
import axios from "axios";

const Login = ({ onSwitchMode }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/login`,
        userData
      );

      const user = await response.data;
      console.log(user);

      setCurrentUser(user);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome back
          </Typography>
          <Typography color={colors.grey[600]}>
            Unlock your world with just one click
          </Typography>
        </Stack>

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
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">Password</Typography>
              <TextField
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </Stack>
          </Stack>
          <Button
            type="submit"
            onSubmit={handleSubmit}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#000000",
              "&:hover": {
                bgcolor: colors.grey[800],
              },
            }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{ alignSelf: "flex-start" }}
          >
            Forgot Password?
          </Link>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Do not have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
