import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  const navItems = ["Blogs", "Terms of Services", "Privacy", "Content Policy"];
  const socialIcons = [
    { Icon: FaFacebookF, href: "#" },
    { Icon: FaInstagram, href: "#" },
    { Icon: FaTwitter, href: "#" },
    { Icon: FaGithub, href: "#" },
  ];

  return (
    <>
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center space-x-6 mb-8">
            {socialIcons.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={`Visit our ${Icon.name.replace("Fa", "")} page`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Neuro Blog, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
