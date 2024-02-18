import { ethers } from "hardhat";

async function main() {
  const aaveLendingPoolAddress = "0x48914C788295b5db23aF2b5F0B3BE775C4eA9440";
  const ufiAddress = "0xa4Ffa1288d46Baf69745A9bF971B899024026d9D";

  const UFiContract = await ethers.getContractFactory("UFi");

  const ufiContract = await UFiContract.deploy(aaveLendingPoolAddress, ufiAddress);

  await ufiContract.waitForDeployment();

  console.log(`UFi deployed to: ${await ufiContract.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
