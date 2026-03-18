let wallet = null;
const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");

async function connectWallet() {
  if (!window.solana) return alert("Install Phantom");

  const resp = await window.solana.connect();
  wallet = resp.publicKey;

  document.getElementById("status").innerText = "Connected";
  document.getElementById("wallet").innerText = wallet.toString().slice(0,4) + "...";

  getBalance();
}

async function getBalance() {
  const balance = await connection.getBalance(wallet);
  const sol = balance / 1e9;

  document.getElementById("solBalance").innerText = sol.toFixed(4);
  document.getElementById("sol").innerText = sol.toFixed(4) + " SOL";

  getPrice(sol);
}

async function getPrice(sol) {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
  const data = await res.json();

  const total = sol * data.solana.usd;
  document.getElementById("usd").innerText = "$" + total.toFixed(2);
}

/* SEND */
function openSend() {
  document.getElementById("sendModal").style.display = "block";
}

async function send() {
  const to = document.getElementById("sendTo").value;
  const amount = document.getElementById("sendAmount").value;

  const tx = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: wallet,
      toPubkey: new solanaWeb3.PublicKey(to),
      lamports: amount * 1e9
    })
  );

  tx.feePayer = wallet;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  const signed = await window.solana.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());

  alert("Sent: " + sig);
}

/* SWAP (SIMULASI UI) */
function openSwap() {
  document.getElementById("swapModal").style.display = "block";
}

function swap() {
  alert("Swap integrated soon with Jupiter 🔥");
}

/* CLOSE */
function closeModal() {
  document.getElementById("sendModal").style.display = "none";
  document.getElementById("swapModal").style.display = "none";
}
