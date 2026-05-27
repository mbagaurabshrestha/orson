import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      color: "#fff",
    }}>

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
          <span style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px", color: "#fff" }}>
            Orson Infotech
          </span>
        </Link>
      </nav>

      <section style={{ padding: "5rem 2rem", maxWidth: "720px", margin: "0 auto" }}>

        <Link href="/blog" style={{
          color: "rgba(255,255,255,0.7)", fontSize: "14px",
          textDecoration: "none", display: "inline-block", marginBottom: "2.5rem",
        }}>
          ← Back to Blogs
        </Link>

        <span style={{
          fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase",
          color: "#fff", background: "rgba(255,255,255,0.2)",
          padding: "3px 10px", borderRadius: "20px",
        }}>{post.tag}</span>

        <h1 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "700",
          color: "#fff", margin: "1.25rem 0 1rem", lineHeight: "1.3",
        }}>
          {post.title}
        </h1>

        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
          {post.date}
        </p>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", marginBottom: "2.5rem" }} />

        <p style={{
          fontSize: "1.05rem", color: "rgba(255,255,255,0.8)",
          lineHeight: "1.9", whiteSpace: "pre-wrap",
        }}>
          {post.content}
        </p>

      </section>

      <footer style={{
        padding: "2rem", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        marginTop: "4rem",
      }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>© 2025 Orson Infotech. All rights reserved.</p>
      </footer>

    </div>
  );
}