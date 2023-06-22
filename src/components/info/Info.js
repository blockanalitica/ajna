"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import classnames from "classnames";
import Offcanvas from "@/components/offcanvas/Offcanvas";

function Info({ title, className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className={classnames("cursor-pointer hover:text-ajna-aqua", className)}
        onClick={() => setIsOpen(true)}
      />
      <Offcanvas title={title} isOpen={isOpen} toggle={() => setIsOpen(!open)}>
        {children}
      </Offcanvas>
    </>
  );
}

export default Info;
