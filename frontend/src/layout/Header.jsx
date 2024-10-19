import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import ProfileImage from "../assests/ProfileImage.svg";
import clsx from "clsx";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import Logo from "../assests/assets/images/neuroNestLogo.png";

const Header = () => {
  const [isSideMenuOpen, setMenu] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navlinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Blogs",
      link: "/blogs",
    },
    {
      label: "Authors",
      link: "/authors",
    },
  ];

  const DropdownNavlinks = [
    {
      label: "Faraz",
      link: "/profile/sdfsd",
    },
    {
      label: "Create Post",
      link: "/create",
    },
    {
      label: "Authors",
      link: "/authors",
    },
    {
      label: "Logout",
      link: "/logout",
    },
  ];

  return (
    <header>
      <nav className="flex justify-between items-center px-8 py-6">
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
              className="mx-4 text-gray-400 hover:text-black"
              to={d.link}
            >
              {d.label}
            </Link>
          ))}
        </div>

        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all",
            isSideMenuOpen && "translate-x-0"
          )}
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
                onClick={() => {
                  setMenu(false);
                }}
              >
                {d.label}
              </Link>
            ))}
          </section>
        </div>

        <section className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={ProfileImage}
              alt="Profile Image Icon"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full"
            />
            <IoChevronDownCircleOutline
              className={`h-4 w-4 text-gray-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              {DropdownNavlinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </section>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
