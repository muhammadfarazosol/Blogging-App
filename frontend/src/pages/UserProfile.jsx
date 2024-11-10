// import { useRef, useState } from "react";
// import Avatar from "../assests/avatars/osolLogo.png";
// import { Link } from "react-router-dom";
// import { CiCamera } from "react-icons/ci";
// import { useContext, useEffect } from "react";
// import { UserContext } from "../context/userContext";
// import { useNavigate } from "react-router-dom";

// const UserProfile = () => {
//   const [avatar, setAvatar] = useState(Avatar);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const fileInputRef = useRef(null);

//   const { currentUser } = useContext(UserContext);
//   const token = currentUser?.token;
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!token) {
//       navigate("/auth");
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setAvatar(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//       <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full">
//         <div className="relative h-40 bg-gradient-to-r from-gray-400 to-gray-600 w-full flex justify-center items-center">
//           <Link to={`/myposts/${currentUser.id}`} className="absolute">
//             <button className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 mb-10">
//               My Blogs
//             </button>
//           </Link>
//         </div>
//         <div className="px-8 py-6 -mt-20">
//           <div className="flex flex-col items-center">
//             <div className="flex flex-col items-center">
//               <div className="relative group">
//                 <img
//                   className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
//                   src={avatar}
//                   alt="Profile"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
//                   >
//                     <CiCamera size={20} />
//                     <span>Edit Photo</span>
//                   </button>
//                 </div>
//                 <form>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     name="avatar"
//                     id="avatar"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </form>
//               </div>
//             </div>
//           </div>
//           <h3 className="mt-6 text-3xl flex justify-center items-center font-bold text-black">
//             {currentUser.name}
//           </h3>
//           <div>
//             <form className="mt-8 space-y-4">
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="text"
//                 placeholder="Full Name"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Current Password"
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Confirm Password"
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Confirm New Password"
//               />
//               <div className="mt-8 flex justify-center">
//                 <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
//                   Update Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// avatar working code
// import { useRef, useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CiCamera } from "react-icons/ci";
// import { UserContext } from "../context/userContext";
// import axios from "axios";

// const UserProfile = () => {
//   const [avatar, setAvatar] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef(null);

//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const token = currentUser?.token;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/auth");
//     } else {
//       setName(currentUser.name || "");
//       setEmail(currentUser.email);
//       setAvatar(
//         currentUser.avatar
//           ? `http://localhost:5000/uploads/${currentUser.avatar}`
//           : ""
//       );
//     }
//   }, [token, navigate, currentUser]);

//   const updateAvatar = async (file) => {
//     setIsLoading(true);
//     setError("");
//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/change-avatar",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         const newAvatarUrl = `http://localhost:5000/uploads/${response.data.avatar}`;
//         setAvatar(newAvatarUrl);
//         setCurrentUser({ ...currentUser, avatar: response.data.avatar });
//         return newAvatarUrl;
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update avatar");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const updatedAvatarUrl = await updateAvatar(file);
//       if (updatedAvatarUrl) {
//         console.log("Avatar updated successfully");
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle profile update logic here
//     console.log("Profile update submitted");
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//       <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full">
//         <div className="relative h-40 bg-gradient-to-r from-gray-400 to-gray-600 w-full flex justify-center items-center">
//           <Link to={`/myposts/${currentUser.id}`} className="absolute">
//             <button className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 mb-10">
//               My Blogs
//             </button>
//           </Link>
//         </div>
//         <div className="px-8 py-6 -mt-20">
//           <div className="flex flex-col items-center">
//             <div className="flex flex-col items-center">
//               <div className="relative group">
//                 <img
//                   className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
//                   src={avatar || "https://via.placeholder.com/150"}
//                   alt="Profile"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
//                     disabled={isLoading}
//                   >
//                     <CiCamera size={20} />
//                     <span>{isLoading ? "Updating..." : "Edit Photo"}</span>
//                   </button>
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   name="avatar"
//                   id="avatar"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>
//             </div>
//           </div>
//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           <h3 className="mt-6 text-3xl flex justify-center items-center font-bold text-black">
//             {currentUser.name}
//           </h3>
//           <div>
//             <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Current Password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//               />
//               <div className="mt-8 flex justify-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   Update Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// getting data and updating avatar working code
// import { useRef, useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CiCamera } from "react-icons/ci";
// import { UserContext } from "../context/userContext";
// import axios from "axios";

// const UserProfile = () => {
//   const [avatar, setAvatar] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef(null);

//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const token = currentUser?.token;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/auth");
//     } else {
//       fetchUserData();
//     }
//   }, [token, navigate]);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/users/${currentUser.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const userData = response.data;
//       setName(userData.name || "");
//       setEmail(userData.email || "");
//       setAvatar(
//         userData.avatar
//           ? `http://localhost:5000/uploads/${userData.avatar}`
//           : ""
//       );
//       setCurrentUser({ ...currentUser, ...userData });
//     } catch (err) {
//       setError("Failed to fetch user data");
//       console.error("Error fetching user data:", err);
//     }
//   };

//   const updateAvatar = async (file) => {
//     setIsLoading(true);
//     setError("");
//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/change-avatar",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         const newAvatarUrl = `http://localhost:5000/uploads/${response.data.avatar}`;
//         setAvatar(newAvatarUrl);
//         setCurrentUser({ ...currentUser, avatar: response.data.avatar });
//         return newAvatarUrl;
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update avatar");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const updatedAvatarUrl = await updateAvatar(file);
//       if (updatedAvatarUrl) {
//         console.log("Avatar updated successfully");
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle profile update logic here
//     console.log("Profile update submitted");
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//       <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full">
//         <div className="relative h-40 bg-gradient-to-r from-gray-400 to-gray-600 w-full flex justify-center items-center">
//           <Link to={`/myposts/${currentUser.id}`} className="absolute">
//             <button className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 mb-10">
//               My Blogs
//             </button>
//           </Link>
//         </div>
//         <div className="px-8 py-6 -mt-20">
//           <div className="flex flex-col items-center">
//             <div className="flex flex-col items-center">
//               <div className="relative group">
//                 <img
//                   className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
//                   src={avatar || "https://via.placeholder.com/150"}
//                   alt="Profile"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
//                   <button
//                     onClick={() => fileInputRef.current.click()}
//                     className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
//                     disabled={isLoading}
//                   >
//                     <CiCamera size={20} />
//                     <span>{isLoading ? "Updating..." : "Edit Photo"}</span>
//                   </button>
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   name="avatar"
//                   id="avatar"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>
//             </div>
//           </div>
//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//           <h3 className="mt-6 text-3xl flex justify-center items-center font-bold text-black">
//             {name}
//           </h3>
//           <div>
//             <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Current Password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//               />
//               <div className="mt-8 flex justify-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   Update Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// new testing code
import { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const fileInputRef = useRef(null);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      fetchUserData();
    }
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setName(userData.name || "");
      setEmail(userData.email || "");
      setAvatar(
        userData.avatar
          ? `http://localhost:5000/uploads/${userData.avatar}`
          : ""
      );
      setCurrentUser({ ...currentUser, ...userData });
    } catch (err) {
      setError("Failed to fetch user data");
      console.error("Error fetching user data:", err);
    }
  };

  const updateAvatar = async (file) => {
    setIsLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/change-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const newAvatarUrl = `http://localhost:5000/uploads/${response.data.avatar}`;
        setAvatar(newAvatarUrl);
        setCurrentUser({ ...currentUser, avatar: response.data.avatar });
        return newAvatarUrl;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update avatar");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedAvatarUrl = await updateAvatar(file);
      if (updatedAvatarUrl) {
        console.log("Avatar updated successfully");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setUpdateMessage("");

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/edit-user",
        {
          name,
          email,
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUpdateMessage("Profile updated successfully");
        setCurrentUser({
          ...currentUser,
          name: response.data.name,
          email: response.data.email,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    //   <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full">
    //     <div className="relative h-40 bg-gradient-to-r from-gray-400 to-gray-600 w-full flex justify-center items-center">
    //       <Link to={`/myposts/${currentUser.id}`} className="absolute">
    //         <button className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105 mb-10">
    //           My Blogs
    //         </button>
    //       </Link>
    //     </div>
    //     <div className="px-8 py-6 -mt-20">
    //       <div className="flex flex-col items-center">
    //         <div className="flex flex-col items-center">
    //           <div className="relative group">
    //             <img
    //               className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
    //               src={avatar || "https://via.placeholder.com/150"}
    //               alt="Profile"
    //             />
    //             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
    //               <button
    //                 onClick={() => fileInputRef.current.click()}
    //                 className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
    //                 disabled={isLoading}
    //               >
    //                 <CiCamera size={20} />
    //                 <span>{isLoading ? "Updating..." : "Edit Photo"}</span>
    //               </button>
    //             </div>
    //             <input
    //               ref={fileInputRef}
    //               type="file"
    //               name="avatar"
    //               id="avatar"
    //               accept="image/*"
    //               onChange={handleFileChange}
    //               className="hidden"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    //       {updateMessage && (
    //         <p className="text-green-500 text-center mt-2">{updateMessage}</p>
    //       )}
    //       <h3 className="mt-6 text-3xl flex justify-center items-center font-bold text-black">
    //         {name}
    //       </h3>
    //       <div>
    //         <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
    //           <input
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
    //             type="text"
    //             placeholder="Full Name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //           <input
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
    //             type="email"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //           <input
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
    //             type="password"
    //             placeholder="Current Password"
    //             value={currentPassword}
    //             onChange={(e) => setCurrentPassword(e.target.value)}
    //           />
    //           <input
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
    //             type="password"
    //             placeholder="New Password"
    //             value={newPassword}
    //             onChange={(e) => setNewPassword(e.target.value)}
    //           />
    //           <input
    //             className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
    //             type="password"
    //             placeholder="Confirm New Password"
    //             value={confirmNewPassword}
    //             onChange={(e) => setConfirmNewPassword(e.target.value)}
    //           />
    //           <div className="mt-8 flex justify-center">
    //             <button
    //               type="submit"
    //               className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105"
    //               disabled={isLoading}
    //             >
    //               {isLoading ? "Updating..." : "Update Profile"}
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen flex items-center justify-center p-4 bg-[#c9dcf3]">
      <div className="bg-[#e1ebfa] rounded-lg shadow-md overflow-hidden max-w-2xl w-full">
        <div className="p-8">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-semibold text-black">
              Account Details
            </h1>
            {/* <Link to={`/myposts/${currentUser.id}`}>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition duration-300 ease-in-out">
                My Blogs
              </button>
            </Link> */}
          </div>

          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-lg font-medium text-black mb-2">
              Profile picture
            </h2>
            <p className="text-sm text-gray-500 mb-4">PNG, JPEG under 5MB</p>
            <div className="flex flex-col justify-between items-center gap-6">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={avatar || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-3xl flex justify-center items-center font-bold text-black">
                  {name}
                </h3>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  Upload new picture
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-black mb-2">Full name</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    value={name.split(" ")[0]}
                    onChange={(e) =>
                      setName(e.target.value + " " + name.split(" ")[1])
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    value={name.split(" ")[1] || ""}
                    onChange={(e) =>
                      setName(name.split(" ")[0] + " " + e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-black mb-2">
                Contact email
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Manage your accounts email address
              </p>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <button
                  type="button"
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add another email
                </button> */}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-black mb-2">Password</h2>
              <p className="text-sm text-gray-500 mb-4">
                Modify your current password.
              </p>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current password
                  </label>
                  <input
                    id="currentPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New password
                  </label>
                  <input
                    id="newPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {updateMessage && (
              <p className="text-green-500 text-sm">{updateMessage}</p>
            )}

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-[#3e95fb] text-white font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
