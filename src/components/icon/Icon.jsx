const Icon = ({ name, size = "24", ...rest }) => {
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
      <img
        src={`/assets/images/icon/${iconSrc}`}
        style={{ width: size, height: size }}
        alt={name}
      />
    </div>
  );
};

export default Icon;
