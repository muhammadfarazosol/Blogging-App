import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteProfileModal from "../modals/DeleteProfile";
import { IoEye, IoEyeOff } from "react-icons/io5";
import defaultImage from "../assests/avatars/defaultImage.png";
import { FiEdit } from "react-icons/fi";
import { MdCancelPresentation } from "react-icons/md";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  // Password visibility handlers
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEditToggle = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (updateMessage) {
      toast.success(updateMessage);
    }
  }, [error, updateMessage]);

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
        `${API_BASE_URL}/users/${currentUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setName(userData.name || "");
      setEmail(userData.email || "");
      setUsername(userData.username || "");
      setHeadline(userData.headline || "");
      setBio(userData.bio || "");
      const formattedDate = new Date(userData.createdAt).toLocaleDateString();
      setCreatedAt(formattedDate);
      setAvatar(
        userData.avatar ? `${APP_ASSESTS_URL}/uploads/${userData.avatar}` : ""
      );
      setCurrentUser({ ...currentUser, ...userData });
    } catch (err) {
      toast.error("Failed to fetch user data");
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
        `${API_BASE_URL}/users/change-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const newAvatarUrl = `${APP_ASSESTS_URL}/uploads/${response.data.avatar}`;
        setAvatar(newAvatarUrl);
        setCurrentUser({ ...currentUser, avatar: response.data.avatar });
        return newAvatarUrl;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update avatar");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPEG and PNG files are allowed");
        return;
      }
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error("Profile picture should be less than 5mb");
        return;
      }
      const updatedAvatarUrl = await updateAvatar(file);
      if (updatedAvatarUrl) {
        toast.success("Avatar updated successfully");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUpdateMessage("");

    // const [firstName, lastName] = name.split(" ");
    // if (!firstName?.trim() || !lastName?.trim()) {
    if (!name?.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (name.length > 30) {
      toast.error("Name must be 30 characters or less");
      return;
    }

    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    const usernameRegex = /^(?=(.*[a-zA-Z]){4})[a-zA-Z0-9_]{6,15}$/;
    if (username) {
      if (!usernameRegex.test(username)) {
        toast.error(
          "Username must be 6-15 characters,alphanumeric,at least 4 letters and can include underscores"
        );
        return;
      }
    }

    if (!username.trim() && currentUser.username) {
      toast.error("Username cannot be empty as it was previously set");
      return;
    }

    if (headline.length > 150) {
      toast.error("Headline must be 150 characters or less");
      return;
    }

    if (!headline.trim() && currentUser.headline) {
      toast.error("Headline cannot be empty as it was previously set");
      return;
    }

    if (bio.length > 300) {
      toast.error("Bio must be 300 characters or less");
      return;
    }

    if (!bio.trim() && currentUser.bio) {
      toast.error("Bio cannot be empty as it was previously set");
      return;
    }

    if (currentPassword) {
      if (currentPassword === newPassword) {
        toast.error("Current and new password cannot be same");
        return;
      }
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/edit-user`,
        {
          name,
          email,
          username,
          currentPassword,
          newPassword,
          confirmNewPassword,
          headline,
          bio,
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
          username: response.data.username,
          headline: response.data.headline,
          bio: response.data.bio,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/${currentUser?.id}`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("Profile deleted successfully!");
        setCurrentUser(null);
        navigate("/auth");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#e1ebfa] p-6 relative">
      {/* Background Header Section */}
      <div
        className="absolute inset-0 md:h-[50%] max-sm:h-[30%] bg-cover bg-center max-sm:hidden"
        style={{
          backgroundImage: `url(${avatar || defaultImage})`,
          filter: "brightness(0.3)",
        }}
      ></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <div className="absolute inset-0 h-[25%] bg-cover bg-center max-sm:hidden flex items-center justify-start space-y-2 text-white">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Hello {name}</h1>
            <p className="text-gray-200">
              This is your profile page. You can manage your name, password and
              you can also add bio and headline into your profile
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:pt-60">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg order-1 lg:order-2 lg:w-1/3 relative z-10 mt-20 lg:mt-0">
            <div className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <img
                        src={avatar || defaultImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
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
                  </div>
                </div>
                <div className={`flex gap-4 mt-2 ${isEditing ? "" : "hidden"}`}>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    Upload new picture
                  </button>
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-sm text-gray-500">
                    {username && `@${username}`}
                  </p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {headline || "Your headline will be displayed here"}
                </p>
                <p className="text-center text-sm text-gray-600">
                  {bio || "Your bio will be displayed here"}
                </p>
              </div>
            </div>
          </div>

          {/* Form Card changes making for undo adding more text */}
          <div className="bg-white rounded-lg shadow-lg order-2 lg:order-1 lg:flex-grow relative z-20 max-w-3xl">
            <div className="p-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-6">
                  General Information
                </h2>

                {isEditing ? (
                  <h2
                    className="text-2xl font-semibold text-red-600 mb-6 cursor-pointer"
                    onClick={handleCancelEditToggle}
                  >
                    <MdCancelPresentation />
                  </h2>
                ) : (
                  <h2
                    className="text-xl font-semibold mb-6 cursor-pointer"
                    onClick={handleEditToggle}
                  >
                    <FiEdit />
                  </h2>
                )}
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm text-gray-500 font-medium">
                      USER INFORMATION
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Name<span className="text-red-600"> *</span>
                        </p>
                        <input
                          id="name"
                          placeholder="Enter your full name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Username
                        </p>
                        <input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Email address
                        </p>
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full px-3 py-2 cursor-not-allowed border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <p className="text-sm font-medium text-gray-700">
                          Current Password
                        </p>
                        <input
                          id="currentPassword"
                          placeholder="Enter your current password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={toggleCurrentPasswordVisibility}
                          className="absolute right-4 top-[31.5px] text-gray-600 focus:outline-none text-xl"
                        >
                          {showCurrentPassword ? <IoEye /> : <IoEyeOff />}
                        </button>
                      </div>
                      <div className="space-y-2 relative">
                        <p className="text-sm font-medium text-gray-700">
                          New Password
                        </p>
                        <input
                          id="newPassword"
                          placeholder="Enter your new password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={toggleNewPasswordVisibility}
                          className="absolute right-4 top-[31.5px] text-gray-600 focus:outline-none text-xl"
                        >
                          {showNewPassword ? <IoEye /> : <IoEyeOff />}
                        </button>
                      </div>
                      <div className="space-y-2 relative">
                        <p className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </p>
                        <input
                          id="confirmPassword"
                          placeholder="Enter your confirm password"
                          type={showConfirmNewPassword ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmNewPasswordVisibility}
                          className="absolute right-4 top-[31.5px] text-gray-600 focus:outline-none text-xl"
                        >
                          {showConfirmNewPassword ? <IoEye /> : <IoEyeOff />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* About Me Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm text-gray-500 font-medium">
                      ABOUT ME
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Headline
                      </p>
                      <input
                        id="headline"
                        placeholder="Enter your headline here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Bio</p>
                      <textarea
                        id="bio"
                        rows={4}
                        placeholder="Enter your bio here"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Button Sections */}
                  <div className="flex justify-between items-center pt-2">
                    {/* <div className=""> */}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out"
                      disabled={isLoading}
                    >
                      Delete Profile
                    </button>
                    {/* </div> */}
                    {/* <div className=""> */}
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#3e95fb] text-white font-medium rounded-2xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update changes"}
                    </button>
                    {/* </div> */}
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Display Static Data */}
                  <div className="flex flex-col">
                    <div className="relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500">
                      <div className="grid grid-cols-2 gap-4 px-2 w-full">
                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">Name</p>
                          <p className="text-sm font-medium text-navy-700 break-words">
                            {name}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">Email</p>
                          <p className="text-sm font-medium text-navy-700 break-words">
                            {email}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">Password</p>
                          <p className="text-sm font-medium text-navy-700">
                            *************
                          </p>
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">
                            Member Since
                          </p>
                          <p className="text-sm font-medium text-navy-700">
                            {createdAt}
                          </p>
                        </div>

                        <div className="flex flex-col rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">Headline</p>
                          <p className="text-sm font-medium text-navy-700">
                            {headline || "-"}
                          </p>
                        </div>

                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
                          <p className="text-base text-gray-600">Bio</p>
                          <p className="text-sm font-medium text-navy-700">
                            {bio || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <DeleteProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
