"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  // Create a new path object for each segment in the URL
  const dynamicPaths = segments.map((segment, index) => ({
    label: segment
      .split("-") // Split the segment by hyphens to capitalize each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),

    // Build the URL by concatenating previous segments
    url: "/" + segments.slice(0, index + 1).join("/"),
  }));

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
                className="text-gray-13 px-5"
              />
            )}
            {index === allPaths.length - 1 ? (
              <span className="font-medium text-gray-4">{path.label}</span>
            ) : (
              <Link href={path.url} className="text-gray-7 hover:text-blue-600">
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
