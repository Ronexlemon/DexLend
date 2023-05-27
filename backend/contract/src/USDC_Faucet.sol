//SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH IS NOT AUDITED
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract USDCFaucet is ERC20 {
    uint time_toMintNext = 14400;
    mapping(address => uint) public timeWaitToMint;

    constructor() ERC20("USDC", "USDC") {}

    function mintTokens(address user, uint amount) public {
        //require(amount <= (1000 * 10 ** 18), "can only mint 1000");
        // require(timeWaitToMint[user] < block.timestamp, "need to wait");
        // timeWaitToMint[user] = block.timestamp + time_toMintNext;

        _mint(user, amount);
    }

    function returnTime(address user) public view returns (uint) {
        if (timeWaitToMint[user] > block.timestamp) {
            return timeWaitToMint[user];
        } else {
            return 0;
        }
    }
}
