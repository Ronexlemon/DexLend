// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
// forge create  --rpc-url  https://rpc.testnet.mantle.xyz    --private-key <>  src/dexLend.sol:DexLending
// Deployed to: 0x867dB100F166853194c4e93cA40d512f303694c3
// Transaction hash: 0x7c68e545f158bcf9d8665f510762d8266c3996a3d04833eb901be87641612686

//usdc Faucet
// Deployed to: 0xC75328d514e79fb263A7991369c951717E113e37
// Transaction hash: 0x12fa69ddf927eb11db5f2cbc04144cc977d4e787a167f9845c6db7a1263f0d2e

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
