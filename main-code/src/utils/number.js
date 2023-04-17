import numeral from "numeral";

export const round = (value, decimals = 2) => {
  // https://www.jacklmoore.com/notes/rounding-in-javascript/
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const compact = (value, decimals = 2, hideZeroDecimals = false) => {
  let fmt = "0";
  if (decimals > 0) {
    let decimal_str = "0".repeat(decimals);
    if (hideZeroDecimals === true) {
      decimal_str = "[" + decimal_str + "]";
    }
    fmt = fmt + "." + decimal_str;
  }

  return numeral(value)
    .format(fmt + "a")
    .toUpperCase();
};

export const formatToDecimals = (value, decimals) => {
  let fmt = "0";
  if (decimals > 0) {
    if (value !== 0) {
      let decimal_str = "0".repeat(decimals);
      decimal_str = "[" + decimal_str + "]";

      fmt = fmt + "." + decimal_str;
    }
  }
  return numeral(round(value, decimals)).format("0," + fmt);
};

export const resolveSmallNumbers = (value, decimals) => {
  let returnValue = null;
  let prefix = null;
  let isNegative = false;

  if (value < 0) {
    value = value * -1;
    isNegative = true;
  }

  if (value !== 0) {
    if (decimals === 0 && value < 0) {
      prefix = "<";
      returnValue = 0;
    } else if (decimals === 1 && value < 0.1) {
      prefix = "<";
      returnValue = 0.1;
    } else if (decimals > 1 && value < 0.01) {
      const limitValue = numeral("0." + "0".repeat(decimals - 1) + "1");
      if (value < limitValue.value()) {
        prefix = "<";
        returnValue = limitValue.value();
      }
    }
  }

  if (returnValue && isNegative) {
    returnValue = returnValue * -1;
  }

  return {
    prefix,
    value: returnValue,
  };
};
