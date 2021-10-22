const Hack = artifacts.require('Hack');

const { time, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

describe('Hack', async function () {
  beforeEach(async () => {
    // Using fixture from hardhat-deploy
    await deployments.fixture(['hack']);
    let deployment = await deployments.get('Hack');
    this.hack = await Hack.at(deployment.address);
  });

  it('test hack', async () => {
    let ball = [
      '0x504354460008003001000000000401db00240301cd000e0201cb00020401a900',
      '0x220300fb01040400000000040000000004000000000400000000040000000004',
      '0x0000000004000000000400000000040000000004000000000400000000040000',
      '0x0000040000000004000000000400000000040000000004000000000400000000',
      '0x0400000000040000000004000000000400000000040000000004000000000400',
      '0x0000000400000000040000000004000000000400000000040000000004000000',
      '0x0004000000000400000000040000000004000000000400000000040000000004',
      '0x0000000004000000000400000000040000000004000000000000005040706000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000001010101010101010101010101010101010101010101',
      '0x0101010101010101010101010101010101010101010101010101010101010101',
      '0x0101010101010101010101010101010101010101010101010101010101010101',
      '0x0101010101010101010101010101010101010101010101010101010101010101',
      '0x010101010101010101f00fc7c8000100000100000300000700000d0000610000',
      '0xf10002a1000004000083004c08010203046565656565656565656500e100ff38',
      '0xc56aa967695c50a998b7337e260fb29881ec07e0a0058ad892dcd973c016dc00',
    ];

    let ballBytes = ball.reduce((previous, next) => {
      return previous + next.slice(2);
    }, '0x');

    // make the commitment
    await this.hack.insertCoins(web3.utils.keccak256(ballBytes));

    for (let i = 0; i < 4; i++) {
      await time.advanceBlock();
    }

    // do hack
    let tx = await this.hack.hack(ballBytes);
    // let log = expectEvent(tx, '')

    // print current best submission
    let best = await this.hack.getBestSubmission();

    let blockNumber = best[1].toNumber();

    console.log('who: ', best[0]);
    console.log('score: ', best[2].toNumber());
  });
});
