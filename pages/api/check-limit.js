// pages/api/check-limit.js
// import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";

export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return res.status(429).json({ error: "Too many requests" });

  return res.status(200).json({ success: true });
}
