import CryptoIcon from "./CryptoIcon";

const EtherscanIcon = ({ network, size = "24", ...rest }) => {
  let alt = "etherscan.io";

  switch (network) {
    case "goerli":
      alt = "goerli.etherscan.io";
      break;
    case "base":
      alt = "basescan.org";
      break;
    case "arbitrum":
      alt = "arbiscan.io";
      break;
    case "optimism":
      alt = "optimistic.etherscan.io";
      break;
    case "polygon":
      alt = "polygonscan.com";
      break;
    default:
    // pass
  }

  return <CryptoIcon name="etherscan" alt={alt} size={16} />;
};

export default EtherscanIcon;