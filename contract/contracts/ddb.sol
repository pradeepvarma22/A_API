// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract DDB is Ownable{
    
    mapping (address => bool) public users;  
    event Withdrawal(uint amount, uint when);
    mapping(address => uint256) private balances;
    mapping(address => uint256) private timestamp;  // time

    constructor() Ownable() {

    }

    function setApi() public payable{
        require(users[msg.sender],"Please Login" );
        require(msg.value > 0.00001 ether, "Insufficent amount");

        balances[msg.sender] = msg.value;
        timestamp[msg.sender] = block.timestamp + 7 days;
    }

    // central save it to central db
    function getApiStatus() public view returns(bool)
    {
        return (block.timestamp >  timestamp[msg.sender]);
    }
    
    // if user present no need to call
    function setUser() external{
        require(users[msg.sender]==false,"Already present");
        users[msg.sender] = true;
    }

    function withdraw() public {

        require(msg.sender == owner(), "You aren't the owner");

        payable(owner()).transfer(address(this).balance);
    }
}
