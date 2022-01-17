var currentAccount = "";

function setupPage() {
    console.log("Setting up");
    // this will be called when the page first loads
    ethereum.request({ method: 'eth_accounts' })
    .then(accountsChanged)
    .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
    });
}

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

function mint() {
    // TODO: fill this out with contract info
    params = {}
    ethereum.request({method: 'eth_sendTransaction', params: [params]}).then((transactionHash) => {
        console.log(transactionHash);
    }).catch((err) => {
        console.error("User rejected metamask transaction");
        console.error(err);
    });
}

function accountsChanged(accounts) {
    console.log(accounts);
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        // disable minting and enable connecting
        console.log("Hiding");
        document.querySelector('#btn-connect').innerText = "Connect Metamask Wallet To Enable Minting";
        document.querySelector('#wallet-info').style.display = "none";
        document.querySelector('.quantity').style.display = "none";
        $('#btn-connect').click(connectMetamask());
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // disable connecting and enable minting
        document.querySelector('#btn-connect').innerText = "Click To Mint";
        // unhide 
        document.querySelector('#wallet-info').innerText = "Detected Wallet Address is: " + currentAccount;
        document.querySelector('#wallet-info').style.display = "flex";
        document.querySelector('.quantity').style.display = "flex";
        $('#btn-connect').click(mint());
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

$


console.log("loaded js file");
