import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
  const { eventId } = req.query;
  await dbConnect("events");

  if (req.method === "POST") {
    try {
      const { email, name, text } = req.body;
      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        !text.trim() === ""
      ) {
        res.status(422).json({ invalid: true, message: "Invalid input." });
        return;
      }
      const newCommentData = {
        eventId,
        email,
        name,
        comment: text,
      };
      await Comment.create(newCommentData);
      res.status(201).json({ message: "Comment created!" });
    } catch (err) {
      res.status(500).json({ message: "Connecting to the database failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const commentList = await Comment.find({ eventId }).sort({ _id: -1 });
      if (commentList === []) {
        res.status(200).json(null);
        return;
      }
      res.status(200).json({ success: true, comments: commentList });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Connecting to the database fail" });
    }
  }
}
