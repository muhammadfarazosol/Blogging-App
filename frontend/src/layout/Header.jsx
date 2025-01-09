import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiEdit,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import ProfileImage from "../assests/ProfileImageW.svg";
import Logo from "../assests/assets/images/image.png";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const { currentUser } = useContext(UserContext);

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${currentUser?.id}`
        );
        setAuthors(response?.data);
        console.log(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    // Only fetch if currentUser is defined
    if (currentUser) {
      getAuthors();
    }
  }, [currentUser]); // Add currentUser as a dependency here

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Blogs", link: "/blogs" },
    { label: "Authors", link: "/authors" },
    ...(currentUser
      ? [{ label: "My Blogs", link: `/myposts/${currentUser.id}` }]
      : []),
  ];

  const DropdownNavlinks = [
    {
      label: "View Profile",
      link: `/profile/${currentUser?.id}`,
      icon: FiSettings,
    },
    { label: "Create Post", link: "/create", icon: FiEdit },
    { label: "Logout", link: "/logout", icon: FiLogOut },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      {/* <nav className="flex justify-between items-center px-8 py-6 z-50 bg-gradient-to-r from-purple-50 to-indigo-100"> */}
      <nav className="flex justify-between items-center px-8 max-sm:px-4 py-6 z-50 bg-[#3e95fb]">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden text-white max-sm:text-2xl"
            />
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-36 h-8 max-sm:h-[22px]" />
            </Link>
          </section>
        </div>

        <div className="hidden lg:flex flex-grow justify-center">
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className={`mx-4 text-white hover:text-black relative ${
                location.pathname === d.link ? "font-bold" : ""
              }`}
              to={d.link}
            >
              {d.label}
              {location.pathname === d.link && (
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm z-50 top-0 right-0 -translate-x-full transition-all ${
            isSideMenuOpen ? "translate-x-0" : ""
          }`}
        >
          <section className="text-white bg-[#3e95fb] flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {navlinks.map((d, i) => (
              <Link
                key={i}
                className="font-bold"
                to={d.link}
                onClick={() => setMenu(false)}
              >
                {d.label}
              </Link>
            ))}
          </section>
        </div>

        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 px-2 py-1 rounded-full border-2 border-white text-white transition-colors duration-300"
            >
              <img
                src={
                  authors?.avatar
                    ? `http://localhost:5000/uploads/${authors.avatar}`
                    : ProfileImage
                }
                alt={`${currentUser?.name}'s profile`}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-semibold text-xs text-white">
                {currentUser?.name}
              </span>
              <FiChevronDown
                className={`h-4 w-4 text-white transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-300 ease-in-out transform origin-top-right">
                {DropdownNavlinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to={"/auth"}>
              <button className="px-8 py-1 text-white bg-[#3e95fb] border-[1.5px] border-white rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 max-sm:px-6">
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </header>
  );
};

export default Header;

{
  /* <div className="hidden lg:flex flex-grow justify-center">
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className="mx-4 text-white hover:text-black"
              to={d.link}
            >
              {d.label}
            </Link>
          ))}
        </div> */
}

{
  /* {currentUser?.id && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={ProfileImage}
                alt="Profile Image Icon"
                className="h-10 w-10 rounded-full border-2 border-gray-300"
              />
              <IoChevronDownCircleOutline
                className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg py-2 z-10 transition-all duration-300 ease-in-out transform origin-top-right">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {currentUser?.name}
                    </p>
                  </div>
                </div>
                {DropdownNavlinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        {!currentUser?.id && (
          <div>
            <Link to={"/auth"}>
              <button>Login</button>
            </Link>
          </div>
        )} */
}

{
  /* <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {currentUser?.name}
                    </p>
                  </div>
                </div> */
}
