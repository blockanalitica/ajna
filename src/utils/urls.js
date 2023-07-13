export const generateEtherscanUrl = (network, address, path = "address") => {
  let domain = "etherscan.io";

  if (network === "goerli") {
    domain = "goerli.etherscan.io";
  }

  return `https://${domain}/${path}/${address}`;
};
