const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InkGhost", function () {
  let inkGhost;
  let mockUSDC;
  let owner, seller, buyer, feeRecipient;
  const USDC_DECIMALS = 6;
  const ONE_USDC = ethers.parseUnits("1", USDC_DECIMALS);
  const HUNDRED_USDC = ethers.parseUnits("100", USDC_DECIMALS);
  const THOUSAND_USDC = ethers.parseUnits("1000", USDC_DECIMALS);

  beforeEach(async function () {
    [owner, seller, buyer, feeRecipient] = await ethers.getSigners();

    // Deploy mock USDC
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockUSDC = await MockERC20.deploy("USD Coin", "USDC", USDC_DECIMALS);
    await mockUSDC.waitForDeployment();

    // Deploy InkGhost
    const InkGhost = await ethers.getContractFactory("InkGhost");
    inkGhost = await InkGhost.deploy(feeRecipient.address);
    await inkGhost.waitForDeployment();

    // Mint USDC to buyer
    await mockUSDC.mint(buyer.address, THOUSAND_USDC);
    // Approve InkGhost to spend buyer's USDC
    await mockUSDC.connect(buyer).approve(await inkGhost.getAddress(), THOUSAND_USDC);
  });

  // ─────────────────── Link Creation ───────────────────

  describe("Link Creation", function () {
    it("should create a fixed-amount payment link", async function () {
      const tx = await inkGhost.connect(seller).createLink(
        HUNDRED_USDC,
        await mockUSDC.getAddress(),
        "Freelance Invoice",
        "Web design for October",
        ""
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      expect(event).to.not.be.undefined;

      const linkId = event.args[0];
      const link = await inkGhost.getLink(linkId);

      expect(link.seller).to.equal(seller.address);
      expect(link.amount).to.equal(HUNDRED_USDC);
      expect(link.title).to.equal("Freelance Invoice");
      expect(link.active).to.be.true;
    });

    it("should create an open-amount payment link (amount = 0)", async function () {
      const tx = await inkGhost.connect(seller).createLink(
        0, // open amount
        await mockUSDC.getAddress(),
        "Tip Jar",
        "Send me a tip!",
        "https://example.com/logo.png"
      );

      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      const linkId = event.args[0];
      const link = await inkGhost.getLink(linkId);

      expect(link.amount).to.equal(0);
      expect(link.imageURI).to.equal("https://example.com/logo.png");
    });

    it("should reject empty title", async function () {
      await expect(
        inkGhost.connect(seller).createLink(
          HUNDRED_USDC,
          await mockUSDC.getAddress(),
          "",
          "desc",
          ""
        )
      ).to.be.revertedWith("InkGhost: empty title");
    });

    it("should reject zero token address", async function () {
      await expect(
        inkGhost.connect(seller).createLink(
          HUNDRED_USDC,
          ethers.ZeroAddress,
          "Test",
          "desc",
          ""
        )
      ).to.be.revertedWith("InkGhost: zero token");
    });

    it("should track seller links", async function () {
      await inkGhost.connect(seller).createLink(
        ONE_USDC, await mockUSDC.getAddress(), "Link 1", "", ""
      );
      await inkGhost.connect(seller).createLink(
        ONE_USDC, await mockUSDC.getAddress(), "Link 2", "", ""
      );

      const sellerLinkIds = await inkGhost.getSellerLinks(seller.address);
      expect(sellerLinkIds.length).to.equal(2);
    });
  });

  // ─────────────────── Payments ───────────────────

  describe("Payments", function () {
    let linkId;

    beforeEach(async function () {
      const tx = await inkGhost.connect(seller).createLink(
        HUNDRED_USDC,
        await mockUSDC.getAddress(),
        "Invoice #001",
        "Payment for services",
        ""
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      linkId = event.args[0];
    });

    it("should accept payment and deduct 0.5% fee", async function () {
      await inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC);

      // 0.5% of 100 USDC = 0.5 USDC
      const expectedFee = ethers.parseUnits("0.5", USDC_DECIMALS);
      const expectedSeller = HUNDRED_USDC - expectedFee;

      const sellerBalance = await inkGhost.balances(
        seller.address,
        await mockUSDC.getAddress()
      );
      expect(sellerBalance).to.equal(expectedSeller);

      const protocolFee = await inkGhost.feeBalances(await mockUSDC.getAddress());
      expect(protocolFee).to.equal(expectedFee);
    });

    it("should record payment details", async function () {
      await inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC);

      const payments = await inkGhost.getLinkPayments(linkId);
      expect(payments.length).to.equal(1);
      expect(payments[0].buyer).to.equal(buyer.address);
      expect(payments[0].amount).to.equal(HUNDRED_USDC);

      const link = await inkGhost.getLink(linkId);
      expect(link.paymentCount).to.equal(1);
    });

    it("should reject wrong amount for fixed link", async function () {
      const wrongAmount = ethers.parseUnits("50", USDC_DECIMALS);
      await expect(
        inkGhost.connect(buyer).pay(linkId, wrongAmount)
      ).to.be.revertedWith("InkGhost: wrong amount");
    });

    it("should reject payment to inactive link", async function () {
      await inkGhost.connect(seller).toggleLink(linkId);
      await expect(
        inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC)
      ).to.be.revertedWith("InkGhost: link inactive");
    });

    it("should accept any positive amount for open link", async function () {
      // Create open-amount link
      const tx = await inkGhost.connect(seller).createLink(
        0, await mockUSDC.getAddress(), "Tip Jar", "", ""
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      const openLinkId = event.args[0];

      // Pay any amount
      const tipAmount = ethers.parseUnits("25", USDC_DECIMALS);
      await inkGhost.connect(buyer).pay(openLinkId, tipAmount);

      const link = await inkGhost.getLink(openLinkId);
      expect(link.paymentCount).to.equal(1);
    });

    it("should handle multiple payments to same link", async function () {
      // Mint more USDC for buyer
      await mockUSDC.mint(buyer.address, THOUSAND_USDC);
      await mockUSDC.connect(buyer).approve(await inkGhost.getAddress(), THOUSAND_USDC);

      await inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC);
      await inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC);

      const link = await inkGhost.getLink(linkId);
      expect(link.paymentCount).to.equal(2);
    });
  });

  // ─────────────────── Withdrawals ───────────────────

  describe("Withdrawals", function () {
    let linkId;

    beforeEach(async function () {
      const tx = await inkGhost.connect(seller).createLink(
        HUNDRED_USDC,
        await mockUSDC.getAddress(),
        "Invoice",
        "",
        ""
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      linkId = event.args[0];

      // Buyer makes a payment
      await inkGhost.connect(buyer).pay(linkId, HUNDRED_USDC);
    });

    it("should let seller withdraw their balance", async function () {
      const expectedAmount = HUNDRED_USDC - (HUNDRED_USDC * 50n / 10000n);
      const balanceBefore = await mockUSDC.balanceOf(seller.address);

      await inkGhost.connect(seller).withdraw(await mockUSDC.getAddress());

      const balanceAfter = await mockUSDC.balanceOf(seller.address);
      expect(balanceAfter - balanceBefore).to.equal(expectedAmount);

      // Balance in contract should be 0
      const contractBalance = await inkGhost.balances(
        seller.address,
        await mockUSDC.getAddress()
      );
      expect(contractBalance).to.equal(0);
    });

    it("should reject withdrawal with zero balance", async function () {
      // Seller withdraws once
      await inkGhost.connect(seller).withdraw(await mockUSDC.getAddress());

      // Try again
      await expect(
        inkGhost.connect(seller).withdraw(await mockUSDC.getAddress())
      ).to.be.revertedWith("InkGhost: nothing to withdraw");
    });

    it("should let owner withdraw protocol fees", async function () {
      const expectedFee = HUNDRED_USDC * 50n / 10000n;
      const balanceBefore = await mockUSDC.balanceOf(feeRecipient.address);

      await inkGhost.connect(owner).withdrawFees(await mockUSDC.getAddress());

      const balanceAfter = await mockUSDC.balanceOf(feeRecipient.address);
      expect(balanceAfter - balanceBefore).to.equal(expectedFee);
    });
  });

  // ─────────────────── Admin ───────────────────

  describe("Admin", function () {
    it("should let owner update fee", async function () {
      await inkGhost.connect(owner).setFeeBps(100); // 1%
      expect(await inkGhost.feeBps()).to.equal(100);
    });

    it("should reject fee above max", async function () {
      await expect(
        inkGhost.connect(owner).setFeeBps(600) // 6% > 5% cap
      ).to.be.revertedWith("InkGhost: fee too high");
    });

    it("should reject non-owner admin calls", async function () {
      await expect(
        inkGhost.connect(seller).setFeeBps(100)
      ).to.be.revertedWith("InkGhost: not owner");
    });

    it("should let owner transfer ownership", async function () {
      await inkGhost.connect(owner).transferOwnership(seller.address);
      expect(await inkGhost.owner()).to.equal(seller.address);
    });
  });

  // ─────────────────── Toggle Link ───────────────────

  describe("Toggle Link", function () {
    it("should toggle link active state", async function () {
      const tx = await inkGhost.connect(seller).createLink(
        ONE_USDC, await mockUSDC.getAddress(), "Test", "", ""
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      const linkId = event.args[0];

      // Should be active
      let link = await inkGhost.getLink(linkId);
      expect(link.active).to.be.true;

      // Toggle off
      await inkGhost.connect(seller).toggleLink(linkId);
      link = await inkGhost.getLink(linkId);
      expect(link.active).to.be.false;

      // Toggle back on
      await inkGhost.connect(seller).toggleLink(linkId);
      link = await inkGhost.getLink(linkId);
      expect(link.active).to.be.true;
    });

    it("should reject toggle from non-seller", async function () {
      const tx = await inkGhost.connect(seller).createLink(
        ONE_USDC, await mockUSDC.getAddress(), "Test", "", ""
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "LinkCreated"
      );
      const linkId = event.args[0];

      await expect(
        inkGhost.connect(buyer).toggleLink(linkId)
      ).to.be.revertedWith("InkGhost: not your link");
    });
  });
});
