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
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/3d635004c08743daae3a5cb579559dbd"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
};


// const ethChainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: `0x${Number(1).toString(16)}`,
//   rpcTarget: `https://mainnet.infura.io/v3/3d635004c08743daae3a5cb579559dbd`,
//   displayName: "mainnet",
//   blockExplorer:
//     "wss://mainnet.infura.io/ws/v3/3d635004c08743daae3a5cb579559dbd",
//   ticker: "ETH",
//   tickerName: "Ethereum",
// };