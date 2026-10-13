const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying InkGhost with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Fee recipient = deployer for now (you can change later)
  const feeRecipient = deployer.address;

  const InkGhost = await hre.ethers.getContractFactory("InkGhost");
  const weth = "0x4200000000000000000000000000000000000006";
  const swapRouter = "0xdb77dBaa45ABAbD9e2fA461d525f21ec5E810472";
  const swapFactory = "0xdb77dBaa45ABAbD9e2fA461d525f21ec5E810472"; // Mock router doubles as factory on testnet
  const inkGhost = await InkGhost.deploy(feeRecipient, weth, swapRouter, swapFactory);
  await inkGhost.waitForDeployment();

  const address = await inkGhost.getAddress();
  console.log("\n✅ InkGhost deployed to:", address);
  console.log("   Fee recipient:", feeRecipient);
  console.log("   Fee: 0.5%");
  console.log("   Network:", hre.network.name);

  // Print verification command
  if (hre.network.name !== "hardhat") {
    console.log("\n📋 To verify on explorer:");
    console.log(`   npx hardhat verify --network ${hre.network.name} ${address} "${feeRecipient}"`);
  }

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    contract: "InkGhost",
    address: address,
    feeRecipient: feeRecipient,
    deployer: deployer.address,
    network: hre.network.name,
    chainId: (await hre.ethers.provider.getNetwork()).chainId.toString(),
    timestamp: new Date().toISOString(),
  };

  const dir = "./deployments";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(
    `${dir}/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log(`\n💾 Deployment info saved to deployments/${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
