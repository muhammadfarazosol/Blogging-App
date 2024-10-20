import { useRef, useState } from "react";
import Avatar from "../assests/avatars/osolLogo.png";
import { Link } from "react-router-dom";
import { CiCamera } from "react-icons/ci";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b flex items-center justify-center p-4 shadow-black">
    //   <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full">
    //     <div className="relative h-32 bg-black">
    //       <Link to={`/myposts/sdfsd`}>
    //         <div className="flex pt-5 items-center justify-center text-white">
    //           My Posts
    //         </div>
    //       </Link>
    //     </div>
    //     <div className="px-4 py-5 sm:p-6 -mt-16">
    //       {/* <div className="flex flex-col items-center">
    //         <img
    //           className="h-32 w-32 rounded-full ring-4 ring-white z-10"
    //           src={Avatar}
    //           alt="Profile"
    //         />
    //       </div> */}
    //       <div className="flex flex-col items-center">
    //         <div className="relative group">
    //           <img
    //             className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
    //             src={avatar}
    //             alt="Profile"
    //           />
    //           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
    //             <button
    //               onClick={() => fileInputRef.current.click()}
    //               className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
    //             >
    //               <CiCamera size={20} />
    //               <span>Edit Photo</span>
    //             </button>
    //           </div>
    //           <form>
    //             <input
    //               // ref={fileInputRef}
    //               type="file"
    //               name="avatar"
    //               id="avatar"
    //               accept="image/*"
    //               // onChange={handleFileChange}
    //               onChange={(e) => setAvatar(e.target.files[0])}
    //               className="hidden"
    //             />
    //           </form>
    //         </div>
    //       </div>
    //       <h3 className="mt-6 text-2xl font-medium text-gray-900">
    //         Muhammad Faraz
    //       </h3>
    //       <div>
    //         <form className="mt-8 space-y-4">
    //           <input
    //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
    //             type="text"
    //             placeholder="Full Name"
    //             value={newPassword}
    //             onChange={(e) => setNewPassword(e.target.value)}
    //           />

    //           <input
    //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
    //             type="email"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //           <input
    //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
    //             type="password"
    //             placeholder="Current Password"
    //           />
    //           <input
    //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
    //             type="password"
    //             placeholder="Confirm Password"
    //           />
    //           <input
    //             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
    //             type="password"
    //             placeholder="Confirm New Password"
    //           />
    //           <div className="mt-8 flex justify-center">
    //             <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black">
    //               Update Profile
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full">
        <div className="relative h-40 bg-gradient-to-r from-black to-gray-800">
          <Link to={`/myposts/sdfsd`} className="absolute top-4 right-4">
            <button className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105">
              My Blogs
            </button>
          </Link>
        </div>
        <div className="px-8 py-6 -mt-20">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  className="h-32 w-32 rounded-full ring-4 ring-white z-10 transition-all duration-300 ease-in-out group-hover:opacity-75"
                  src={avatar}
                  alt="Profile"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105"
                  >
                    <CiCamera size={20} />
                    <span>Edit Photo</span>
                  </button>
                </div>
                <form>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    // onChange={(e) => setAvatar(e.target.files[0])}
                    className="hidden"
                  />
                </form>
              </div>
            </div>
          </div>
          <h3 className="mt-6 text-3xl flex justify-center items-center font-bold text-gray-900">
            Muhammad Faraz
          </h3>
          <div>
            <form className="mt-8 space-y-4">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
                type="text"
                placeholder="Full Name"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
                type="password"
                placeholder="Current Password"
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
                type="password"
                placeholder="Confirm Password"
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-300 ease-in-out"
                type="password"
                placeholder="Confirm New Password"
              />
              <div className="mt-8 flex justify-center">
                <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300 ease-in-out transform hover:scale-105">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
