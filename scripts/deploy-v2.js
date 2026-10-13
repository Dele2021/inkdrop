const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH\n");

  const WETH = "0x4200000000000000000000000000000000000006";

  console.log("Deploying MockERC20 (USDC)...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const usdc = await MockERC20.deploy("Mock USDC", "USDC", 6);
  await usdc.waitForDeployment();
  const usdcAddr = await usdc.getAddress();
  console.log("  Mock USDC:", usdcAddr);

  console.log("Deploying MockVelodromeRouter...");
  const MockRouter = await hre.ethers.getContractFactory("MockVelodromeRouter");
  const router = await MockRouter.deploy();
  await router.waitForDeployment();
  const routerAddr = await router.getAddress();
  console.log("  Mock Router:", routerAddr);

  const SEED_AMOUNT = hre.ethers.parseUnits("10000000", 6);
  const seedTx = await usdc.mint(routerAddr, SEED_AMOUNT);
  await seedTx.wait();
  console.log("  Minted 10M mock USDC to router");

  console.log("Deploying InkGhost...");
  const InkGhost = await hre.ethers.getContractFactory("InkGhost");
  const ghost = await InkGhost.deploy(
    deployer.address,
    WETH,
    routerAddr,
    routerAddr
  );
  await ghost.waitForDeployment();
  const ghostAddr = await ghost.getAddress();
  console.log("  InkGhost:", ghostAddr);

  const testMint = await usdc.mint(
    deployer.address,
    hre.ethers.parseUnits("100000", 6)
  );
  await testMint.wait();
  console.log("  Minted 100k mock USDC to deployer\n");

  console.log("===============================================");
  console.log("  UPDATE YOUR .env.local WITH THESE VALUES:");
  console.log("===============================================");
  console.log("NEXT_PUBLIC_CONTRACT_ADDRESS=" + ghostAddr);
  console.log("NEXT_PUBLIC_MOCK_USDC_ADDRESS=" + usdcAddr);
  console.log("NEXT_PUBLIC_SWAP_ROUTER=" + routerAddr);
  console.log("NEXT_PUBLIC_WETH_ADDRESS=" + WETH);
  console.log("===============================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
