"use client";
import { useEffect, useState } from "react";
import AddNewBlog from "../AddNewBlog";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const initialFormData = {
  title: "",
  description: "",
};

const BlogsOveriew = ({ blogList }) => {
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);
  // console.log(blogFormData);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSaveBlogData = async () => {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID !== null
          ? await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            })
          : await fetch(`api/add-blog`, {
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
        setCurrentEditedBlogID(null);
        router.refresh();
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  };

  const handleDeleteBlog = async (getCurrentBlogId) => {
    try {
      const apiResponse = await fetch(
        `/api/delete-blog?id=${getCurrentBlogId}`,
        {
          method: "DELETE",
        }
      );
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBlog = (singleBlog) => {
    setCurrentEditedBlogID(singleBlog._id);
    setBlogFormData({
      title: singleBlog?.title,
      description: singleBlog?.description,
    });
    setOpenDialogBox(true);
  };
  console.log(currentEditedBlogID);
  return (
    <div className="min-h-screen flex flex-col bg-black text-white gap-10 p-8">
      <AddNewBlog
        openDialogBox={openDialogBox}
        setOpenDialogBox={setOpenDialogBox}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((singleBlog) => (
            <Card key={singleBlog._id} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{singleBlog.title}</CardTitle>
                <CardDescription>{singleBlog.description}</CardDescription>
                <div className="mt-5 flex justify-center items-center gap-6">
                  <Button onClick={() => handleEditBlog(singleBlog)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteBlog(singleBlog._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-red-400 font-bold text-3xl">
            No Blogs Present Please Add one
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogsOveriew;
