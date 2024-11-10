// import { Button, Stack, TextField, Typography, colors } from "@mui/material";
// import { ScreenMode } from "./Auth";

// const SignUp = ({ onSwitchMode }) => {
//   return (
//     <Stack
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         height: "100%",
//         color: colors.grey[800],
//       }}
//     >
//       <Stack
//         spacing={5}
//         sx={{
//           width: "100%",
//           maxWidth: "500px",
//         }}
//       >
//         <Stack>
//           <Typography color="#000000" className="text-center">
//             This is error message
//           </Typography>
//           <Typography variant="h4" fontWeight={600} color="#000000">
//             Create an account
//           </Typography>
//           <Typography color={colors.grey[600]}>
//             Doloribus dolorem impedit aliquam sit veniam
//           </Typography>
//         </Stack>

//         <Stack spacing={4}>
//           <Stack spacing={2}>
//             <Stack spacing={1}>
//               <Typography color="#000000">Name</Typography>
//               <TextField />
//             </Stack>
//             <Stack spacing={1}>
//               <Typography color="#000000">Email</Typography>
//               <TextField />
//             </Stack>
//             <Stack spacing={1}>
//               <Typography color="#000000">Password</Typography>
//               <TextField type="password" />
//             </Stack>
//             <Stack spacing={1}>
//               <Typography color="#000000">Confirm Password</Typography>
//               <TextField type="password" />
//             </Stack>
//           </Stack>
//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               bgcolor: colors.grey[800],
//               "&:hover": {
//                 bgcolor: colors.grey[600],
//               },
//             }}
//           >
//             Sign in
//           </Button>
//         </Stack>

//         <Stack direction="row" spacing={2}>
//           <Typography>Already have an account?</Typography>
//           <Typography
//             onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
//             fontWeight={600}
//             sx={{
//               cursor: "pointer",
//               userSelect: "none",
//             }}
//           >
//             Sign in
//           </Typography>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default SignUp;

import { useState } from "react";
import axios from "axios";
import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  Alert,
} from "@mui/material";
import { ScreenMode } from "./Auth";

const SignUp = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`,
        formData
      );

      const newUser = response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register right now! Please wait..");
      }
      onSwitchMode(ScreenMode.SIGN_IN);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
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
            Create an account
          </Typography>
          <Typography color={colors.grey[600]}>
            Fill in your details to get started
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
              <Typography color="#000000">Name</Typography>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">Email</Typography>
              <TextField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">Password</Typography>
              <TextField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#000000">Confirm Password</Typography>
              <TextField
                name="password2"
                type="password"
                value={formData.password2}
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
            disabled={isLoading}
            sx={{
              bgcolor: "#000000",
              "&:hover": {
                bgcolor: colors.grey[600],
              },
            }}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography>Already have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
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
