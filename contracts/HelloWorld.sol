//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Hello {
    string public message;
    constructor(string memory initMessage) {
        message = initMessage;
    }
    function update(string memory newMessage) public {
        message = newMessage;
    }
}