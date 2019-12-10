// listen to contract event
async function contractCallback(_queryId) {
  const network = await web3.eth.net.getNetworkType()
  const contractAddress = config[network];
  const abi = config.abi;
  const contractInstance = new web3.eth.Contract(abi, contractAddress);

  contractInstance.events.Callback()
  .on('data', event => {
    const queryId = event.returnValues['0']
    const randomNumber = event.returnValues['1']
    const wei = event.returnValues['3']
    const eth = web3.utils.fromWei(wei, "ether")
    
    // win
    if (_queryId === queryId && randomNumber < 60) {
        const winnings = eth * 125/100
        document.getElementById(
        "winnings-text"
      ).innerHTML = `You Won: ${winnings.toFixed(4)} ETH`;
    }
      
    // lose
    if (_queryId === queryId && randomNumber >= 60) {
        document.getElementById(
        "winnings-text"
      ).innerHTML = `You Won: 0 ETH`;
    }
      
  })
  .on('error', err => {
      alert(err)
  })
}

