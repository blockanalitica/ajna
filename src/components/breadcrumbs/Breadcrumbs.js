"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const paths = [{ label: "Home", url: "/" }];
  const segments = pathname.split("/").filter(Boolean);
  // Create a new path object for each segment in the URL
  const dynamicPaths = segments.map((segment, index) => ({
    label: segment
      .split("-") // Split the segment by hyphens to capitalize each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    url: "/" + segments.slice(0, index + 1).join("/"), // Build the URL by concatenating previous segments
    slug: segment,
  }));

  // Combine the hard-coded and dynamic paths
  const allPaths = [...paths.slice(0, 2), ...dynamicPaths];

  return (
    <nav className="flex mt-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {allPaths.map((path, index) => (
          <li key={index}>
            <div className="flex items-center">
              {index !== 0 && (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {index === allPaths.length - 1 ? (
                <span
                  className={`ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400`}
                >
                  {path.label}
                </span>
              ) : (
                <Link
                  href={path.url}
                  className={`ml-1 text-sm font-medium ${
                    index === allPaths.length - 1
                      ? "text-gray-500"
                      : "text-gray-700 hover:text-blue-600"
                  } md:ml-2 dark:text-gray-400 dark:hover:text-white`}
                >
                  {path.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
