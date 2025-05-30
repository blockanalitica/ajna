export const NETWORKS_ICON_MAP = {
  ethereum: "eth",
  base: "base",
  arbitrum: "arb",
  optimism: "op",
  polygon: "polygon_pos",
  blast: "blast",
  gnosis: "gnosis",
  mode: "mode",
  rari: "rari",
  avalanche: "avax",
  linea: "linea",
  hemi: "hemi",
};

export const NETWORKS_NAME_MAP = {
  ethereum: "Ethereum",
  base: "Base",
  arbitrum: "Arbitrum One",
  optimism: "Optimism",
  polygon: "Polygon PoS",
  blast: "Blast",
  gnosis: "Gnosis",
  mode: "Mode",
  rari: "RARI",
  avalanche: "Avalanche",
  linea: "Linea",
  hemi: "Hemi",
};

export const NETWORKS = {
  v2: [{ name: "Ethereum", key: "ethereum", icon: "ETH" }],
  v3: [
    { name: NETWORKS_NAME_MAP["base"], key: "base", icon: NETWORKS_ICON_MAP["base"] },
    {
      name: NETWORKS_NAME_MAP["arbitrum"],
      key: "arbitrum",
      icon: NETWORKS_ICON_MAP["arbitrum"],
    },
    {
      name: NETWORKS_NAME_MAP["optimism"],
      key: "optimism",
      icon: NETWORKS_ICON_MAP["optimism"],
    },
    {
      name: NETWORKS_NAME_MAP["polygon"],
      key: "polygon",
      icon: NETWORKS_ICON_MAP["polygon"],
    },
  ],
  v4: [
    {
      name: NETWORKS_NAME_MAP["ethereum"],
      key: "ethereum",
      icon: NETWORKS_ICON_MAP["ethereum"],
    },
    {
      name: NETWORKS_NAME_MAP["arbitrum"],
      key: "arbitrum",
      icon: NETWORKS_ICON_MAP["arbitrum"],
    },
    { name: NETWORKS_NAME_MAP["base"], key: "base", icon: NETWORKS_ICON_MAP["base"] },
    {
      name: NETWORKS_NAME_MAP["polygon"],
      key: "polygon",
      icon: NETWORKS_ICON_MAP["polygon"],
    },
    {
      name: NETWORKS_NAME_MAP["optimism"],
      key: "optimism",
      icon: NETWORKS_ICON_MAP["optimism"],
    },
    {
      name: NETWORKS_NAME_MAP["gnosis"],
      key: "gnosis",
      icon: NETWORKS_ICON_MAP["gnosis"],
    },
    {
      name: NETWORKS_NAME_MAP["blast"],
      key: "blast",
      icon: NETWORKS_ICON_MAP["blast"],
    },
    {
      name: NETWORKS_NAME_MAP["mode"],
      key: "mode",
      icon: NETWORKS_ICON_MAP["mode"],
    },
    {
      name: NETWORKS_NAME_MAP["rari"],
      key: "rari",
      icon: NETWORKS_ICON_MAP["rari"],
    },
    {
      name: NETWORKS_NAME_MAP["avalanche"],
      key: "avalanche",
      icon: NETWORKS_ICON_MAP["avalanche"],
    },
    {
      name: NETWORKS_NAME_MAP["linea"],
      key: "linea",
      icon: NETWORKS_ICON_MAP["linea"],
    },
    {
      name: NETWORKS_NAME_MAP["hemi"],
      key: "hemi",
      icon: NETWORKS_ICON_MAP["hemi"],
    },
  ],
};
