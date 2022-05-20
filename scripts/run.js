const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("wizard");
  await domainContract.deployed();
  console.log("contract deployed to:", domainContract.address);
  console.log("contract deployed by:", owner.address);

  let txn = await domainContract.register("mihir", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  let domainOwner = await domainContract.getAddress("mihir");
  console.log("Owner of domain wizard: ", domainOwner);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  //   txn = await domainContract
  //     .connect(owner)
  //     .setRecord("mihir", "email", "mihirlaldas@gmail.com");
  //   await txn.wait();

  //   txn = await domainContract
  //     .connect(owner)
  //     .setRecord("mihir", "github", "https://github.com/mihirlaldas");
  //   await txn.wait();

  //   console.log("email :", await domainContract.getRecord("email"));
  //   console.log("github :", await domainContract.getRecord("github"));

  //   // another domain - proxy

  //   txn = await domainContract.register("proxy");
  //   await txn.wait();
  //   domainOwner = await domainContract.getAddress("proxy");
  //   console.log("Owner of domain: ", domainOwner);

  //   txn = await domainContract
  //     .connect(owner)
  //     .setRecord("proxy", "email", "proxy@gmail.com");
  //   await txn.wait();
  //   console.log("email :", await domainContract.getRecord("email"));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
