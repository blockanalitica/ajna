import { Link } from "react-router-dom";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Notice = () => {
  return (
    <div className="mb-8 px-6 py-4 border border-yellow-8 bg-yellow-8 bg-opacity-10 text-gray-4 rounded-2xl flex items-center">
      <div className="mr-6">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="xl"
          className="text-yellow-8"
        />
      </div>
      <div>
        You're visiting an old version of the protocol. For the new version, go{" "}
        <Link className="underline hover:text-purple-6" to="/">
          here
        </Link>
        .
      </div>
    </div>
  );
};

export default Notice;
