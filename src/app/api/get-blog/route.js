import connectToDB from "@/app/database";
import Blog from "@/app/models/blog";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const getAllBlogData = await Blog.find({});
    // console.log(getAllBlogData);
    if (getAllBlogData) {
      return NextResponse.json({
        success: true,
        data: getAllBlogData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later",
      });
    }
  } catch (error) {
    // console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
};
