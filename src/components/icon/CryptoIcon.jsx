import { useState, useMemo } from "react";
import Tooltip from "@/components/tooltip/Tooltip";
import placeholderIcon from "@/assets/images/icon/missing-currency.svg";
import { useLocation } from "react-router-dom";
import { smartLocationParts } from "@/utils/url";

const ICONS_BASE_URL = "https://icons.blockanalitica.com";

const Wrapper = ({ message, children }) => {
  if (message) {
    return <Tooltip message={message}>{children}</Tooltip>;
  }
  return <>{children}</>;
};

const CryptoIcon = ({
  name = null,
  address = null,
  size = "24",
  alt = null,
  ext = "png",
  variant = null,
  ...rest
}) => {
  const location = useLocation();
  const { network } = smartLocationParts(location);
  const [error, setError] = useState(null);

  const src = useMemo(() => {
    if (address) {
      const variantSuffix = variant ? `-${variant}` : "";
      return `${ICONS_BASE_URL}/tokens/${network}/${address.toLowerCase()}${variantSuffix}/icon.${ext}`;
    }
    if (name) {
      return `${ICONS_BASE_URL}/crypto/${ext}/${(name || "").toLowerCase()}.${ext}`;
    }
    return placeholderIcon;
  }, [name, address, ext, network, variant]);

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
      <Wrapper message={alt || name}>
        <img
          src={error ? placeholderIcon : src}
          style={{ width: size, height: size }}
          alt={alt || name}
          onError={() => {
            setError(new Error());
          }}
        />
      </Wrapper>
    </div>
  );
};

export default CryptoIcon;
