$("#send-button").on("click", async function() {
  const ethAmount = document.getElementById("eth-amount").value;
  const fromAddress = (await web3.eth.getAccounts())[0];
  const network = await web3.eth.net.getNetworkType();
  const contractAddress = config[network];
  const abi = config.abi;
  const contractInstance = new web3.eth.Contract(abi, contractAddress);

  // call contract function
  contractInstance.methods["send"]()
    .send({
      from: fromAddress,
      value: web3.utils.toWei(ethAmount, "ether")
    })
    .on("transactionHash", txHash => {
      // listen to contract for win/lose
      contractListen(Math.round(new Date() / 1000));
      // display transaction hash
      const etherscanLink =
        network === "main"
          ? `https://etherscan.io/tx/${txHash}`
          : `https://${network}.etherscan.io/tx/${txHash}`;
      document.getElementById(
        "transaction-text"
      ).innerHTML = `Transaction: <a href="${etherscanLink}" target="_blank"> link </a>`;
      // display winnings pending
      document.getElementById("winnings-text").innerHTML =
        "Winnings: processing...";
    })
    .catch(err => {
      alert(err.message);
    });
});
