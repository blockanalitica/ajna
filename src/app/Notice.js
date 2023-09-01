import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
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
        A griefing vector has been discovered in the protocol. Borrowers should repay
        loans. Lenders are not impacted. There will be a redeployment.
      </div>
    </div>
  );
};

export default Notice;
