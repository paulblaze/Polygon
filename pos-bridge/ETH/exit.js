var express = require('express');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const privateKey = '9dde9f5fca89bb7b2fd9d7c6eaaad1dff50e6a628442324a0c78c4a38ab27eb5';

// the following RPC urls will change for mainnet.
const parentProvider = new HDWalletProvider(privateKey, 'https://goerli.infura.io/v3/1726d5f94af84d1793671d4e2feb8f0f');
const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/');

// for mumbai testnet
const maticPOSClient = new MaticPOSClient({
  network: "testnet",
  version: "mumbai",
  parentProvider: parentProvider,
  maticProvider: maticProvider
});

const from = "0xaF0091c43E54C82754817376Ee0B41B8eC1e3189";
const burnHash = '0xc2a8b722e5f1c13e585b46ec6e979ebe4a7642c34e7834e4fa3ff7ce914708d9'

const execute = async () => {
  try {
    const tx = await maticPOSClient.exitERC20(burnHash, { from: from })
    console.log(tx.transactionHash) // eslint-disable-line
    console.log(tx.blockNumber)
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))