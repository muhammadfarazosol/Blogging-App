// import { useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   colors,
//   Alert,
// } from "@mui/material";

// const OTPVerification = ({ email, onVerificationSuccess }) => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/verify-otp",
//         { otp }
//       );
//       if (response.status === 201) {
//         onVerificationSuccess();
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "An error occurred during OTP verification."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Stack
//       component="form"
//       onSubmit={handleSubmit}
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
//           <Typography variant="h4" fontWeight={600} color="#000000">
//             Verify Your Email
//           </Typography>
//           <Typography color={colors.grey[600]}>
//             Enter the OTP sent to {email}
//           </Typography>
//         </Stack>

//         {error && (
//           <Alert severity="error" sx={{ width: "100%" }}>
//             {error}
//           </Alert>
//         )}

//         <Stack spacing={4}>
//           <Stack spacing={1}>
//             <Typography color="#000000">OTP</Typography>
//             <TextField
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </Stack>
//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             disabled={isLoading}
//             sx={{
//               bgcolor: "#000000",
//               "&:hover": {
//                 bgcolor: colors.grey[600],
//               },
//             }}
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </Button>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default OTPVerification;
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Stack,
  TextField,
  Typography,
  colors,
  Alert,
} from "@mui/material";

const OTPVerification = ({ email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        { otp },
        { withCredentials: true }
      );
      if (response.status === 201) {
        onVerificationSuccess();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred during OTP verification."
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
            Verify Your Email
          </Typography>
          <Typography color={colors.grey[600]}>
            Enter the OTP sent to {email}
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography color="#000000">OTP</Typography>
            <TextField
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </Stack>
          <Button
            type="submit"
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
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OTPVerification;
