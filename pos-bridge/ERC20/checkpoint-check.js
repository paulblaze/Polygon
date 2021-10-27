var express = require('express');
var request = require('request');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const privateKey = '9dde9f5fca89bb7b2fd9d7c6eaaad1dff50e6a628442324a0c78c4a38ab27eb5';

// the following RPC urls will change for mainnet.
const parentProvider = new HDWalletProvider(privateKey, 'https://goerli.infura.io/v3/1726d5f94af84d1793671d4e2feb8f0f');
const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/');

const web3 = new Web3(parentProvider);
const child_web3 = new Web3(maticProvider);


const rootToken = "0x29c6d5211C59cEF09c9870c79f137Db9582ffE71"; 


request('https://apis.matic.network/api/v1/mumbai/block-included/20616624', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.    
  } else {
    console.log(body);    
  }
})
