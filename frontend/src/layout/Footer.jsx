import SocialIcons from "../components/SocialMediaIcons";

const Footer = () => {
  const navItems = ["Blogs", "Terms of Services", "Privacy", "Content Policy"];

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
            <SocialIcons />
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
