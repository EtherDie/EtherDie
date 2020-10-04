// listen to contract event
async function contractListen() {
  const network = await web3.eth.net.getNetworkType();
  const fromAddress = (await web3.eth.getAccounts())[0];
  const contractAddress = config[network];
  const abi = config.abi;
  const contractInstance = new web3.eth.Contract(abi, contractAddress);

  contractInstance.events
    .Callback()
    .on("data", event => {
      const randomNumber = event.returnValues["1"];
      const eventAddress = event.returnValues["2"];
      const wei = event.returnValues["3"];
      const eth = web3.utils.fromWei(wei, "ether");

      // win
      if (fromAddress === eventAddress && randomNumber < 60) {
        const winnings = (eth * 125) / 100;
        const text = `You Won: ${winnings.toFixed(4)} ETH`;
        document.getElementById("winnings-text").innerHTML = text;
      }

      // lose
      if (fromAddress === eventAddress && randomNumber >= 60) {
        const text = `You Won: 0 ETH`;
        document.getElementById("winnings-text").innerHTML = text;
      }
    })
    .on("error", err => {
      alert(err);
    });
}
