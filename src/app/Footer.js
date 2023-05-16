import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className="mt-20 mb-10">
    <hr className="my-8 border-gray-17" />
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-13 space-x-2">
        <Link href="https://blockanalitica.com" target="_blank">
          <Image
            alt="Block Analitica"
            src="/assets/images/logos/BlockAnalitica-Logo-white.svg"
            width="150"
            height="58"
          />
        </Link>
        <span>|</span>
        <span>© 2023. All rights reserved.</span>
        <span>|</span>
        <span>Made with love by</span>
        <a href="https://blockanalitica.com" target="_blank" className="text-white">
          BA Labs LLC
        </a>
      </div>

      <div className="flex space-x-4">
        <a
          href="https://twitter.com/BlockAnalitica"
          target="_blank"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://medium.com/block-analitica"
          target="_blank"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faMedium} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
