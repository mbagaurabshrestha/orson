import HomeClient from "./HomeClient";

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.blogs || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();
  return <HomeClient blogs={blogs} />;
}