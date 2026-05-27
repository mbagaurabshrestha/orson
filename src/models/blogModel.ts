import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  tag:  { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);