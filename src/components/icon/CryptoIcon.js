import classnames from "classnames";
import Image from "next/image";

const CryptoIcon = ({ name, size = "24", priority = false, ...rest }) => {
  const mapping = {
    DAI: "dai.svg",
    TDAI: "dai.svg",
    sDAI: "dai.svg",
    COMP: "comp.svg",
    ETH: "eth.svg",
    LINK: "link.svg",
    UNI: "uni.svg",
    USDC: "usdc.svg",
    WBTC: "wbtc.svg",
    WETH: "eth.svg",
    TWETH: "eth.svg",
    wstETH: "steth.svg",
    cbETH: "cbeth.svg",
  };
  const iconSrc = mapping[name];
  if (!iconSrc) {
    return null;
  }

  return (
    <div
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
      {...rest}
    >
      <Image
        src={`/assets/images/icon/crypto/${iconSrc}`}
        width={size}
        height={size}
        alt={name}
        priority={priority}
      />
    </div>
  );
};

export default CryptoIcon;
