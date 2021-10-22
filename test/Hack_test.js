const Hack = artifacts.require('Hack');

const { time, expectEvent } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

describe('Hack', async function () {
  beforeEach(async () => {
    // Using fixture from hardhat-deploy
    await deployments.fixture(['hack']);
    let deployment = await deployments.get('Hack');
    this.hack = await Hack.at(deployment.address);

    let rands = await this.hack.getRandNumbers();
    rands = rands.map((x) => x.toNumber() % 100);

    // console.log(rands);
  });

  it('test hack', async () => {
    let ball = [
      // specs
      '50435446 0008 0030',

      // commands (offset 8)
      '0100000000 0401dc0000 0301ce000e 0201cb0002 0401a90022',
      '0300fb0104 0401280000 0201cb0002 0400000000 0400000000 0400000000 0400000000',
      '0400000000 0400000000 0400000000 0400000000 0400000000 0400000000',
      '0400000000 0400000000 0400000000 0400000000 0400000000 0400000000 ',
      '0400000000 0400000000 0400000000 0400000000 0400000000 0400000000 0400000000',
      '0400000000 0400000000 0400000000 0400000000 0400000000 0400000000',
      '0400000000 0400000000 0400000000 0400000000 0400000000 0400000000 0400000000',
      '0400000000 0400000000 0400000000 0400000000',

      // data (offset 248)
      '00000050 40706000',
      '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000', // (offset 256)

      // 288       292      296      300      304     308      312       316
      '00000000 00000001 00e100ff 8f038627 eb6f3ada ddcfcb0c 86b53e4e 175b1d16', // (offset 288)
      'ede66530 6e59d975 2c7b2767 01010101 01010101 01010101 01010101 01010101', // (offset 320)
      '01010101 01010101 01010101 01010101 01010101 01010101 01010101 01010101', // (offset 352)
      '01010101 01010101 01010101 01010101 01010101 01010101 01010101 01010101', // (offset 384)

      // 416      420       424      428      432      436
      '01010101 01010101 01f00fc7 c8000100 00010000 03000007 00000d00 00610000', // (offset 416)

      // 448       452      456      460      464     468      472       476
      'f10002a1 00000400 00830049 08000102 03046565 65656565 65656565 00e100ff', // (offset 448)
      '38c56aa9 67695c50 a998b733 7e260fb2 9881ec07 e0a0058a d892dcd9 73c016dc', // (offset 480)
    ];

    let ballBytes = ball.reduce((previous, next) => {
      return previous + next.replace(/\s/g, '');
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

    console.log('who: ', best[0]);
    console.log('score: ', best[2].toNumber());
  });
});
