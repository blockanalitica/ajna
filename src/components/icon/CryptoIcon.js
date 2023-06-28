"use client";

import { useState } from "react";
import Image from "next/image";
import Tooltip from "@/components/tooltip/Tooltip";

const CryptoIcon = ({ name, size = "24", priority = false, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://icons.blockanalitica.com/currency/${(name || "").toLowerCase()}.svg`
  );

  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      {...rest}
    >
      <Tooltip message={name}>
        <Image
          src={imgSrc}
          width={size}
          height={size}
          alt={name}
          priority={priority}
          onError={() => {
            setImgSrc("/assets/images/icon/missing-currency.svg");
          }}
        />
      </Tooltip>
    </div>
  );
};

export default CryptoIcon;
