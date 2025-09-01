import formidable from "formidable";
import path from "path";
import fs from "fs";
import { connectDB } from "@/lib/db";

const uploadDir = path.join(process.cwd(), "public/schoolImages");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = formidable({
        uploadDir,
        keepExtensions: true,
        filename: (name, ext, part, form) => {
          return `${Date.now()}-${part.originalFilename}`;
        },
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("❌ Formidable error:", err);
          return res.status(500).json({ error: "File upload error" });
        }

        const { name, address, city, state, contact, email_id } = fields;
        const filePath = `/schoolImages/${path.basename(files.image[0].filepath)}`;

        const conn = await connectDB();
        await conn.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name[0], address[0], city[0], state[0], contact[0], filePath, email_id[0]]
        );
        conn.end();

        return res.status(200).json({ message: "School added successfully!" });
      });
    } catch (err) {
      console.error("❌ AddSchool Error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
