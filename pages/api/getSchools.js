import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const conn = await connectDB();
      const [rows] = await conn.execute("SELECT * FROM schools");
      conn.end();
      res.status(200).json(rows);
    } catch (err) {
      console.error("❌ GetSchools Error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
