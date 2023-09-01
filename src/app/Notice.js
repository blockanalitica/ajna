import {
  faTriangleExclamation,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Notice = () => {
  return (
    <div className="mb-8 px-6 py-4 border border-red-8 bg-red-8 bg-opacity-10 text-gray-4 rounded-2xl flex items-center">
      <div className="mr-6">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="xl"
          className="text-red-8"
        />
      </div>
      <div>
        Depositing or withdrawing claimable collateral is an advanced feature, meant for
        Arbitrageurs. Claimable collateral should not be placed at buckets below the
        external market price.
        <a href="https://summer.fi/ajna" className="ms-2 underline hover:text-purple-6">
          Go to summer.fi
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="ms-1" />
        </a>
      </div>
    </div>
  );
};

export default Notice;
