import { ethers } from "hardhat";

async function main() {

  const contractFactory = await ethers.getContractFactory("DDB");
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log('ddb contract address: ',contract.address);
  console.log(`yarn hardhat --network mumbai verify ${contract.address}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
