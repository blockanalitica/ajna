import PropTypes from "prop-types";
import React, { useState } from "react";
import Slider from "rc-slider";
import classnames from "classnames";
import styles from "./RangeSlider.module.scss";

function RangeSlider(props) {
  const { onChange, title, defaultValue, min, max, className, formatter, ...rest } =
    props;

  const [sliderValue, setSliderValue] = useState(defaultValue || [min, max]);

  const onSliderChange = (value) => {
    setSliderValue(value);
  };

  const onAfterSliderChange = (value) => {
    setSliderValue(value);
    onChange(value);
  };

  return (
    <div className={classnames(styles.rangeSlider, className)}>
      <div className="d-flex">
        <div className={styles.rangeSliderMin}>{formatter(sliderValue[0])}</div>
        <div
          className={classnames(styles.rangeSliderTitle, "flex-grow-1", "text-center")}
        >
          {title}
        </div>
        <div className={styles.rangeSliderMax}>{formatter(sliderValue[1])}</div>
      </div>
      <Slider
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={onSliderChange}
        onAfterChange={onAfterSliderChange}
        range
        {...rest}
      />
    </div>
  );
}

RangeSlider.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.array,
  min: PropTypes.any.isRequired,
  max: PropTypes.any.isRequired,
  className: PropTypes.string,
  formatter: PropTypes.func.isRequired,
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  formatter: (value) => {
    return value;
  },
};

export default RangeSlider;
