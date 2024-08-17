import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer bg-neutral text-neutral-content px-10 py-6 flex flex-col justify-between sm:flex-row items-center gap-4">
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <span>Copyright © {currentYear} - All rights reserved.</span>
        <span>
          Developed by{" "}
          <Link
            className="underline transition-colors duration-300 hover:text-primary"
            target="_blank"
            href="https://www.linkedin.com/in/jorge-luis-monroy-herrera/"
          >
            Jorge M.
          </Link>{" "}
          and{" "}
          <Link
            className="underline transition-colors duration-300 hover:text-primary"
            target="_blank"
            href="https://www.linkedin.com/in/selvio-perez-vergara-77618073/"
          >
            Selvio P.
          </Link>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          className="transition-colors duration-300 hover:text-primary text-3xl"
          target="_blank"
          href="https://github.com/jlmonroy13/which-code-is-better"
        >
          <FaGithub />
        </Link>
        <Link
          className="transition-colors duration-300 hover:text-primary text-3xl"
          target="_blank"
          href="https://discord.gg/j2VQ3UAbWB"
        >
          <FaDiscord />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
