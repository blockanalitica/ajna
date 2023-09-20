import classnames from "classnames";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, totalPages, className, onPageChange, ...rest }) => {
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div
      className={classnames("flex justify-center items-center", className)}
      {...rest}
    >
      <button
        className={classnames({
          "text-gray-12": prevDisabled,
          "hover:text-primary-5": !prevDisabled,
        })}
        disabled={prevDisabled}
        onClick={() => (onPageChange ? onPageChange(currentPage - 1) : null)}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="sm" />
      </button>
      <span className="mx-10 text-primary-5 text-sm">
        <span className="font-bold">{currentPage}</span> of {totalPages} pages
      </span>
      <button
        className={classnames({
          "text-gray-12": nextDisabled,
          "hover:text-primary-5": !nextDisabled,
        })}
        disabled={nextDisabled}
        onClick={() => (onPageChange ? onPageChange(currentPage + 1) : null)}
      >
        <FontAwesomeIcon icon={faArrowRightLong} size="sm" />
      </button>
    </div>
  );
};

export default Pagination;
