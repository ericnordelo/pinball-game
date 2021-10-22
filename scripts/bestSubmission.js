const Hack = artifacts.require('Hack');

async function main() {
  let deployment = await deployments.get('Hack');
  let hack = await Hack.at(deployment.address);

  // print current best submission
  let best = await hack.getBestSubmission();

  let blockNumber = best[1].toNumber();
  let time = (await web3.eth.getBlock(blockNumber)).timestamp;

  console.log('who: ', best[0]);
  console.log('time: ', new Date(time * 1000));
  console.log('score: ', best[2].toNumber());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
