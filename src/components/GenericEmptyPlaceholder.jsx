import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GenericEmptyPlaceholder({ icon, title, content }) {
  return (
    <div className="flex items-center flex-col">
      <div className="w-20 h-20 mt-20 mb-4 bg-gray-22 rounded-full p-4 flex items-center justify-center">
        <FontAwesomeIcon
          icon={icon ? icon : faFolderOpen}
          size="xl"
          className="opacity-60"
        />
      </div>
      <div className="text-red-3 text-sm mb-2">{title ? title : "No Items"}</div>
      <div className="text-gray-13 text-sm mb-20">
        {content ? content : "There are no items"}
      </div>
    </div>
  );
}

export default GenericEmptyPlaceholder;
