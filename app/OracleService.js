//Dependencies 
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const fetch = require('node-fetch')
//json files
const contracJson = require('../build/contracts/Oracle.json'); 

//web3 object
const web3 = new Web3('ws://127.0.0.1:7545'); 

//Ganache's address
const addressContract = '0x2f76e461CcA8C6580CF46b6B49BBE65f73006bBB';
const contractInstance = new web3.eth.Contract(contracJson.abi, addressContract); 
const privateKey = Buffer.from('030ab6c0d0cac2e01242eca4c55a544298299241072be52e691a37726fd6a46e', 'hex'); 
const address = '0x3De78bA17a114745Dd7683336BFF36c24C426A15'; 

//Get block number
web3.eth.getBlockNumber().then(n => listenEvent(n-1)); 

//Function: listenEvent

function listenEvent(lastBlock) {
    contractInstance.events.__callbackNewData ({}, {fromBlock:lastBlock, toBlock: 'latest'} , (err,event) =>{

        event ? updateData()   :null
        err ? console.log(err) :null

    })

//Function: updateData()

function  updateData() {
    //start_date = 2015-09-07
    //end_date = 2015-09-08
    //api_key = DU54yM4HzM38LRKBOLaIi9wtP8tuzJNZvftn0zbi
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${DU54yM4HzM38LRKBOLaIi9wtP8tuzJNZvftn0zbi}`
    
    fetch(url)
    .then(response => response.json)
    .then(json => setDataContract(json.element_count))
}

// Function: setDataContrac(_value)
function setDataContract(_value) {
    web3.eth.getTransactionCount(address, (err, txNum) => {
        contractInstance.methods.setNumberAsteroids(_value

            .estimateGas({}, (err, gasAmount) => {

                let rawTX = {
                    nonce: web3.utils.toHex(txNum),
                    gasPrice: web3.utils.toHex(web3.utils.toWei('1.4', 'gwei')),
                    gasLimit: web3.utils.toHex(gasAmount),
                    to: addressContract,
                    value: '0x00',
                    data: contractInstance.methods.setNumberAsteroids(_value).encodeABI()}

                    const tx = new Tx(rawTX); 
                    tx.sign(privateKey);
                    const serializedTx = tx.serialize().toString('hex');
                    web3.eth.sendSignedTransaction('0x' + serializedTx); 
            }
        ))
    })
}


}