import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const SocialIcon = ({ icon: Icon, name, color, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex cursor-pointer flex-col items-center justify-center"
  >
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
  </a>
);

const SocialIcons = () => {
  return (
    <>
      <SocialIcon
        icon={FaFacebookF}
        name="Facebook"
        color="#3B5999"
        link="https://www.facebook.com/amirfaraz07"
      />
      <SocialIcon
        icon={FaTwitter}
        name="Twitter"
        color="#46C1F6"
        link="https://x.com/amirfaraz07"
      />
      <SocialIcon
        icon={FaInstagram}
        name="Instagram"
        color="#e1306c"
        link="https://www.instagram.com/itz__faraz"
      />
      <SocialIcon
        icon={FaGithub}
        name="Github"
        color="#333"
        link="https://github.com/amirfaraz07"
      />
    </>
  );
};

export default SocialIcons;
