import { useState } from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import placeholderIcon from "@/assets/images/icon/missing-currency.svg";

const CryptoIcon = ({ name, size = "24", alt = null, ext = "png", ...rest }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://icons.blockanalitica.com/crypto/${ext}/${(
      name || ""
    ).toLowerCase()}.${ext}`,
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
      <Tooltip message={alt || name}>
        <img
          src={imgSrc}
          style={{ width: size, height: size }}
          alt={alt || name}
          onError={() => {
            setImgSrc(placeholderIcon);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default CryptoIcon;
