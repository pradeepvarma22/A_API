// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract DDB is Ownable{
    
    mapping (address => bool) public users;  
    event UserAdded(address indexed user);
    event UserAPI(address indexed user, uint256 cost,uint256 expired);
    mapping(address => uint256) private balances;
    mapping(address => uint256) private timestamp;  // time

    constructor() Ownable() {

    }

    function setApi() public payable{
        require(users[msg.sender],"Please Login" );
        require(msg.value > 0.00001 ether, "Insufficent amount");
        require(timestamp[msg.sender] < block.timestamp,"API Exists");
        balances[msg.sender] = msg.value;
        timestamp[msg.sender] = block.timestamp + 7 days;
        emit UserAPI(msg.sender,msg.value,block.timestamp + 7 days);
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
        emit UserAdded(msg.sender);
    }

    function withdraw() public {

        require(msg.sender == owner(), "You aren't the owner");

        payable(owner()).transfer(address(this).balance);
    }

    function getTimeStamp() public view returns(uint256)
    {
        return block.timestamp;
    }

}