var currentAccount = "";

function connectMetamask() {
	window.ethereum.request({ method: 'eth_accounts' }).then(accountsChanged)
	.catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

};

function accountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
    // disable minting and enable connecting
    $("#btn-connect").prop("disabled",false);
    $("#btn-mint").prop("disabled",true);
    $("#btn-mint").prop("value", "Please connect your wallet to mint");
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // disable connecting and enable minting
    $("#btn-connect").prop("disabled",true);
    $("#btn-mint").prop("disabled",false);
    $("#btn-mint").prop("value", "Mint!");
  }
}


function chainChanged(chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated, so we just reload
    window.location.reload();
}

//const transactionHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [params]})
console.log("loaded");