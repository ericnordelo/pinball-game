module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Hack', {
    from: deployer,
    log: true,
    args: [],
  });

  if (network.tags.local) {
    let pinball = await deploy('Pinball', {
      from: deployer,
      log: true,
      args: [],
    });

    let hack = await ethers.getContract('Hack');
    await hack.setPinball(pinball.address);
  }
};

module.exports.tags = ['hack'];
