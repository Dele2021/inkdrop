import { describe, it, expect } from "vitest";
import {
  shortenAddress,
  formatTokenAmount,
  parseTokenAmount,
  formatDate,
  getPayUrl,
} from "../lib/utils";

describe("shortenAddress", () => {
  it("shortens a valid address", () => {
    expect(shortenAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe(
      "0x1234...5678"
    );
  });

  it("returns empty string for falsy input", () => {
    expect(shortenAddress(null)).toBe("");
    expect(shortenAddress("")).toBe("");
    expect(shortenAddress(undefined)).toBe("");
  });
});

describe("formatTokenAmount", () => {
  it("formats USDC amounts (6 decimals)", () => {
    expect(formatTokenAmount(1000000n, 6)).toBe("1.00");
    expect(formatTokenAmount(1500000n, 6)).toBe("1.50");
    expect(formatTokenAmount(100n, 6)).toBe("0.00");
  });

  it("formats with custom display decimals", () => {
    expect(formatTokenAmount(1234567n, 6, 4)).toBe("1.2346");
  });

  it("returns 0.00 for falsy input", () => {
    expect(formatTokenAmount(0n)).toBe("0.00");
    expect(formatTokenAmount(null)).toBe("0.00");
    expect(formatTokenAmount(undefined)).toBe("0.00");
  });
});

describe("parseTokenAmount", () => {
  it("parses whole numbers", () => {
    expect(parseTokenAmount("100", 6)).toBe(100000000n);
    expect(parseTokenAmount("1", 6)).toBe(1000000n);
  });

  it("parses decimal amounts", () => {
    expect(parseTokenAmount("1.50", 6)).toBe(1500000n);
    expect(parseTokenAmount("0.01", 6)).toBe(10000n);
  });

  it("handles precision edge cases", () => {
    expect(parseTokenAmount("1.1", 6)).toBe(1100000n);
    expect(parseTokenAmount("99.99", 6)).toBe(99990000n);
  });

  it("truncates excess decimals", () => {
    expect(parseTokenAmount("1.1234567", 6)).toBe(1123456n);
  });
});

describe("formatDate", () => {
  it("formats a unix timestamp", () => {
    const result = formatDate(1704067200n);
    expect(result).toContain("2024");
    expect(result).toContain("Jan");
  });

  it("returns empty string for falsy input", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(0)).toBe("");
  });
});

describe("getPayUrl", () => {
  it("generates a pay URL with link ID", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://inkghost.app";
    const url = getPayUrl(42);
    expect(url).toBe("https://inkghost.app/pay/42");
  });
});
