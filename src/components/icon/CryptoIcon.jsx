import { useState } from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import placeholderIcon from "@/assets/images/icon/missing-currency.svg";

const CryptoIcon = ({ name, size = "24", ...rest }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://icons.blockanalitica.com/currency/${(name || "").toLowerCase()}.svg`,
  );

  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
        minHeight: `${size}px`,
        minWidth: `${size}px`,
      }}
      {...rest}
    >
      <Tooltip message={name}>
        <img
          src={imgSrc}
          style={{ width: size, height: size }}
          alt={name}
          onError={() => {
            setImgSrc(placeholderIcon);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default CryptoIcon;
