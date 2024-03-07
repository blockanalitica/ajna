import { NETWORKS } from "@/networks";

export const SLASH_REGEX = /^\/?|\/?$/g;

export const smartLocationParts = (location) => {
  const pathname = location.pathname.replace(SLASH_REGEX, "");
  const paths = pathname.split("/");
  let version = "v4";
  let network = "ethereum";
  let otherPaths = paths;

  if (paths.length > 0) {
    const v4networkOptions = NETWORKS["v4"].map((n) => n.key);

    if (v4networkOptions.includes(paths[0])) {
      version = "v4";
      network = paths[0];
      otherPaths = paths.slice(1);
    } else if (paths.length > 1) {
      if (Object.keys(NETWORKS).includes(paths[0])) {
        const networks = NETWORKS[paths[0]];
        const networkOptions = networks.map((n) => n.key);
        if (networkOptions.includes(paths[1])) {
          version = paths[0];
          network = paths[1];
          otherPaths = paths.slice(2);
        }
      }
    }
  }
  return { version, network, paths: otherPaths };
};

export const generateEtherscanUrl = (network, address, path = "address") => {
  let domain = "etherscan.io";

  switch (network) {
    case "goerli":
      domain = "goerli.etherscan.io";
      break;
    case "base":
      domain = "basescan.org";
      break;
    case "arbitrum":
      domain = "arbiscan.io";
      break;
    case "optimism":
      domain = "optimistic.etherscan.io";
      break;
    case "polygon":
      domain = "polygonscan.com";
      break;
    case "blast":
      domain = "blastscan.io";
      break;
    case "gnosis":
      domain = "gnosisscan.io";
      break;
    default:
    // pass
  }
  return `https://${domain}/${path}/${address}`;
};
