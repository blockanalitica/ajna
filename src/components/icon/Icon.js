import Image from "next/image";

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
