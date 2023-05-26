// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
// forge create  --rpc-url  https://rpc.testnet.mantle.xyz    --private-key <>  src/dexLend.sol:DexLending
// Deployed to: 0x867dB100F166853194c4e93cA40d512f303694c3
// Transaction hash: 0x7c68e545f158bcf9d8665f510762d8266c3996a3d04833eb901be87641612686

//usdc Faucet
// Deployed to: 0xDca630441b097813f16ef7626Ed821610aEb9747
// Transaction hash: 0x328dea3bf0f2feee7d5391ef68269cc21662c6a97c96600f2dc2d8a5c54e1d7b

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
