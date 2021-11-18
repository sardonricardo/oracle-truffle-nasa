//https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 


//Create de contract

contract Oracle {
    
    //owner address. The only one with the permissions to do some functions. 
    address owner;
    //Number of asteroids 
    uint public numberAsteroids;
    //Event that recieves oracles' data
    event __callbackNewData(); 
    //constructor
    constructor () public {
        owner = msg.sender; 
    }
    //Function's execution restriction 
    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner'); 
        _; 
    }
    //Function that receives oracles' data
    function update() public onlyOwner {
        emit __callbackNewData(); 
    }
    //number of asteroids manual configuration function
    function setNumberAsteroids(uint _num) public onlyOwner {
        numberAsteroids = _num; 
    }
    
}