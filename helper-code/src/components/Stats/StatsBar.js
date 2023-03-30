import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { uniqueId } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./StatsBar.module.scss";

function StatsBar(props) {
  const { stats, cardTag, onClick, className, alignCenter, ...rest } = props;

  const Component = cardTag;

  let compArgs = {};
  if (typeof Component === "function" && String(Component).includes("Card")) {
    compArgs["fullHeight"] = false;
  }

  return (
    <Component
      {...compArgs}
      onClick={onClick}
      className={classnames(styles.wrapper, className)}
      {...rest}
    >
      <div className={styles.sectionWrapper}>
        {stats.map((stat) => (
          <div
            className={classnames(styles.section, "text-center", {
              "flex-grow-1": stats.length <= 5,
            })}
            key={uniqueId(stat.title)}
          >
            <div className="section-title">{stat.title}</div>
            {stat.bigValue ? (
              <div className="text-big d-flex justify-content-center align-items-center">
                {stat.bigValue}
              </div>
            ) : null}
            {stat.normalValue ? (
              <div className="d-flex justify-content-center align-items-center">
                {stat.normalValue}
              </div>
            ) : null}
            {stat.smallValue ? (
              <div className="text-small d-flex justify-content-center align-items-center">
                {stat.smallValue}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {onClick ? (
        <div className={styles.iconBox}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      ) : null}
    </Component>
  );
}

StatsBar.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
      bigValue: PropTypes.any,
      normalValue: PropTypes.any,
      smallValue: PropTypes.any,
    })
  ).isRequired,
  cardTag: PropTypes.any,
};

StatsBar.defaultProps = {
  cardTag: "div",
};

export default StatsBar;
