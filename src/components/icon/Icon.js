import classnames from "classnames";
import Image from "next/image";

const ajnaIcon = "/assets/images/icon/AJNA-Icon.svg";
const etherscanIcon = "/assets/images/icon/crypto/etherscan.svg";
const debankIcon = "/assets/images/icon/crypto/debank.svg";
const zapperIcon = "/assets/images/icon/crypto/zapper.svg";

const Icon = ({ name, size = "24", priority = false, ...rest }) => {
  const mapping = {
    AJNA: "AJNA-Icon.svg",
    etherscan: "etherscan.svg",
    debank: "debank.svg",
    zapper: "zapper.svg",
  };
  const iconSrc = mapping[name];
  if (!iconSrc) {
    return name;
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
        src={`/assets/images/icon/${iconSrc}`}
        width={size}
        height={size}
        alt={name}
        priority={priority}
      />
    </div>
  );
};

export default Icon;
