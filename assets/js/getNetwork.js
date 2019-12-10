function getNetwork() {
  // metamask 🦊
  const mmChainId = web3.currentProvider.chainId;
  // coinbase ❄️
  const cbChainId = web3.currentProvider._chainId;
  // trust wallet 🛡️
  const twChainId = web3.currentProvider.chainId;

  if (mmChainId === "0x1" || cbChainId === 1 || twChainId === "1") {
    return "mainnet";
  } else if (mmChainId === "0x2a" || cbChainId === 42 || twChainId === "42") {
    return "kovan";
  } else if (mmChainId === "0x3" || cbChainId === 3 || twChainId === "3") {
    return "ropsten";
  } else if (mmChainId === "0x4" || cbChainId === 4 || twChainId === "4") {
    return "rinkeby";
  } else if (mmChainId === "0x5" || cbChainId === 5 || twChainId === "5") {
    return "goerli";
  } else {
    return undefined;
  }
}
