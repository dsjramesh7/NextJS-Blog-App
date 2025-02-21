import connectToDB from "@/app/database";
import Blog from "@/app/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogByID = searchParams.get("id");
    if (!getCurrentBlogByID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }
    const { title, description } = await req.json();
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogByBlogID = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogByID,
      },
      { title, description },
      { new: true }
    );

    if (updateBlogByBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is Updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
