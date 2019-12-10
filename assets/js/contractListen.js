// hackery b/c mobile does not support event listeners
async function contractListen(sendTime) {
  const network = await web3.eth.net.getNetworkType();
  const fromAddress = (await web3.eth.getAccounts())[0];
  const contractAddress = config[network];
  const abi = config.abi;
  const contractInstance = new web3.eth.Contract(abi, contractAddress);

  let loop = true;
  while (loop) {
    await pause(3000);
    //https://web3js.readthedocs.io/en/v1.2.4/web3-eth-contract.html#methods-mymethod-call
    contractInstance.methods
      .addressToTx(fromAddress)
      .call()
      .then(event => {
        const { time, hasWon, amount } = event;
        if (time > sendTime && hasWon) {
          const winnings = (web3.utils.fromWei(amount) * 130 / 100).toFixed(3);
          const text = `Winnings: ${winnings} ETH`
          document.getElementById("winnings-text").innerHTML = text;
          loop = false;
        }
        if (time > sendTime && !hasWon) {
          document.getElementById("winnings-text").innerHTML = `Winnings: 0 ETH`;
          loop = false;
        }
      });
  }
}

function pause(ms) {
  return new Promise(res => {
    setInterval(() => {
      return res();
    }, ms);
  });
}
