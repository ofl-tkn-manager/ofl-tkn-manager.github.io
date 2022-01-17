var currentAccount = "";

function connectMetamask() {
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(() => {
        ethereum.request({ method: 'eth_accounts' })
        .then(accountsChanged)
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
        });
    });
}

function accountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        // disable minting and enable connecting
        $("#btn-connect").prop("disabled",false);
        $("#btn-connect").prop("value", "Connect Metamask Wallet");
        $("#btn-mint").prop("disabled",true);
        $("#btn-mint").prop("value", "Connect Your Wallet to Mint");
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // disable connecting and enable minting
        $("#btn-connect").prop("disabled",true);
        $("#btn-connect").prop("value", "MetaMask Already Connected");
        $("#btn-mint").prop("disabled",false);
        $("#btn-mint").prop("value", "Mint!");
    }
}


function chainChanged(chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated, so we just reload
    window.location.reload();
}

function clickMinus() {
    const input = $('.quantity__input');
    var value = input.val();
    if (value > 1) {
      value--;
    }
    input.val(value);
};
  
function clickPlus() {
    const input = $('.quantity__input');
    var value = input.val();
    if (value < 20) {
      value++;
    }
    input.val(value);
};


//const transactionHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [params]})
console.log("loaded js file");
