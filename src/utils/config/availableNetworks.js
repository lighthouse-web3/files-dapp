export const availableNetworks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  fantom: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom Chain Native Token",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools/"],
    blockExplorerUrls: ["https://ftmscan.com/"],
  },
  optimism: {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimistic Ethereum",
    nativeCurrency: {
      name: "Optimistic Chain Native Token",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.ethereum.io"],
  },
  binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Native Chain Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
  },
};
