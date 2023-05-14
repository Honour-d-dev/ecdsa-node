const validSignature = require("c:/Users/hp/week-1-test/ecdsa-node/server/scripts/validSignature");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03bf83a37745ea180dd63deeaa86091b5f593269571132b2201f86ebb269054312": 100,
  "025e2aaa4d0442fa880ffecbd72107828661421005a4ef29f56147338531c08467": 50,
  "0260de4c0fd6eb9ababe30159d791b1a84603b8caeba77860de91c10fb7b097775": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, amount, signature, recipient } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if(!validSignature(signature, sender)) {
    res.status(400).send({ message: "invalid Signature"});
  }
  else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
