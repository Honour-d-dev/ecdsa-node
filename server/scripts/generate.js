const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex ,utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256} = require("ethereum-cryptography/keccak")

const privateKey = secp256k1.utils.randomPrivateKey();
console.log('private key: ', toHex(privateKey));

const publicKey = secp256k1.getPublicKey(toHex(privateKey));
console.log('public key: ', toHex(publicKey));

const msg = "A blockchain transaction";
const msgHash = keccak256(utf8ToBytes(msg));
const signature = secp256k1.sign(msgHash, privateKey);

const sig = signature.toCompactHex();
console.log("Signature: ",sig);