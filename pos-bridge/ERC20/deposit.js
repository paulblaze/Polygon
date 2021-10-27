var express = require('express');
var Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider')
const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

var app = express();
var port = process.env.PORT || 8888;


async function approveandtransfer() {
    
    const privateKey = '9dde9f5fca89bb7b2fd9d7c6eaaad1dff50e6a628442324a0c78c4a38ab27eb5';

    //test ERC20 token address parent goerli - 0x655F2166b0709cd575202630952D71E2bB0d61Af
    //test ERC20 token address child mumbai - 0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1
   // Above addresses are taken from matic docs and discussed below
    
    // for mumbai testnet
    const maticPOSClient = new MaticPOSClient({
        network: "testnet",
        version: "mumbai",
        parentProvider: parentProvider,
        maticProvider: maticProvider
    });

    // the following RPC urls will change for mainnet.
    const parentProvider = new HDWalletProvider(privateKey, 'https://goerli.infura.io/v3/1726d5f94af84d1793671d4e2feb8f0f');
    const maticProvider = new HDWalletProvider(privateKey, 'https://rpc-mumbai.maticvigil.com/');
    
    console.log("approve initiated");

    const from = "0xaF0091c43E54C82754817376Ee0B41B8eC1e3189";
    const rootToken = "0x29c6d5211C59cEF09c9870c79f137Db9582ffE71"; // this is taken from matic docs and discussed below
    var amount = Web3.utils.toWei('0.1', 'ether');

    await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from: '0xaF0091c43E54C82754817376Ee0B41B8eC1e3189' });
    
    console.log("approve completed and transfer initiated");

    try {
        const tx = await maticPOSClient.depositERC20ForUser(rootToken, from, amount, {
            from: '0xaF0091c43E54C82754817376Ee0B41B8eC1e3189',
            gasPrice: "10000000000",
        });
        console.log(tx.transactionHash)
    } catch (e) {
        console.error(e);
    }

    console.log("transfer complete");
}

approveandtransfer();

app.listen(port);
console.log('listening on', port);