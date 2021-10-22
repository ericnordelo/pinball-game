const Hack = artifacts.require('Hack');

async function main() {
  let deployment = await deployments.get('Hack');
  let hack = await Hack.at(deployment.address);
  console.log(hack.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
