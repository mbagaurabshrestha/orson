import Link from "next/link";
import Image from "next/image";

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

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="font-sans bg-white min-h-screen text-black">

      {/* Navbar */}
      <nav className="sticky top-0 z-100 bg-white backdrop-blur-md border-b shadow-lg border-gray-200 px-8 flex items-center justify-between h-16">
        <Link href="/" className="no-underline">
          <div>
            <Image className="rounded-full" src="/logo.png" alt="Logo" width={32} height={32} style={{ display: "inline-block", marginRight: "8px" }} />
            <span className="text-[18px] font-semibold tracking-[0.5px] text-black">
            Orson Infotech
          </span>
          </div>
        </Link>
        <Link href="/" className="text-white text-sm font-semibold text-[14px] no-underline inline-block py-2 px-4 rounded-lg bg-blue-500 hover:scale-102 transition-transform duration-200 active:scale-95 hover:bg-blue-600">
          ← Back to Home
        </Link>
      </nav>

      {/* Header */}
      <section className="pt-16 px-8 pb-8 text-center">
        <p className="text-black text-[13px] tracking-[2px] uppercase mb-4">
          Stay Updated
        </p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-black mb-4">
          All Blog Posts
        </h1>
        <p className="text-black text-[15px]">
          {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
        </p>
      </section>

      {/* Blog Grid */}
      <section className="pt-8 px-8 pb-24">
        <div className="max-w-250 mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center p-16 text-black text-[15px]">
              No blog posts yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {blogs.map((post: any) => (
                <div key={post._id} className="hover:scale-103 transition-transform duration-500 hover:shadow-lg p-7 rounded-lg border border-gray-300 bg-gray-100 shadow">
                  <span className="text-[11px] tracking-[1px] uppercase text-black bg-gray-200 px-2.5 py-0.75 rounded-md font-semibold">{post.tag}</span>
                  <h3 className="text-base font-medium text-black mt-4 mb-3 leading-normal">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-[1.7] mb-3">
                    {post.content.slice(0, 120)}...
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-[13px] font-semibold text-white  underline-offset-[3px] opacity-85 bg-blue-500 px-2 py-1 rounded-full active:scale-95 transition-transform duration-500 hover:scale-105 hover:bg-blue-800">
                    <span className="inline-block hover:scale-105 transition-transform duration-500">Read More →</span>
                  </Link>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>{post.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 border-t border-gray-100">
  {/* Top Section: Links & Info */}
  <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* Column 1: Brand/About */}
    <div className="md:col-span-1">
      <span className="text-lg font-bold text-gray-900 tracking-tight">
        Orson <span className="text-blue-600">Infotech</span>
      </span>
      <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
        Building digital experiences that matter. Custom software, mobile apps, and premium web development solutions.
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <h4 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Company
      </h4>
      <ul className="space-y-2.5 text-[14px]">
        <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
        <li><a href="#training" className="hover:text-blue-600 transition-colors">Training</a></li>
        <li><a href="#blogs" className="hover:text-blue-600 transition-colors">Our Blog</a></li>
      </ul>
    </div>

    {/* Column 3: Contact/Support */}
    <div>
      <h4 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Connect
      </h4>
      <ul className="space-y-2.5 text-[14px]">
        <li>
          <a href="mailto:infotech.orson@gmail.com" className="hover:text-blue-600 transition-colors break-all">
            infotech.orson@gmail.com
          </a>
        </li>
        <li><a href="#contact" className="hover:text-blue-600 transition-colors">Get in Touch</a></li>
      </ul>
    </div>

    {/* Column 4: Newsletter or Subtext */}
    <div>
      <h4 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-4">
        Our Mission
      </h4>
      <p className="text-[14px] leading-relaxed text-gray-500">
        Empowering businesses and students through cutting-edge technology and tailored engineering bootcamps.
      </p>
    </div>

  </div>

  {/* Bottom Section: Copyright */}
  <div className="border-t border-gray-100 shadow bg-gray-100">
    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
      <p>© {new Date().getFullYear()} Orson Infotech. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}