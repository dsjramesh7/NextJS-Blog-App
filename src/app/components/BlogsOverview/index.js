"use client";
import { useState } from "react";
import AddNewBlog from "../AddNewBlog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const initialFormData = {
  title: "",
  description: "",
};

const BlogsOveriew = ({ blogList }) => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  // console.log(blogFormData);
  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const apiResponse = await fetch(`api/add-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      // console.log(result);
      if (result?.success) {
        setBlogFormData(initialFormData);
        setLoading(false);
        setOpenDialogBox(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-black text-white gap-10">
      <AddNewBlog
        openDialogBox={openDialogBox}
        setOpenDialogBox={setOpenDialogBox}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((singleBlog) => (
            <Card key={singleBlog.id} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{singleBlog.title}</CardTitle>
                <CardDescription>{singleBlog.description}</CardDescription>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No Blogs Present</p>
        )}
      </div>
    </div>
  );
};

export default BlogsOveriew;
