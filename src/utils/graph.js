import _ from "lodash";
import { DateTime } from "luxon";
import { compact, round } from "./number.js";

export const tooltipLabelNumber = (tooltipItem, prefix, suffix) => {
  let label = tooltipItem.dataset.label || "";
  if (label) {
    label += ": ";
  }
  const value = compact(tooltipItem.parsed.y, 2, true);
  if (tooltipItem.parsed.y !== null) {
    label += (prefix || "") + value + (suffix || "");
  }
  return label;
};

export const tooltipLabelNumberWithPercent = (tooltipItem, prefix, suffix) => {
  let label = tooltipLabelNumber(tooltipItem, prefix, suffix);
  if (tooltipItem.parsed.y !== null) {
    const total = tooltipItem.dataset.data.reduce((total, row) => total + row.y, 0);
    const percentage = round((tooltipItem.parsed.y / total) * 100);
    label += ` (${percentage}%)`;
  }
  return label;
};

export const tooltipFooterTotal = (tooltipItems, prefix, suffix) => {
  const total = tooltipItems.reduce((total, tooltip) => total + tooltip.parsed.y, 0);
  return `${prefix || ""}` + compact(total, 2, true) + `${suffix || ""}`;
};

export const tooltipTitleDateTime = (
  tooltipItems,
  showDate = true,
  showTime = true,
  format = null
) => {
  if (!format) {
    format = "LLL dd, yyyy HH:mm:ss";
    if (!showTime) {
      format = "LLL dd, yyyy";
    }
    if (!showDate) {
      format = "HH:mm:ss";
    }
  }

  return DateTime.fromMillis(tooltipItems[0].parsed.x).toFormat(format, {
    locale: "en",
  });
};

export const barGraphDataLimiter = (
  data,
  labelKey,
  valueKey,
  percentLimit = 2,
  limit = true
) => {
  const sortedObjs = _.sortBy(data, valueKey).reverse();
  const total = data.reduce((total, row) => total + row[valueKey], 0);
  let otherValue = 0;

  const seriesData = [];

  if (limit) {
    sortedObjs.forEach((row) => {
      const value = row[valueKey];
      const percent = (value / total) * 100;

      if (percent > percentLimit) {
        seriesData.push({
          x: row[labelKey],
          y: value,
        });
      } else {
        otherValue += value;
      }
    });

    if (otherValue > 0) {
      seriesData.push({
        x: "Other",
        y: otherValue,
      });
    }
  } else {
    sortedObjs.forEach((row) => {
      seriesData.push({
        x: row[labelKey],
        y: row[valueKey],
      });
    });
  }

  const series = [
    {
      data: seriesData,
    },
  ];

  return { series };
};

export const barGraphSeriesCountLimiter = (
  data,
  labelKey,
  valueKey,
  number = 10,
  limit = true
) => {
  const sortedObjs = _.sortBy(data, valueKey).reverse();

  let otherValue = 0;
  const seriesData = [];

  if (limit) {
    sortedObjs.forEach((row, index) => {
      if (index < number) {
        seriesData.push({
          x: row[labelKey],
          y: row[valueKey],
        });
      } else {
        otherValue += row[valueKey];
      }
    });

    if (otherValue > 0) {
      seriesData.push({
        x: "Other",
        y: otherValue,
      });
    }
  } else {
    sortedObjs.forEach((row) => {
      seriesData.push({
        x: row[labelKey],
        y: row[valueKey],
      });
    });
  }

  const series = [
    {
      data: seriesData,
    },
  ];

  return { series };
};
