"use client";
import { useState } from "react";
import AddNewBlog from "../AddNewBlog";

const initialFormData = {
  title: "",
  description: "",
};

const BlogsOveriew = () => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  // console.log(blogFormData);
  const handleSaveBlogData = async () => {
    try {
      const apiResponse = await fetch(`api/add-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-400 text-white gap-10">
      <AddNewBlog
        openDialogBox={openDialogBox}
        setOpenDialogBox={setOpenDialogBox}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div>Blog List Section</div>
    </div>
  );
};

export default BlogsOveriew;
