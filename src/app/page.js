import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-300 to-yellow-100">
      <h2 className="font-bold text-3xl text-gray-600 mt-4">
        Browse our blog collection
      </h2>
      <Link
        className="font-semibold bg-white px-6 py-2 rounded-lg text-red-400"
        href={"/blogs"}
      >
        Explore Blogs
      </Link>
    </div>
  );
}
