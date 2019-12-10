// https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check
window.addEventListener("load", async () => {
  if (window.location.pathname.includes("/play.html")) {
    if (window.ethereum) {
      // https://medium.com/metamask/eip-1102-preparing-your-dapp-5027b2c9ed76
      web3 = new Web3(window.ethereum);
      // connect popup
      await ethereum.enable();
      // get network
      const network = await web3.eth.net.getNetworkType();
      // caclulate max per send for network
      maxSend(config[network]);
      // display network on screen
      document.getElementById("network").innerHTML = `Network: ${network}`;
      // listen to contract events
      contractListen();
    } else {
      alert("Non-Ethereum browser detected. Please connect to a wallet");
    }
  }
});
