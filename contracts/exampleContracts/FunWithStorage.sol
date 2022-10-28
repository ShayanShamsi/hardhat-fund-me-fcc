// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract FunWithStorage {
    uint256 favoriteNumber; // stored at slot 0
    bool someBool; // stored at slot 1
    uint256[] myArray; // Array length stored at slot; Array elements stored at keccak256(2)
    mapping(uint256 => bool) myMap; // Empty slot at 3; elements stored at keccak256(h(k).p); p: storage slot; k: key in hex;
    // h: function based on type, for uint256 it just pads the hex
    uint256 constant NOT_IN_STORAGE = 123;
    uint256 immutable i_not_in_storage;

    constructor() {
        favoriteNumber = 25;
        someBool = true;
        myArray.push(222);
        myMap[0] = true;
        i_not_in_storage = 123;
    }

    function doStuff() public {
        uint256 newVar = favoriteNumber + 1;
        bool otherVar = someBool;
        // ^^ memory variables
    }
}
