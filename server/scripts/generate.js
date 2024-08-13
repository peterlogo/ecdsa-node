import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

const unit8ToHex = (key) => toHex(key);

const privateKey = secp.utils.randomPrivateKey();

const publicKey = secp.getPublicKey(privateKey);

const getPublicKeyAddress = (publicKey) => {
  const keySlice = publicKey.slice(1);
  const keyHash = keccak256(keySlice);
  const addressSlice = keyHash.slice(keyHash.length - 20, keyHash.length);
  return unit8ToHex(addressSlice);
};

const getKeyPairs = () => {
  const pvKey = secp.utils.randomPrivateKey();
  const pubKey = secp.getPublicKey(pvKey);

  const address = getPublicKeyAddress(pubKey);
  const pvHex = unit8ToHex(pvKey);

  console.log("address: ", address);
  console.log("private key: ", pvHex);
  console.log(`\n`);
};

for (let i = 0; i <= 3; i++) {
  getKeyPairs();
}
