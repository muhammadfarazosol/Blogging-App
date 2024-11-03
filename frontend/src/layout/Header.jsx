import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiEdit, FiSettings, FiLogOut } from "react-icons/fi";
import { IoCloseOutline, IoChevronDownCircleOutline } from "react-icons/io5";
import ProfileImage from "../assests/ProfileImage.svg";
import Logo from "../assests/assets/images/neuroNestLogo.png";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { currentUser } = useContext(UserContext);

  const navlinks = [
    { label: "Home", link: "/" },
    { label: "Blogs", link: "/blogs" },
    { label: "Authors", link: "/authors" },
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
      <nav className="flex justify-between items-center px-8 py-6 z-50 bg-gradient-to-r from-purple-50 to-indigo-100">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-36 h-6" />
            </Link>
          </section>
        </div>

        <div className="hidden lg:flex flex-grow justify-center">
          {navlinks.map((d, i) => (
            <Link
              key={i}
              className="mx-4 text-black hover:text-gray-500"
              to={d.link}
            >
              {d.label}
            </Link>
          ))}
        </div>

        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm z-50 top-0 right-0 -translate-x-full transition-all ${
            isSideMenuOpen ? "translate-x-0" : ""
          }`}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex">
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

        {/* {currentUser?.id && (
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
        )} */}
        {currentUser ? (
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
        ) : (
          <div>
            <Link to={"/auth"}>
              <button>Login</button>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </header>
  );
};

export default Header;
