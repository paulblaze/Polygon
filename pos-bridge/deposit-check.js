var express = require('express');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const privateKey = '9dde9f5fca89bb7b2fd9d7c6eaaad1dff50e6a628442324a0c78c4a38ab27eb5';

// the following RPC urls will change for mainnet.
const parentProvider = new HDWalletProvider(privateKey, 'https://goerli.infura.io/v3/1726d5f94af84d1793671d4e2feb8f0f');
const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/');

const web3 = new Web3(parentProvider);
const child_web3 = new Web3(maticProvider);

const contractInstance = new child_web3.eth.Contract(
  [
    {
      constant: true,
      inputs: [],
      name: "lastStateId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x0000000000000000000000000000000000001001"
);

async function depositCompleted(txHash) {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  let child_counter = await contractInstance.methods.lastStateId().call();
  let root_counter = web3.utils.hexToNumberString(tx.logs[3].topics[1]);
  return child_counter >= root_counter;
}

// Param 1 - Deposit transaction hash
depositCompleted(
  "0xf57ab66e3970bb95423f4b01e1a293fdf42e8cb6f8ab0e800080e0ba03c6d55d"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });