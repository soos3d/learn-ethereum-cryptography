const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// Function to hash an element given as a parameter, hash to sha256
async function hashThis(inputToHash) {
  // Convert the input string to a byte array
  const bytes = utf8ToBytes(inputToHash);
  
  // Calculate the SHA-256 hash of the input
  const sha256Bytes = sha256(bytes);
  
  // Convert the SHA-256 hash to a hexadecimal string
  const shaToHex = toHex(sha256Bytes);

  return shaToHex;
}


// Function to hash a message using Keccak-256
async function hashMessage(message) {

  // Convert the message string to a byte array
  const bytes = utf8ToBytes(message);
  
  // Calculate the Keccak-256 hash of the input
  const hash = keccak256(bytes);
  
  return hash 
}

// Return encoded event siganture (smart contracts event
// You can use Web3.utils.keccak256("Transfer(address,address,uint256)") if using web3.js
async function encodeEvent(event) {

  // Convert the input string to a byte array
  const bytes = utf8ToBytes(event);
  
  // Calculate the Keccak-256 hash of the input
  const hash = keccak256(bytes);
  
  // Convert the SHA-256 hash to a hexadecimal string
  const keccToHex = toHex(hash);

  // Add 0x
  const eventSignature = `0x${keccToHex}`;

  return eventSignature
}

// Function to sign a message using a private key and the secp256k1 method. https://github.com/paulmillr/noble-secp256k1#signmsghash-privatekey
async function signMessage(msg, PRIVATE_KEY) {
  const hashedMsg = await hashMessage(msg)
    const signedMsg = await secp.sign(hashedMsg, PRIVATE_KEY, { recovered: true })
    return signedMsg
}

// Recover the public key
async function recoverKey(message, signature, recoveryBit) {
  const hashedMsg = await hashMessage(message)
  const publicKey = secp.recoverPublicKey(hashedMsg, signature, recoveryBit);
  return publicKey
}

// Retrieve the Ethereum address from a public key
async function getAddress(publicKey) {
  const removeFirstByte = publicKey.slice(1);

  const keccakHash = keccak256(removeFirstByte);
  const last20Bytes = keccakHash.slice(-20);
  const address = toHex(last20Bytes)
  //console.log(address)
  return address
}

async function main() {
  const privateKey = "1111111111111111111111111111111111111111111111111111111111111111";
  const messageToSend = "Learn web3 with Chainstack";
  console.log(`The message to send is: ${messageToSend}`)
  console.log(`--------------------------------------- \n`)

  // Hash the message using SHA-256
  const hashedValue = await hashThis(messageToSend);
  console.log(`The hashed result is: ${hashedValue}`);

  // Hash the message using Keccak-256
  const keccak256Hash = await hashMessage(messageToSend);
  console.log(`The Keccak-256 result is: ${toHex(keccak256Hash)}`);

  // Sign the message using the private key and the secp256k1 method
  const [signedMessage, recoveryBit] = await signMessage(messageToSend, privateKey);
  console.log(`The signed message is: ${toHex(signedMessage)} \n`);

  // Recover the public key from the message and the signature
  const referencePublicKey = secp.getPublicKey(privateKey);
  console.log(`The reference public key taken from the private key is: ${toHex(referencePublicKey)}\n`);

  // Recover the public key from the signature and recovery bit
  const recoveredPublicKey = await recoverKey(messageToSend, signedMessage, recoveryBit);
  console.log(`The public key recovered from the message is: ${toHex(recoveredPublicKey)} \n`);

  // Retrieve the Ethereum address from the public key
  const ethAddress = await getAddress(recoveredPublicKey);
  console.log(`The address that sent the message is: 0x${ethAddress}`);
}

main();
