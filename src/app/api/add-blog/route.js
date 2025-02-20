import connectToDB from "@/app/database";
import Blog from "@/app/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();
    console.log("Connected to DB successfully");
    const extractedBlogData = await req.json();
    // console.log(extractedBlogData);
    const { title, description } = extractedBlogData;
    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractedBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog created successfully",
      });
    } else {
      console.log("in error mode");
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong! Please try again",
    });
  }
}
