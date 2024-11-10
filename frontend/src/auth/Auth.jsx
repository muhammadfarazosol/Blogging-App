// import { Box, Grid, colors } from "@mui/material";
// import { useState } from "react";
// import assets from "../assests/assets/index";
// import Login from "./Login";
// import SignUp from "./SignUp";

// export const ScreenMode = {
//   SIGN_IN: "SIGN_IN",
//   SIGN_UP: "SIGN_UP",
// };

// const Auth = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState("unset");
//   const [width, setWidth] = useState(0);

//   const [backgroundImage, setBackgroundImage] = useState(
//     assets.images.signinBg
//   );
//   const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

//   const onSwitchMode = (mode) => {
//     setWidth(100);

//     const timeout1 = setTimeout(() => {
//       setCurrMode(mode);
//       setBackgroundImage(
//         mode === ScreenMode.SIGN_IN
//           ? assets.images.signinBg
//           : assets.images.signupBg
//       );
//     }, 1100);

//     const timeout2 = setTimeout(() => {
//       setLeft("unset");
//       setRight(0);
//       setWidth(0);
//     }, 1200);

//     const timeout3 = setTimeout(() => {
//       setRight("unset");
//       setLeft(0);
//     }, 2500);

//     return () => {
//       clearTimeout(timeout1);
//       clearTimeout(timeout2);
//       clearTimeout(timeout3);
//     };
//   };

//   return (
//     <Grid container sx={{ height: "100vh" }}>
//       <Grid item xs={4} sx={{ position: "relative", padding: 3 }}>
//         {currMode === ScreenMode.SIGN_IN ? (
//           <Login onSwitchMode={onSwitchMode} />
//         ) : (
//           <SignUp onSwitchMode={onSwitchMode} />
//         )}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: left,
//             right: right,
//             width: `${width}%`,
//             height: "100%",
//             bgcolor: colors.grey[800],
//             transition: "all 1s ease-in-out",
//           }}
//         />
//       </Grid>
//       <Grid
//         item
//         xs={8}
//         sx={{
//           position: "relative",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: left,
//             right: right,
//             width: `${width}%`,
//             height: "100%",
//             bgcolor: colors.common.white,
//             transition: "all 1s ease-in-out",
//           }}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default Auth;

// latest working code

// import { Box, Grid, colors } from "@mui/material";
// import { useState } from "react";
// import assets from "../assests/assets/index";
// import Login from "./Login";
// import SignUp from "./SignUp";

// export const ScreenMode = {
//   SIGN_IN: "SIGN_IN",
//   SIGN_UP: "SIGN_UP",
// };

// const Auth = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState("unset");
//   const [width, setWidth] = useState(0);

//   const [backgroundImage, setBackgroundImage] = useState(
//     assets.images.signinBg
//   );
//   const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

//   const onSwitchMode = (mode) => {
//     setWidth(100);

//     const timeout1 = setTimeout(() => {
//       setCurrMode(mode);
//       setBackgroundImage(
//         mode === ScreenMode.SIGN_IN
//           ? assets.images.signinBg
//           : assets.images.signupBg
//       );
//     }, 1100);

//     const timeout2 = setTimeout(() => {
//       setLeft("unset");
//       setRight(0);
//       setWidth(0);
//     }, 1200);

//     const timeout3 = setTimeout(() => {
//       setRight("unset");
//       setLeft(0);
//     }, 2500);

//     return () => {
//       clearTimeout(timeout1);
//       clearTimeout(timeout2);
//       clearTimeout(timeout3);
//     };
//   };

//   return (
//     <Grid container sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           position: "relative",
//           padding: 3,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           bgcolor: "background.paper",
//           backgroundImage: "linear-gradient(to right, #F3E8FF, #E0E7FF)",
//         }}
//       >
//         <Box sx={{ maxWidth: 500, mx: "auto", width: "100%" }}>
//           {currMode === ScreenMode.SIGN_IN ? (
//             <Login onSwitchMode={onSwitchMode} />
//           ) : (
//             <SignUp onSwitchMode={onSwitchMode} />
//           )}
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: left,
//             right: right,
//             width: `${width}%`,
//             height: "100%",
//             bgcolor: colors.grey[800],
//             transition: "all 1s ease-in-out",
//           }}
//         />
//       </Grid>
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           position: "relative",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: left,
//             right: right,
//             width: `${width}%`,
//             height: "100%",
//             bgcolor: colors.common.white,
//             transition: "all 1s ease-in-out",
//           }}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default Auth;

import { Box, Grid, colors } from "@mui/material";
import { useState } from "react";
import assets from "../assests/assets/index";
import Login from "./Login";
import SignUp from "./SignUp";

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

const Auth = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);

  const [backgroundImage, setBackgroundImage] = useState(
    assets.images.signinBg
  );
  const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

  const onSwitchMode = (mode) => {
    setWidth(100);

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(
        mode === ScreenMode.SIGN_IN
          ? assets.images.signinBg
          : assets.images.signupBg
      );
    }, 1100);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (
    <Grid
      container
      sx={{ minHeight: "100vh", bgcolor: "#c9dcf3", color: "#000000" }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#c9dcf3",
          color: "#000000",
        }}
      >
        <Box sx={{ maxWidth: 500, mx: "auto", width: "100%" }}>
          {currMode === ScreenMode.SIGN_IN ? (
            <Login onSwitchMode={onSwitchMode} />
          ) : (
            <SignUp onSwitchMode={onSwitchMode} />
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: left,
            right: right,
            width: `${width}%`,
            height: "100%",
            bgcolor: colors.grey[800],
            transition: "all 1s ease-in-out",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: left,
            right: right,
            width: `${width}%`,
            height: "100%",
            bgcolor: colors.common.white,
            transition: "all 1s ease-in-out",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Auth;
