const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256} = require("ethereum-cryptography/keccak");

function validSignature(signatureHex, publicKey) {
    const msgHash = keccak256(utf8ToBytes("A blockchain transaction"));
    return secp256k1.verify(signatureHex, msgHash, publicKey);

}

module.exports = validSignature;