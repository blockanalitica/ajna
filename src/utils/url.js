import { NETWORKS } from "@/networks";

export const SLASH_REGEX = /^\/?|\/?$/g;

export const smartLocationParts = (location) => {
  const pathname = location.pathname.replace(SLASH_REGEX, "");
  const paths = pathname.split("/");
  let version = "v3";
  let network = "ethereum";
  let otherPaths = paths;

  if (paths.length > 0) {
    const v1networks = NETWORKS["v3"];
    const v1networkOptions = v1networks.map((n) => n.key);

    if (v1networkOptions.includes(paths[0])) {
      version = "v3";
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

  if (network === "goerli") {
    domain = "goerli.etherscan.io";
  }

  return `https://${domain}/${path}/${address}`;
};
