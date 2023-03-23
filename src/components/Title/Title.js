import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Title.module.scss";

function Title(props) {
  const { tag, children, className, ...rest } = props;

  let Component;
  if (tag) {
    Component = tag;
  } else {
    Component = "h1";
  }

  return (
    <div className={classnames(styles.title, className)} {...rest}>
      <Component className={styles.titleTag}>{children}</Component>
    </div>
  );
}

Title.propTypes = {
  tag: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Title;
