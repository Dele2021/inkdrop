const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("Owner:", owner.address);

  const contract = await hre.ethers.getContractAt(
    ["function setFeeBps(uint256 _feeBps) external", "function feeBps() view returns (uint256)"],
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x56C420ECFD7A08c480048153A7BA5B0eccf6f32a"
  );

  const currentFee = await contract.feeBps();
  console.log("Current fee:", currentFee.toString(), "bps (" + (Number(currentFee) / 100) + "%)");

  const tx = await contract.setFeeBps(100); // 100 bps = 1%
  await tx.wait();

  const newFee = await contract.feeBps();
  console.log("New fee:", newFee.toString(), "bps (" + (Number(newFee) / 100) + "%)");
  console.log("Done! Fee is now 1%");
}

main().catch(console.error);
