"use client";

import Stats from "@/components/stats/Stats";
import { DateTime } from "luxon";
import DateTimeAgo from "@/components/dateTime/DateTimeAgo";

const WalletAdditionalInfo = ({ data, ...rest }) => {
  const stats = [
    {
      title: "Ealiest Activity",
      value: <DateTimeAgo dateTime={DateTime.fromISO(data.first_activity)} />,
    },
    {
      title: "Latest Activity",
      value: <DateTimeAgo dateTime={DateTime.fromISO(data.last_activity)} />,
    },
  ];

  return <Stats data={stats} {...rest} />;
};

export default WalletAdditionalInfo;
