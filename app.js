let wallet = null;
const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");

async function connectWallet() {
  if (!window.solana) return alert("Install Phantom");

  const resp = await window.solana.connect();
  wallet = resp.publicKey;

  getBalance();
}

async function getBalance() {
  const balance = await connection.getBalance(wallet);
  const sol = balance / 1e9;

  document.getElementById("solAmount").innerText = sol.toFixed(4) + " SOL";

  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
  const data = await res.json();

  const usd = sol * data.solana.usd;

  document.getElementById("usd").innerText = "$" + usd.toFixed(2);
  document.getElementById("solUsd").innerText = "$" + usd.toFixed(2);
}

function openSend() {
  alert("Send feature next upgrade 🔥");
}

function buy() {
  window.open("https://moonpay.com", "_blank");
}
