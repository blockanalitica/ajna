import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExternalLink from "@/components/externalLink/ExternalLink";

const Footer = () => (
  <footer className="mt-20 mb-10">
    <hr className="my-8 border-gray-17" />
    <div className="flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-13 space-x-2">
        <ExternalLink href="https://blockanalitica.com">
          <img
            alt="Block Analitica"
            src="/assets/images/logos/BlockAnalitica-Logo-white.svg"
            style={{ width: 150, height: 58 }}
          />
        </ExternalLink>
        <span>|</span>
        <span>© 2023. All rights reserved.</span>
      </div>

      <div className="flex space-x-4">
        <ExternalLink
          href="https://twitter.com/BlockAnalitica"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </ExternalLink>
        <ExternalLink
          href="https://medium.com/block-analitica"
          className="w-10 h-10 bg-gray-21 rounded-full hover:bg-gray-18 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faMedium} />
        </ExternalLink>
      </div>
    </div>
  </footer>
);

export default Footer;
