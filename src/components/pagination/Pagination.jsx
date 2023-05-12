import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center items-center my-4 text-blue-500">
      <button className="focus:outline-none">
        <i className="fas fa-chevron-left"></i>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className="mx-4">
        {currentPage} of {totalPages} pages
      </span>
      <button className="focus:outline-none">
        <i className="fas fa-chevron-right"></i>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
