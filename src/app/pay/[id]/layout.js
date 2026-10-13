import { createPublicClient, http } from "viem";

const inkChain = {
  id: process.env.NEXT_PUBLIC_NETWORK === "testnet" ? 763373 : 57073,
  name: "Ink",
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_NETWORK === "testnet"
          ? "https://rpc-gel-sepolia.inkonchain.com"
          : "https://rpc-gel.inkonchain.com",
      ],
    },
  },
};

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const GET_LINK_ABI = [
  {
    inputs: [{ name: "linkId", type: "uint256" }],
    name: "getLink",
    outputs: [
      {
        components: [
          { name: "seller", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "token", type: "address" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "metadata", type: "string" },
          { name: "active", type: "bool" },
          { name: "paymentCount", type: "uint256" },
          { name: "createdAt", type: "uint256" },
        ],
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export async function generateMetadata({ params }) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const client = createPublicClient({
      chain: inkChain,
      transport: http(),
    });

    const link = await client.readContract({
      address: CONTRACT_ADDRESS,
      abi: GET_LINK_ABI,
      functionName: "getLink",
      args: [BigInt(id)],
    });

    const amount =
      link.amount > 0n
        ? `$${(Number(link.amount) / 1e6).toFixed(2)}`
        : "Flexible amount";

    return {
      title: `Pay ${link.title} — InkDrop`,
      description: link.description || `${amount} · Instant checkout on Ink Chain`,
      openGraph: {
        title: `Pay ${link.title}`,
        description: `${amount} · Pay in seconds, no wallet required · InkDrop`,
        type: "website",
        siteName: "InkDrop",
      },
      twitter: {
        card: "summary_large_image",
        title: `Pay ${link.title} — InkDrop`,
        description: `${amount} · Pay in seconds, no wallet required`,
      },
      metadataBase: new URL(baseUrl),
    };
  } catch {
    return {
      title: "Pay — InkDrop",
      description: "Instant checkout on Ink Chain",
      metadataBase: new URL(baseUrl),
    };
  }
}

export default function PayLayout({ children }) {
  return children;
}
