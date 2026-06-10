import { Alchemy, Network } from "alchemy-sdk";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

console.log("Key loaded:", process.env.NEXT_PUBLIC_ALCHEMY_API_KEY?.slice(0, 6));


const alchemy = new Alchemy({
  apiKey: "ULa0HfHE12zrpBJLkTqOp",
  network: Network.ETH_MAINNET,
});

// Test 1 — get block number
const block = await alchemy.core.getBlockNumber();
console.log("✅ Latest block:", block);

// Test 2 — get ETH balance (Vitalik)
const balance = await alchemy.core.getBalance("vitalik.eth");
console.log("✅ Vitalik balance (wei):", balance.toString());

// Test 3 — get recent transfers
const transfers = await alchemy.core.getAssetTransfers({
  fromAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  category: ["external"],
  maxCount: 3,
});
console.log("✅ Recent transfers:", transfers.transfers.length, "found");
transfers.transfers.forEach(t =>
  console.log("  →", t.hash.slice(0,10), "|", t.value, t.asset)
);