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
        A griefing vector was discovered in the protocol. Users should repay debt, pull
        all collateral, and remove all liquidity before redeployment.
        <a
          href="https://blog.summer.fi/ajna-possible-attack-vector/"
          className="underline hover:text-purple-6 ms-2"
        >
          More info
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" className="ms-2" />
        </a>
      </div>
    </div>
  );
};

export default Notice;
