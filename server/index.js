import express, { json } from "express";
const app = express();
import cors from "cors";
const port = 3042;

app.use(cors());
app.use(json());

const balances = {
  e641942ada5b0416f47e3f8393888aa7e60b2f39: 100,
  c801b76f12d32eb8260b0b31398de93884d991f9: 50,
  "0bedf4329bfd0a64f9ea35296b14ddc4e29ac773": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
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
