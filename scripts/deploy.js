const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("wizard");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("mihir", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log(" Minted domain mihir.wizard");

  txn = await domainContract.setRecord(
    "mihir",
    "email",
    "mihirlaldas@gmail.com"
  );
  await txn.wait();
  console.log("Set email record for mihir.wizard");

  const address = await domainContract.getAddress("mihir");
  console.log("Owner of domain mihir:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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
