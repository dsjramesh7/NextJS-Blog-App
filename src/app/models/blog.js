import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: "string",
  description: "string",
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
