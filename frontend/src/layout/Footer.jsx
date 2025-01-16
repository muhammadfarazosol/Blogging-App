import SocialIcons from "../components/SocialMediaIcons";

const Footer = () => {
  const navItems = [
    { label: "Blogs", link: "/blogs" },
    { label: "Terms of Services", link: "/terms-of-services" },
    { label: "Privacy", link: "/privacy" },
    { label: "Content Policy", link: "/content-policy" },
  ];

  return (
    <>
      <footer className="bg-[#3e95fb] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={item.link}
                    className="text-white hover:text-black transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex justify-center space-x-6 mb-8">
            <SocialIcons />
          </div>
          <div className="text-center text-white text-sm">
            © {new Date().getFullYear()} NeuroNest, Inc. All rights reserved by{" "}
            <a
              href="https://osoltech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OSOL
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
