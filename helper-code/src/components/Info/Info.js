import PropTypes from "prop-types";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";

function Info(props) {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleQuestion}
        className="link gray ms-2 small"
        onClick={() => setIsOpen(true)}
      />
      <Offcanvas direction="end" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
        <OffcanvasHeader toggle={() => setIsOpen(!isOpen)}>{title}</OffcanvasHeader>
        <OffcanvasBody>{children}</OffcanvasBody>
      </Offcanvas>
    </>
  );
}

Info.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.any,
};

export default Info;
