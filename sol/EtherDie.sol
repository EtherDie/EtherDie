pragma solidity ^0.5.11;

// https://docs.provable.xyz/#ethereum-quick-start
import "https://raw.githubusercontent.com/provable-things/ethereum-api/master/provableAPI_0.5.sol";

contract EtherDie is usingProvable {
    address payable owner;
    mapping (bytes32 => address payable) public queryToAddress;
    mapping (address => Transaction) public addressToTx;
    struct Transaction {
        bool hasWon;
        uint amount;
        uint time;
    }

    event Callback(bytes32, uint, address, uint);

    constructor() public payable {
        owner = msg.sender;
        provable_setProof(proofType_Android | proofStorage_IPFS);
    }

    function () external payable {}

    function __callback(bytes32 _queryId, string memory _result, bytes memory _proof) public {
        if (msg.sender != provable_cbAddress()) revert();
        uint randomNum = parseInt(_result);
        address payable userAddress = queryToAddress[_queryId];
        uint userAmount = addressToTx[userAddress].amount;
        emit Callback(_queryId, randomNum, userAddress, userAmount);
        isWinner(randomNum, userAddress, userAmount);
    }

    function isWinner(uint _randomNum, address payable _userAddress, uint _userAmount) private {
        uint prize = _userAmount * 125/100;
        addressToTx[_userAddress].time = now;
        if (_randomNum < 70) {
            addressToTx[_userAddress].hasWon = true;
            _userAddress.transfer(prize);
        } else {
            addressToTx[_userAddress].hasWon = false;
        }
    }

    function send() public payable {
        require(msg.value <= 5 ether && msg.value < address(this).balance * 10 / 100, "sending too much");
        addressToTx[msg.sender].amount = msg.value;
        bytes32 queryId = provable_query("WolframAlpha", "random number between 0 and 99");
        queryToAddress[queryId] = msg.sender;
    }

    function withdraw(uint256 _wei) public payable {
        require(owner == msg.sender,  "cannot withdraw");
        owner.transfer(_wei);
    }

}
