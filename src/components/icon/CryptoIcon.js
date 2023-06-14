"use client";

import { useState } from "react";
import Image from "next/image";

const CryptoIcon = ({ name, size = "24", priority = false, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://icons.blockanalitica.com/currency/${name.toLowerCase()}.svg`
  );

  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      {...rest}
    >
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
    </div>
  );
};

export default CryptoIcon;
