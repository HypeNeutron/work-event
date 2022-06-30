import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
