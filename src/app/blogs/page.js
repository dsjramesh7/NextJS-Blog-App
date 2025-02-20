import BlogsOveriew from "../components/BlogsOverview";

async function fetchAllBlogsFunction() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });
    console.log(apiResponse);
    const result = await apiResponse.json();
    console.log(result);
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

const Blogs = async () => {
  const blogList = await fetchAllBlogsFunction();
  // console.log(blogList, "bloglist");
  return <BlogsOveriew blogList={blogList} />;
};

export default Blogs;
