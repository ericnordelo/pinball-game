// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Pinball.sol";

contract Hack is Ownable {
    uint256 public insertedCoinsBlockNumber;
    Pinball private pinball = Pinball(0xfFb9205C84d0B209c215212a3CDfc50bf1Cfb0E0);

    function insertCoins(bytes32 commitment) external {
        insertedCoinsBlockNumber = block.number;
        pinball.insertCoins(commitment);
    }

    function hack(bytes memory ball) external onlyOwner {
        require(insertedCoinsBlockNumber != 0, "Insert coins first");

        // hack pinball
        pinball.play(ball, insertedCoinsBlockNumber);

        insertedCoinsBlockNumber = 0;
    }

    function setPinball(address pinball_) external onlyOwner {
        pinball = Pinball(pinball_);
    }

    function getBestSubmission()
        external
        view
        onlyOwner
        returns (
            address,
            uint256,
            uint256
        )
    {
        return pinball.bestSubmission();
    }
}
