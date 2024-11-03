import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const SocialIcon = ({ icon: Icon, name, color }) => (
  <div className="group relative flex cursor-pointer flex-col items-center justify-center">
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg transition-all duration-300 group-hover:text-white"
      style={{ "--hover-bg-color": color }}
    >
      <Icon />
    </div>
    <style jsx>{`
      .group:hover .flex {
        background-color: var(--hover-bg-color);
      }
    `}</style>
  </div>
);

const SocialIcons = () => {
  return (
    <>
      <SocialIcon icon={FaFacebookF} name="Facebook" color="#3B5999" />
      <SocialIcon icon={FaTwitter} name="Twitter" color="#46C1F6" />
      <SocialIcon icon={FaInstagram} name="Instagram" color="#e1306c" />
      <SocialIcon icon={FaGithub} name="Github" color="#333" />
    </>
  );
};

export default SocialIcons;
