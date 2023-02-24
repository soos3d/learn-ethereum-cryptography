# learn-ethereum-cryptography

This repository holds the code to show you how some of the fundamental cryptographic mechanisms work on Ethereum.

> This excercise uses the `ethereum-cryptography` JavaScript library.

## Quick start

* Clone this repository:

```sh
git clone https://github.com/soos3d/learn-ethereum-cryptography.git
```

* Install dependencies:

```sh
npm install
```

* Run the code:

```sh
node index
```

You can edit the private key constant with yours to see how it signs messages and recover the address:

```js
const privateKey = "1111111111111111111111111111111111111111111111111111111111111111";
```

> ⚠ Make sure you don't expose your private key to the internet. An environment variable is recommended; otherwise, test this with an account with no funds.

## Example

Running this code will return a response like this:

```sh
The message to send is: Learn web3 with Chainstack
---------------------------------------

The hashed result is: b58487338367f2776f9c0edc8c29cb44624d676b34021a843649d71fe9b3c2e2    
The Keccak-256 result is: 6df05a9d70c4448c1553e1ebfd6d9cd58dbe470a8cafcba42f39bdb80b65660d
The signed message is: 3045022100eebadeb7d2e333991526b2406d549301de300ceb2f7f62f6f2106abea80ddfbb02207911a7326dcad0540b11f822825077a0c54a593ec3557bd45340b0da4ba4b4b9

The reference public key taken from the private key is: 044f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa385b6b1b8ead809ca67454d9683fcf2ba03456d6fe2c4abe2b07f0fbdbb2f1c1

The public key recovered from the message is: 044f355bdcb7cc0af728ef3cceb9615d90684bb5b2ca5f859ab0f0b704075871aa385b6b1b8ead809ca67454d9683fcf2ba03456d6fe2c4abe2b07f0fbdbb2f1c1

The address that sent the message is: 0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2a
```

## Prerequisites

The system requires at least:

Node.js: ^16.17.0— [Install Node](https://nodejs.org/en/download/)