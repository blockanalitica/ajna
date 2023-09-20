import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import classnames from "classnames";
import Offcanvas from "@/components/offcanvas/Offcanvas";

function Info({ title, className, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className={classnames("cursor-pointer hover:text-ajna-aqua", className)}
        onClick={(e) => toggleOpen(e)}
      />
      <Offcanvas title={title} isOpen={isOpen} toggle={(e) => toggleOpen(e)}>
        {children}
      </Offcanvas>
    </>
  );
}

export default Info;
