"use client";
import Link from "next/link";
import Image from "next/image";
import { FaGlobe, FaMobileAlt, FaTools, FaGraduationCap, FaPenNib, FaHandshake } from "react-icons/fa";

const PREVIEW_LENGTH = 100;

export default function HomeClient({ blogs }: { blogs: any[] }) {
  const services = [
    { icon: FaGlobe, title: "Web Development", desc: "Custom websites and web applications built with modern technologies tailored to your business needs." },
    { icon: FaMobileAlt, title: "Mobile Apps", desc: "Native and cross-platform mobile applications for iOS and Android that deliver seamless experiences." },
    { icon: FaTools, title: "Software Tools", desc: "Custom software solutions and automation tools that streamline your business operations." },
    { icon: FaGraduationCap, title: "Training Programs", desc: "Professional IT training through partner institutes covering web, mobile, and software development." },
    { icon: FaPenNib, title: "Tech Blogs", desc: "Insights, tutorials, and industry news to keep you updated with the latest in technology." },
    { icon: FaHandshake, title: "IT Consulting", desc: "Expert guidance to help your business navigate technology decisions and digital transformation." },
  ];

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
        <Link href="/">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-full" />
            <span style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "0.5px" }}>
              Orson Infotech
            </span>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Services", "Training", "Blogs", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                color: "rgba(255,255,255,0.8)", fontSize: "14px",
                textDecoration: "none", letterSpacing: "0.3px",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >{item}</a>
            ))}
          </div>
          <Link href="/login" style={{
            padding: "8px 20px", borderRadius: "6px",
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.35)",
            color: "#fff", fontSize: "14px", fontWeight: "600",
            textDecoration: "none", letterSpacing: "0.3px",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "88vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "6rem 2rem", textAlign: "center",
      }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase",
            marginBottom: "2rem", color: "#fff",
          }}>
            Software & IT Services
          </div>
          <h1 style={{
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)", fontWeight: "700",
            lineHeight: "1.2", marginBottom: "1.5rem", color: "#fff",
          }}>
            We Build Digital Experiences That Matter
          </h1>
          <p style={{
            fontSize: "1.15rem", color: "rgba(255,255,255,0.75)",
            lineHeight: "1.8", maxWidth: "520px", margin: "0 auto 2.5rem",
          }}>
            From websites to mobile apps, software tools to training programs —
            Orson Infotech delivers technology solutions that drive real results.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#services" style={{
              padding: "14px 32px", borderRadius: "6px",
              background: "#fff", color: "#764ba2",
              fontSize: "15px", fontWeight: "700",
              textDecoration: "none", letterSpacing: "0.3px",
            }}>Explore Services</a>
            <a href="#contact" style={{
              padding: "14px 32px", borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff", fontSize: "15px",
              textDecoration: "none", letterSpacing: "0.3px",
            }}>Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: "3rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2rem", textAlign: "center",
        }}>
          {[
            { num: "50+", label: "Projects Delivered" },
            { num: "30+", label: "Happy Clients" },
            { num: "5+", label: "Years Experience" },
            { num: "100+", label: "Students Trained" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2.4rem", fontWeight: "700", color: "#fff", marginBottom: "6px" }}>{s.num}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>What We Do</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", color: "#fff" }}>Our Services</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {services.map((s) => (
              <div key={s.title} style={{
                padding: "2rem", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                transition: "background 0.2s, border-color 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                  {typeof s.icon === "string" ? s.icon : (() => { const Icon = s.icon; return <Icon size={32} color="white" />; })()}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#fff", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" style={{
        padding: "6rem 2rem",
        background: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}>
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "center",
        }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>Learn & Grow</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: "700", color: "#fff", marginBottom: "1.5rem" }}>
              Training Through Partner Institutes
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.8", marginBottom: "1.5rem" }}>
              We collaborate with leading training institutes to offer professional IT courses
              in web development, mobile app development, software engineering, and more.
            </p>
            <a href="#contact" style={{
              color: "#fff", fontSize: "14px", textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: "2px",
            }}>Enquire about programs →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {["Web Development Bootcamp", "Mobile App Development", "Software Engineering", "UI/UX Design Fundamentals"].map((course) => (
              <div key={course} style={{
                padding: "1rem 1.25rem", borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>{course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>Stay Updated</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", color: "#fff" }}>Latest from Our Blog</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {blogs.slice(0, 3).map((post) => (
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
                <h3 style={{ fontSize: "1rem", fontWeight: "500", color: "#fff", margin: "1rem 0 0.75rem", lineHeight: "1.5" }}>{post.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: "1.7", marginBottom: "0.75rem" }}>
                  {post.content.slice(0, PREVIEW_LENGTH)}...
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

          {/* View More Blogs Button */}
          {blogs.length > 3 && (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/blog" style={{
                display: "inline-block",
                padding: "13px 36px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                letterSpacing: "0.3px",
              }}>
                View More Blogs →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        padding: "6rem 2rem", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>Get In Touch</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", color: "#fff", marginBottom: "1.5rem" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.8", marginBottom: "2.5rem" }}>
            Tell us about your idea and we will help you bring it to life. From concept to launch, we are with you every step.
          </p>
          <a href="mailto:infotech.orson@gmail.com" style={{
            display: "inline-block", padding: "14px 36px", borderRadius: "6px",
            background: "#fff", color: "#764ba2",
            fontSize: "15px", fontWeight: "700",
            textDecoration: "none", letterSpacing: "0.3px",
          }}>infotech.orson@gmail.com</a>
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