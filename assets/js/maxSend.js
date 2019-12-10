async function maxSend(contractAddress) {
  // figure contract balance
  const weiBalance = await web3.eth.getBalance(contractAddress);
  const ethBalance = Number(web3.utils.fromWei(weiBalance, "ether"));
  // 10% of max
  const maxEth = ethBalance * 0.1;
  document.getElementById(
    "maximum-amount"
  ).innerHTML = `Max Per Play: ${maxEth.toFixed(3)} ETH`;
}
