import dbConnect from "../../../lib/dbConnect";
import Newsletter from "../../../models/Newsletter";

export default async function handler(req, res) {
  await dbConnect("events");
  if (req.method === "POST") {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        res.status(422).json({ success: false, message: "invalid email" });
        return;
      }
      await Newsletter.create({ email });
      res.status(201).json({ success: true });
    } catch (err) {
      const select = await err.message.match(/\w+/g);
      if (select.includes("email") && select.includes("duplicate")) {
        res.status(412).json({ message: "Email is already registered!" });
        return;
      }
      res.status(500).json({ message: "Connecting to the database failed" });
    }
  }
}
