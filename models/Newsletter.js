import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports =
  mongoose.models.Newsletter || mongoose.model("Newsletter", NewsletterSchema);
