import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteProfileModal from "../modals/DeleteProfile";
import { IoEye, IoEyeOff } from "react-icons/io5";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

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

    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    setIsLoading(true);
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
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (password) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${currentUser?.id}`,
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#c9dcf3]">
      <div className="bg-[#e1ebfa] rounded-lg shadow-md overflow-hidden max-w-2xl w-full">
        <div className="p-8">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-semibold text-black">{name}</h1>
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
              {/* <div>
                <h3 className="text-3xl flex justify-center items-center font-bold text-black">
                  {name}
                </h3>
              </div> */}
              <div className="flex gap-4">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  Upload new picture
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div>
              <h2 className="text-lg font-bold text-black">Full name</h2>
              <p className="text-sm text-gray-500 font-bold mb-4">
                Modify your name
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-[17px] font-medium text-gray-700 mb-2"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                    placeholder="Enter your first name"
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
                    className="block text-[17px] font-medium text-gray-700 mb-2"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                    placeholder="Enter your last name"
                    type="text"
                    value={name.split(" ")[1] || ""}
                    onChange={(e) =>
                      setName(name.split(" ")[0] + " " + e.target.value)
                    }
                  />
                </div>
              </div>
            </div> */}
            <div>
              <label
                htmlFor="name"
                className="block text-[17px] font-medium text-gray-700 mb-2"
              >
                Edit your name here
              </label>
              <input
                id="name"
                className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                placeholder="Enter your full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* <div>
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
              </div>
            </div> */}

            <div>
              {/* <h2 className="text-lg font-bold text-black">Password</h2>
              <p className="text-sm text-gray-500 font-bold mb-4">
                Modify your current password
              </p> */}
              <div className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="currentPassword"
                    className="block text-[17px] font-medium text-gray-700 mb-2"
                  >
                    Current password
                  </label>
                  <input
                    id="currentPassword"
                    className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                    placeholder="Enter your current password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleCurrentPasswordVisibility}
                    className="absolute right-4 top-[46.5px] text-gray-600 focus:outline-none text-xl"
                  >
                    {showCurrentPassword ? <IoEye /> : <IoEyeOff />}
                  </button>
                </div>
                <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4 pt-2">
                  <div className="relative">
                    <label
                      htmlFor="newPassword"
                      className="block text-[17px] font-medium text-gray-700 mb-2"
                    >
                      New password
                    </label>
                    <input
                      id="newPassword"
                      className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                      placeholder="Enter your new password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleNewPasswordVisibility}
                      className="absolute right-4 top-[46.5px] text-gray-600 focus:outline-none text-xl"
                    >
                      {showNewPassword ? <IoEye /> : <IoEyeOff />}
                    </button>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-[17px] font-medium text-gray-700 mb-2"
                    >
                      Confirm new password
                    </label>
                    <input
                      id="confirmPassword"
                      className="w-full px-6 py-3 border border-gray-300 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3e95fb] focus:border-[#3e95fb] placeholder:text-[15px]"
                      placeholder="Enter your confirm password"
                      type={showConfirmNewPassword ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmNewPasswordVisibility}
                      className="absolute right-4 top-[46.5px] text-gray-600 focus:outline-none text-xl"
                    >
                      {showConfirmNewPassword ? <IoEye /> : <IoEyeOff />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
          <DeleteProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
