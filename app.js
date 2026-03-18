let wallet = null;

async function connectWallet() {
  if (!window.solana) {
    alert("Install Phantom Wallet");
    return;
  }

  try {
    const resp = await window.solana.connect();
    wallet = resp.publicKey.toString();

    document.getElementById("status").innerText = "Connected";
    document.getElementById("walletName").innerText = wallet.slice(0,4) + "...";

    getBalance();
  } catch (err) {
    alert("Connection failed");
  }
}

async function getBalance() {
  const res = await fetch("https://api.mainnet-beta.solana.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [wallet]
    })
  });

  const data = await res.json();
  const sol = data.result.value / 1e9;

  document.getElementById("solBalance").innerText = sol.toFixed(4);

  getPrice(sol);
}

async function getPrice(sol) {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
  const data = await res.json();

  const price = data.solana.usd;
  const total = sol * price;

  document.getElementById("balance").innerText = "$" + total.toFixed(2);
}

function swap() {
  alert("Swap coming soon (Jupiter API)");
}

function send() {
  alert("Send coming soon");
}
