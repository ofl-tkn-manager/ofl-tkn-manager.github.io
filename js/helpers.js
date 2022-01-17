var currentAccount = "";

const ALLOWED_CHAIN = "0x1";
const QUANTITY_TO_PRICE = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
};
const QUANTITY_TO_DATA =  {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
};

function setupPage() {
    console.log("Setting up");
    updateButtonAndArrow();
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


function updateButtonAndArrow() {
    var w = $(window).width();
    var h = $(window).height();
    var newSize = Math.max(120, w/6);
    $(".btn-circle").height(newSize);
    $(".btn-circle").width(newSize);
    if (newSize < 200) {
        document.querySelector('#welcome-text').style.fontSize = "28px";
        document.querySelector('#btn-connect').style.fontSize = "14px";
    } else if (newSize > 200 && newSize < 400) {
        document.querySelector('#btn-connect').style.fontSize = "36px";
        document.querySelector('#btn-connect').style.fontSize = "20px";
    } else {
        document.querySelector('#btn-connect').style.fontSize = "38px";
        document.querySelector('#btn-connect').style.fontSize = "24px";
    }

    // our floating arrow goes lower down on tall screens
    if (h > w) {
        document.querySelector('.picture-arrow').style.bottom = "20%";
    } else {
        document.querySelector('.picture-arrow').style.bottom = "25%";
    }
}
window.onresize = updateButtonAndArrow;


function connectMetamask() {
    console.log("Connect to metamask called");
    if (!window.ethereum) {
        alert("There were no ethereum utilities detected in your browser. Please install MetaMask or another web3 wallet extension, and ensure it is enabled.");
    }
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
    console.log("Minting function called");
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
        document.querySelector('#chain-info').style.display = "none";
        $('#btn-connect').prop("disabled", false);
        document.querySelector('#btn-connect').onclick = connectMetamask;
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // disable connecting and enable minting
        document.querySelector('#btn-connect').innerText = "Click To Mint";
        // unhide 
        document.querySelector('#wallet-info').innerText = "Detected Wallet Address is: " + currentAccount;
        document.querySelector('#wallet-info').style.display = "inline-block";
        document.querySelector('.quantity').style.display = "flex";
        document.querySelector('#btn-connect').onclick = mint;

        ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
            console.log("Detected chain id ");
            console.log(chainId);
            if (chainId != ALLOWED_CHAIN) {
                document.querySelector('#chain-info').style.display = "inline-block";
                $('#btn-connect').prop("disabled", true);
            } else {
                document.querySelector('#chain-info').style.display = "none";
                $('#btn-connect').prop("disabled", false);
            }
        });
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
