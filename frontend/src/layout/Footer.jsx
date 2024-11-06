import SocialIcons from "../components/SocialMediaIcons";

const Footer = () => {
  const navItems = ["Blogs", "Terms of Services", "Privacy", "Content Policy"];

  return (
    <>
      <footer className="bg-[#3e95fb] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white hover:text-black transition-colors"
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
          <div className="text-center text-white text-sm">
            © {new Date().getFullYear()} NeuroNest, Inc. All rights reserved by
            OSOL
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
