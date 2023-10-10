import { Link, useLocation } from "react-router-dom";
import { smartLocationParts } from "@/utils/url";
import { useLinkBuilder } from "@/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Address from "@/components/address/Address";

const Breadcrumbs = () => {
  const location = useLocation();
  const { paths } = smartLocationParts(location);
  const buildLink = useLinkBuilder();

  if (paths.length === 0) {
    return <div></div>;
  }

  // Create a new path object for each segment in the URL
  const dynamicPaths = paths.map((segment, index) => {
    let label = segment
      .split("-") // Split the segment by hyphens to capitalize each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    if (label.startsWith("0x")) {
      label = <Address address={label} />;
    }

    return {
      label: label,
      // Build the URL by concatenating previous segments
      url: "/" + paths.slice(0, index + 1).join("/"),
    };
  });

  // Combine the hard-coded and dynamic paths
  const allPaths = [
    { label: <FontAwesomeIcon icon={faHouse} />, url: "/" },
    ...dynamicPaths,
  ];

  return (
    <ol className="hidden md:inline-flex items-center text-sm">
      {allPaths.map((path, index) => (
        <li key={index}>
          <div className="flex items-center">
            {index !== 0 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size="xs"
                className="text-gray-13 px-2"
              />
            )}
            {index === allPaths.length - 1 ? (
              <span className="font-medium text-gray-4">{path.label}</span>
            ) : (
              <Link to={buildLink(path.url)} className="text-gray-7 hover:underline">
                {path.label}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumbs;
