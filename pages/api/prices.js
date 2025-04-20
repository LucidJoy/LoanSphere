import { db } from "@/database/drizzle";
import { historicalDataPrices } from "@/database/schema";

export default async function handler(req, res) {
  try {
    // data is sent in chunks to reduce time-to-first-byte for faster client side rendering
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    const prices = await db.select().from(historicalDataPrices);

    for (const price of prices) {
      res.write(JSON.stringify(price) + "\n");
    }

    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
