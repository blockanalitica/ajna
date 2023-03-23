import React from "react";
import PropTypes from "prop-types";
import { shorten } from "../../utils/address.js";

function Address(props) {
  const { value, short, ...rest } = props;
  let address = value;
  if (short) {
    address = shorten(value);
  }
  return <span {...rest}>{address}</span>;
}

Address.propTypes = {
  value: PropTypes.string.isRequired,
  short: PropTypes.bool,
};

Address.defaultProps = {
  short: false,
};

export default Address;
