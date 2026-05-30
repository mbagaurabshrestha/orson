import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      cache: "no-store",
    });
    const data = await res.json();
    const post = data.blogs.find((b: any) => b.slug === slug);
    return post || null;
  } catch {
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) return notFound();

  return (
    <div className="font-sans bg-white min-h-screen text-black shadow">

      <nav className="sticky top-0 z-100 bg-white backdrop-blur-md border-b shadow-lg border-gray-200 px-8 flex items-center justify-between h-16">
        <Link href="/">
          <div 
          style={{ 
            display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-full" />
            <span 
            style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              letterSpacing: "0.5px", 
              color: "black"
              }}>
              Orson Infotech
            </span>
          </div>
        </Link>
        <Link href="/blog" className="text-white text-sm font-semibold text-[14px] no-underline inline-block py-2 px-4 rounded-lg bg-blue-500 hover:scale-102 transition-transform duration-200 active:scale-95 hover:bg-blue-600">
          ← Back to Blogs
        </Link>
      </nav>

      <section className="py-20 px-8 max-w-180 mt-4 mx-auto ">

        

        <span className="text-xs font-semibold  tracking-[1px] uppercase text-black bg-gray-300 px-2.5 py-1 rounded-[20px]">{post.tag}</span>

        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-black mt-5 mb-4 leading-[1.3]">
          {post.title}
        </h1>

        <p className="text-xs text-gray-400 mb-10">
          {post.date}
        </p>

        <div className="border-t border-gray-300 mb-10" />

        <p className="text-[1.05rem] text-black leading-[1.9] whitespace-pre-wrap">
          {post.content}
        </p>

      </section>

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