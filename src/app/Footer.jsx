import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExternalLink from "@/components/externalLink/ExternalLink";
import baLogo from "@/assets/images/logos/BlockAnalitica-Logo-white.svg";
import substack from "@/assets/images/logos/substack.svg";

const Footer = () => (
  <footer className="mt-20 mb-10">
    <hr className="my-8 border-gray-17" />
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-13 space-x-2">
        <ExternalLink href="https://blockanalitica.com">
          <img alt="Block Analitica" src={baLogo} width="150" height="58" />
        </ExternalLink>
        <span>|</span>
        <span>© 2023. All rights reserved.</span>
        <span>|</span>

        <ExternalLink
          href="https://blockanalitica.com/terms-of-service/"
          className="hover:text-purple-6"
        >
          Terms of Service
        </ExternalLink>
      </div>

      <div className="flex space-x-4">
        <ExternalLink
          href="https://twitter.com/BlockAnalitica"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </ExternalLink>
        <ExternalLink
          href="https://blockanalitica.substack.com/"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <img alt="Substack" src={substack} width="15" height="15" />
        </ExternalLink>
      </div>
    </div>
  </footer>
);

export default Footer;
