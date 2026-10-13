const hre = require("hardhat");

/**
 * Deploys InkGhost + a mock USDC token to Ink Sepolia testnet.
 * The mock USDC lets us test without real tokens.
 */
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying to Ink Sepolia with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // 1. Deploy Mock USDC
  console.log("Step 1: Deploying Mock USDC...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const mockUSDC = await MockERC20.deploy("USD Coin", "USDC", 6);
  await mockUSDC.waitForDeployment();
  const usdcAddress = await mockUSDC.getAddress();
  console.log("   Mock USDC deployed to:", usdcAddress);

  // 2. Deploy InkGhost
  console.log("\nStep 2: Deploying InkGhost...");
  const InkGhost = await hre.ethers.getContractFactory("InkGhost");
  const inkGhost = await InkGhost.deploy(deployer.address);
  await inkGhost.waitForDeployment();
  const ghostAddress = await inkGhost.getAddress();
  console.log("   InkGhost deployed to:", ghostAddress);

  // 3. Mint some test USDC to deployer
  console.log("\nStep 3: Minting 10,000 test USDC to deployer...");
  const mintAmount = hre.ethers.parseUnits("10000", 6);
  await mockUSDC.mint(deployer.address, mintAmount);
  console.log("   Minted 10,000 USDC to", deployer.address);

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("✅ DEPLOYMENT COMPLETE");
  console.log("=".repeat(50));
  console.log("\nAdd these to your .env file:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${ghostAddress}`);
  console.log(`\nAnd update src/lib/config.js testnet USDC address:`);
  console.log(`USDC address: ${usdcAddress}`);
  console.log("\nExplorer links:");
  console.log(`InkGhost: https://explorer-sepolia.inkonchain.com/address/${ghostAddress}`);
  console.log(`Mock USDC: https://explorer-sepolia.inkonchain.com/address/${usdcAddress}`);

  // Save deployment info
  const fs = require("fs");
  const dir = "./deployments";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(
    `${dir}/inkSepolia.json`,
    JSON.stringify(
      {
        network: "inkSepolia",
        chainId: 763373,
        inkGhost: ghostAddress,
        mockUSDC: usdcAddress,
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
