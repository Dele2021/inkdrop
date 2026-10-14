const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying InkDrop to Ink Mainnet with account:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const feeRecipient = hre.ethers.getAddress(deployer.address);
  const weth = hre.ethers.getAddress("0x4200000000000000000000000000000000000006");
  const router = hre.ethers.getAddress("0x3a63171DD9BebF4D07BC782FECC7eb0b890C2A45");
  const factory = hre.ethers.getAddress("0x31832f2a97Fd20664D76Cc421207669b55CE4BC0");

  console.log("\nAddresses:");
  console.log("  Fee Recipient:", feeRecipient);
  console.log("  WETH:", weth);
  console.log("  Router:", router);
  console.log("  Factory:", factory);

  const InkGhost = await hre.ethers.getContractFactory("InkGhost");
  console.log("\nDeploying InkGhost contract...");
  const inkGhost = await InkGhost.deploy(feeRecipient, weth, router, factory);
  await inkGhost.waitForDeployment();
  const addr = await inkGhost.getAddress();

  console.log("\nSetting feeBps to 100 (1%)...");
  let tx = await inkGhost.setFeeBps(100);
  await tx.wait();
  console.log("feeBps set");

  console.log("Setting swapSpreadBps to 30 (0.3%)...");
  tx = await inkGhost.setSwapSpreadBps(30);
  await tx.wait();
  console.log("swapSpreadBps set");

  console.log("\n==================================================");
  console.log("DEPLOYMENT COMPLETE");
  console.log("==================================================");
  console.log("\nNEXT_PUBLIC_CONTRACT_ADDRESS=" + addr);
  console.log("NEXT_PUBLIC_SWAP_ROUTER=" + router);
  console.log("NEXT_PUBLIC_WETH_ADDRESS=" + weth);
  console.log("NEXT_PUBLIC_NETWORK=mainnet");
  console.log("\nhttps://explorer.inkonchain.com/address/" + addr);

  const fs = require("fs");
  const dir = "./deployments";
  if (fs.existsSync(dir) === false) fs.mkdirSync(dir);
  fs.writeFileSync(dir + "/ink.json", JSON.stringify({
    network: "ink", chainId: 57073, inkGhost: addr,
    deployer: deployer.address, timestamp: new Date().toISOString()
  }, null, 2));
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
