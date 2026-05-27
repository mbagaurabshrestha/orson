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
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      color: "#fff",
    }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(102, 126, 234, 0.15)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div>
            <Image className="rounded-full" src="/logo.png" alt="Logo" width={32} height={32} style={{ display: "inline-block", marginRight: "8px" }} />
            <span style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px", color: "#fff" }}>
            Orson Infotech
          </span>
          </div>
        </Link>
        <Link href="/" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </nav>

      {/* Header */}
      <section style={{ padding: "4rem 2rem 2rem", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>
          Stay Updated
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", color: "#fff", marginBottom: "1rem" }}>
          All Blog Posts
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px" }}>
          {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
        </p>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: "2rem 2rem 6rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {blogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
              No blog posts yet. Check back soon!
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {blogs.map((post: any) => (
                <div key={post._id} style={{
                  padding: "1.75rem", borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.08)",
                }}>
                  <span style={{
                    fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
                    color: "#fff", background: "rgba(255,255,255,0.2)",
                    padding: "3px 10px", borderRadius: "20px",
                  }}>{post.tag}</span>
                  <h3 style={{ fontSize: "1rem", fontWeight: "500", color: "#fff", margin: "1rem 0 0.75rem", lineHeight: "1.5" }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", marginBottom: "0.75rem" }}>
                    {post.content.slice(0, 120)}...
                  </p>
                  <Link href={`/blog/${post.slug}`} style={{
                    color: "#fff", fontSize: "13px", fontWeight: "600",
                    textDecoration: "underline", textUnderlineOffset: "3px", opacity: 0.85,
                  }}>
                    Read More →
                  </Link>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "0.75rem" }}>{post.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "2rem", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.15)",
      }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>© 2025 Orson Infotech. All rights reserved.</p>
      </footer>

    </div>
  );
}