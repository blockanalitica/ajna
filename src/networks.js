export const NETWORKS_ICON_MAP = {
  ethereum: "eth",
  goerli: "goerli",
  base: "base",
  arbitrum: "arb",
  optimism: "op",
  polygon: "polygon_pos",
  blast: "blast",
};

export const NETWORKS_NAME_MAP = {
  ethereum: "Ethereum Mainnet",
  goerli: "Ethereum Goerli",
  base: "Base",
  arbitrum: "Arbitrum One",
  optimism: "Optimism",
  polygon: "Polygon PoS",
  blast: "Blast",
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
      name: NETWORKS_NAME_MAP["goerli"],
      key: "goerli",
      icon: NETWORKS_ICON_MAP["goerli"],
    },
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
    {
      name: NETWORKS_NAME_MAP["blast"],
      key: "blast",
      icon: NETWORKS_ICON_MAP["blast"],
    },
  ],
};
