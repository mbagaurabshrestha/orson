"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────
type Blog = { _id: string; tag: string; title: string; content: string; date: string };
type Project = { id: number; title: string; desc: string; tech: string; status: string; link: string };
type Tab = "dashboard" | "blogs" | "projects" | "messages";

// ─── Initial Data (projects only, blogs come from DB) ─────────
const initialProjects: Project[] = [
  { id: 1, title: "E-Commerce Platform", desc: "Full-stack shopping platform with payment integration", tech: "Next.js, MongoDB, Stripe", status: "Completed", link: "https://example.com" },
  { id: 2, title: "Hospital Management System", desc: "Patient records, appointments, and billing system", tech: "React, Node.js, PostgreSQL", status: "In Progress", link: "" },
  { id: 3, title: "School ERP", desc: "Complete school management including attendance and grades", tech: "Next.js, MongoDB", status: "Completed", link: "https://example.com" },
];

const EMPTY_BLOG = { tag: "", title: "", content: "", date: "" };
const EMPTY_PROJECT: Omit<Project, "id"> = { title: "", desc: "", tech: "", status: "In Progress", link: "" };

// ─── Styles ───────────────────────────────────────────────────
const S = {
  page: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", display: "flex", minHeight: "100vh", background: "#f0f2f8", color: "#1a1a2e" } as React.CSSProperties,
  sidebar: { width: "240px", background: "linear-gradient(160deg, #2563eb 0%, #2563eb 100%)", display: "flex", flexDirection: "column" as const, padding: "0", flexShrink: 0 },
  logo: { padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: { width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px", color: "#fff" },
  logoText: { color: "#fff", fontWeight: "600", fontSize: "15px" },
  nav: { padding: "1rem 0", flex: 1 },
  navItem: (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: "10px", padding: "12px 1.5rem",
    cursor: "pointer", color: active ? "#fff" : "rgba(255,255,255,0.65)",
    background: active ? "rgba(255,255,255,0.15)" : "transparent",
    borderLeft: active ? "3px solid #fff" : "3px solid transparent",
    fontSize: "14px", fontWeight: active ? "600" : "400", transition: "all 0.15s",
  }),
  sidebarFooter: { padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.15)" },
  logoutBtn: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  main: { flex: 1, display: "flex", flexDirection: "column" as const, overflow: "auto" },
  topbar: { background: "#fff", padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8eaf0", flexShrink: 0 },
  content: { padding: "2rem", flex: 1 },
  pageTitle: { fontSize: "1.5rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "0.25rem" },
  pageSubtitle: { fontSize: "13px", color: "#8890a4", marginBottom: "2rem" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem", marginBottom: "2rem" },
  statCard: (color: string): React.CSSProperties => ({
    background: "#fff", borderRadius: "12px", padding: "1.25rem",
    borderLeft: `4px solid ${color}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  }),
  statNum: { fontSize: "2rem", fontWeight: "700", color: "#1a1a2e" },
  statLabel: { fontSize: "12px", color: "#8890a4", marginTop: "4px", letterSpacing: "0.3px" },
  card: { background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: "1.5rem" },
  cardTitle: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
  addBtn: { padding: "8px 16px", borderRadius: "6px", background: "linear-gradient(135deg, #2563eb, #2563eb)", color: "#fff", fontSize: "13px", fontWeight: "600", border: "none", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "14px" },
  th: { textAlign: "left" as const, padding: "10px 12px", borderBottom: "2px solid #f0f2f8", fontSize: "12px", color: "#8890a4", letterSpacing: "0.5px", textTransform: "uppercase" as const },
  td: { padding: "12px", borderBottom: "1px solid #f5f6fa", verticalAlign: "top" as const },
  tag: (color: string): React.CSSProperties => ({
    display: "inline-block", padding: "2px 10px", borderRadius: "20px",
    fontSize: "11px", fontWeight: "600", background: color + "18", color: color,
  }),
  actionBtn: (color: string): React.CSSProperties => ({
    padding: "5px 12px", borderRadius: "5px", border: `1px solid ${color}`,
    background: "transparent", color: color, fontSize: "12px", cursor: "pointer", marginRight: "6px",
  }),
  modal: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" },
  modalBox: { background: "#fff", borderRadius: "14px", padding: "2rem", width: "100%", maxWidth: "520px", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" },
  modalTitle: { fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem", color: "#1a1a2e" },
  label: { fontSize: "12px", fontWeight: "600", color: "#8890a4", letterSpacing: "0.4px", display: "block", marginBottom: "6px", marginTop: "14px" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "7px", border: "1px solid #e0e3ec", fontSize: "14px", outline: "none", boxSizing: "border-box" as const, color: "#1a1a2e" },
  textarea: { width: "100%", padding: "10px 12px", borderRadius: "7px", border: "1px solid #e0e3ec", fontSize: "14px", outline: "none", resize: "vertical" as const, minHeight: "90px", boxSizing: "border-box" as const, color: "#1a1a2e" },
  select: { width: "100%", padding: "10px 12px", borderRadius: "7px", border: "1px solid #e0e3ec", fontSize: "14px", outline: "none", color: "#1a1a2e", boxSizing: "border-box" as const },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1.5rem" },
  cancelBtn: { padding: "9px 20px", borderRadius: "6px", border: "1px solid #e0e3ec", background: "#fff", fontSize: "13px", cursor: "pointer", color: "#1a1a2e" },
  saveBtn: { padding: "9px 20px", borderRadius: "6px", border: "none", background: "linear-gradient(135deg, #2563eb, #2563eb)", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  deleteBtn: { padding: "9px 20px", borderRadius: "6px", border: "none", background: "#e53e3e", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  emptyState: { textAlign: "center" as const, padding: "3rem", color: "#8890a4", fontSize: "14px" },
};

// ─── Confirm Modal ─────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={S.modal}>
      <div style={{ ...S.modalBox, maxWidth: "380px" }}>
        <div style={S.modalTitle}>Confirm Delete</div>
        <p className="text-[14px] text-[#555] mb-0">{message}</p>
        <div style={S.modalActions}>
          <button style={S.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={S.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Blog Modal ────────────────────────────────────────────────
function BlogModal({ blog, onSave, onClose }: { blog: Partial<Blog>; onSave: (b: Omit<Blog, "_id">) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    tag: blog.tag || "",
    title: blog.title || "",
    content: blog.content || "",
    date: blog.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={S.modal}>
      <div style={S.modalBox}>
        <div style={S.modalTitle}>{blog._id ? "Edit Blog Post" : "Add Blog Post"}</div>
        <label style={S.label}>TAG</label>
        <input style={S.input} placeholder="e.g. Web Dev" value={form.tag} onChange={set("tag")} />
        <label style={S.label}>TITLE</label>
        <input style={S.input} placeholder="Blog title" value={form.title} onChange={set("title")} />
        <label style={S.label}>CONTENT</label>
        <textarea style={S.textarea} placeholder="Write your blog content here..." value={form.content} onChange={set("content")} />
        <label style={S.label}>DATE</label>
        <input style={S.input} placeholder="e.g. May 2025" value={form.date} onChange={set("date")} />
        <div style={S.modalActions}>
          <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={S.saveBtn} onClick={() => { if (form.title.trim()) onSave(form); }}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Project Modal ─────────────────────────────────────────────
function ProjectModal({ project, onSave, onClose }: { project: Partial<Project>; onSave: (p: Omit<Project, "id">) => void; onClose: () => void }) {
  const [form, setForm] = useState<Omit<Project, "id">>({
    title: project.title || "", desc: project.desc || "",
    tech: project.tech || "", status: project.status || "In Progress", link: project.link || "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={S.modal}>
      <div style={S.modalBox}>
        <div style={S.modalTitle}>{project.id ? "Edit Project" : "Add Project"}</div>
        <label style={S.label}>PROJECT TITLE</label>
        <input style={S.input} placeholder="Project name" value={form.title} onChange={set("title")} />
        <label style={S.label}>DESCRIPTION</label>
        <textarea style={{ ...S.textarea, minHeight: "70px" }} placeholder="Short description" value={form.desc} onChange={set("desc")} />
        <label style={S.label}>TECHNOLOGIES USED</label>
        <input style={S.input} placeholder="e.g. Next.js, MongoDB, Tailwind" value={form.tech} onChange={set("tech")} />
        <label style={S.label}>STATUS</label>
        <select style={S.select} value={form.status} onChange={set("status")}>
          <option>In Progress</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
        <label style={S.label}>LIVE LINK (optional)</label>
        <input style={S.input} placeholder="https://..." value={form.link} onChange={set("link")} />
        <div style={S.modalActions}>
          <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={S.saveBtn} onClick={() => { if (form.title.trim()) onSave(form); }}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Blog modal state
  const [blogModal, setBlogModal] = useState(false);
  const [editBlog, setEditBlog] = useState<Partial<Blog>>({});
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

  // Project modal state
  const [projectModal, setProjectModal] = useState(false);
  const [editProject, setEditProject] = useState<Partial<Project>>({});
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);

  // ── Load blogs from DB on mount ──
  useEffect(() => {
    axios.get("/api/blogs")
      .then(res => setBlogs(res.data.blogs))
      .catch(() => setBlogs([]))
      .finally(() => setBlogsLoading(false));
  }, []);

  // ── Blog CRUD (API-backed) ──
  const saveBlog = async (form: Omit<Blog, "_id">) => {
    try {
      if (editBlog._id) {
        // Edit existing
        const res = await axios.put("/api/blogs", { ...form, _id: editBlog._id });
        setBlogs(bs => bs.map(b => b._id === editBlog._id ? res.data.blog : b));
      } else {
        // Create new
        const res = await axios.post("/api/blogs", form);
        setBlogs(bs => [res.data.blog, ...bs]);
      }
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
    setBlogModal(false);
    setEditBlog({});
  };

  const deleteBlog = async (id: string) => {
    try {
      await axios.delete("/api/blogs", { data: { _id: id } });
      setBlogs(bs => bs.filter(b => b._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
    setDeleteBlogId(null);
  };

  // ── Project CRUD (still local state) ──
  const saveProject = (form: Omit<Project, "id">) => {
    if (editProject.id) {
      setProjects(ps => ps.map(p => p.id === editProject.id ? { ...form, id: editProject.id! } : p));
    } else {
      setProjects(ps => [...ps, { ...form, id: Date.now() }]);
    }
    setProjectModal(false);
    setEditProject({});
  };
  const deleteProject = (id: number) => {
    setProjects(ps => ps.filter(p => p.id !== id));
    setDeleteProjectId(null);
  };

  const onLogout = async () => {
    try { await axios.get("/api/users/logout"); } catch {}
    router.push("/");
  };

  const statusColor = (s: string) => s === "Completed" ? "#38a169" : s === "In Progress" ? "#667eea" : "#e5a000";

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "blogs", label: "Blog Posts", icon: "✍️" },
    { key: "projects", label: "Projects", icon: "🛠️" },
    { key: "messages", label: "Messages", icon: "💬" },
  ];

  return (
    <div style={S.page}>

      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.logo}>
          <div><Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-full" /></div>
          
          <span className="font-semibold text-white"> Orson Infotech </span>
                    
        </div>
        <nav style={S.nav}>
          {navItems.map(n => (
            <div key={n.key} style={S.navItem(tab === n.key)} onClick={() => setTab(n.key)}>
              <span>{n.icon}</span> {n.label}
            </div>
          ))}
        </nav>
        <div style={S.sidebarFooter}>
          <button className="hover:scale-103 duration-500 active:translate-y-0.75" style={S.logoutBtn} onClick={onLogout}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div style={S.main}>

        {/* Topbar */}
        <div style={S.topbar}>
          <div style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a2e" }}>
            {navItems.find(n => n.key === tab)?.icon} {navItems.find(n => n.key === tab)?.label}
          </div>
          <div style={{ fontSize: "13px", color: "#8890a4" }}>Welcome, Admin</div>
        </div>

        <div style={S.content}>

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <>
              <div style={S.pageTitle}>Dashboard</div>
              <div style={S.pageSubtitle}>Overview of your website content</div>
              <div style={S.statsGrid}>
                {[
                  { label: "Total Blogs", num: blogs.length, color: "#667eea" },
                  { label: "Total Projects", num: projects.length, color: "#764ba2" },
                  { label: "Completed Projects", num: projects.filter(p => p.status === "Completed").length, color: "#38a169" },
                  { label: "In Progress", num: projects.filter(p => p.status === "In Progress").length, color: "#e5a000" },
                ].map(s => (
                  <div key={s.label} style={S.statCard(s.color)}>
                    <div style={S.statNum}>{s.num}</div>
                    <div style={S.statLabel}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Blogs */}
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Recent Blog Posts</span>
                  <button style={S.addBtn} onClick={() => setTab("blogs")}>View All</button>
                </div>
                {blogsLoading ? (
                  <div style={S.emptyState}>Loading blogs...</div>
                ) : (
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>Title</th>
                        <th style={S.th}>Tag</th>
                        <th style={S.th}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.slice(0, 3).map(b => (
                        <tr key={b._id}>
                          <td style={S.td}>{b.title}</td>
                          <td style={S.td}><span style={S.tag("#667eea")}>{b.tag}</span></td>
                          <td style={S.td}><span style={{ color: "#8890a4", fontSize: "13px" }}>{b.date}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Recent Projects */}
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>Recent Projects</span>
                  <button style={S.addBtn} onClick={() => setTab("projects")}>View All</button>
                </div>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Project</th>
                      <th style={S.th}>Tech</th>
                      <th style={S.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 3).map(p => (
                      <tr key={p.id}>
                        <td style={S.td}>{p.title}</td>
                        <td style={S.td}><span style={{ fontSize: "12px", color: "#8890a4" }}>{p.tech}</span></td>
                        <td style={S.td}><span style={S.tag(statusColor(p.status))}>{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── BLOGS ── */}
          {tab === "blogs" && (
            <>
              <div style={S.pageTitle}>Blog Posts</div>
              <div style={S.pageSubtitle}>Add, edit, or delete blog posts shown on the homepage</div>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>All Posts ({blogs.length})</span>
                  <button style={S.addBtn} onClick={() => { setEditBlog(EMPTY_BLOG); setBlogModal(true); }}>+ Add Post</button>
                </div>
                {blogsLoading ? (
                  <div style={S.emptyState}>Loading blogs...</div>
                ) : blogs.length === 0 ? (
                  <div style={S.emptyState}>No blog posts yet. Click &quot;Add Blog&quot; to create one.</div>
                ) : (
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>Title</th>
                        <th style={S.th}>Tag</th>
                        <th style={S.th}>Date</th>
                        <th style={S.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map(b => (
                        <tr key={b._id}>
                          <td style={S.td}>
                            <div style={{ fontWeight: "500", marginBottom: "4px" }}>{b.title}</div>
                            <div style={{ fontSize: "12px", color: "#8890a4" }}>{b.content.slice(0, 60)}...</div>
                          </td>
                          <td style={S.td}><span style={S.tag("#667eea")}>{b.tag}</span></td>
                          <td style={{ ...S.td, fontSize: "13px", color: "#8890a4" }}>{b.date}</td>
                          <td style={S.td}>
                            <button style={S.actionBtn("#667eea")} onClick={() => { setEditBlog(b); setBlogModal(true); }}>Edit</button>
                            <button style={S.actionBtn("#e53e3e")} onClick={() => setDeleteBlogId(b._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── PROJECTS ── */}
          {tab === "projects" && (
            <>
              <div style={S.pageTitle}>Projects</div>
              <div style={S.pageSubtitle}>Manage your portfolio projects</div>
              <div style={S.card}>
                <div style={S.cardTitle}>
                  <span>All Projects ({projects.length})</span>
                  <button style={S.addBtn} onClick={() => { setEditProject(EMPTY_PROJECT); setProjectModal(true); }}>+ Add Project</button>
                </div>
                {projects.length === 0 ? (
                  <div style={S.emptyState}>No projects yet. Click &quot;Add Project&quot; to create one.</div>
                ) : (
                  <table style={S.table}>
                    <thead>
                      <tr>
                        <th style={S.th}>Project</th>
                        <th style={S.th}>Technologies</th>
                        <th style={S.th}>Status</th>
                        <th style={S.th}>Link</th>
                        <th style={S.th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(p => (
                        <tr key={p.id}>
                          <td style={S.td}>
                            <div style={{ fontWeight: "500", marginBottom: "4px" }}>{p.title}</div>
                            <div style={{ fontSize: "12px", color: "#8890a4" }}>{p.desc}</div>
                          </td>
                          <td style={{ ...S.td, fontSize: "12px", color: "#8890a4" }}>{p.tech}</td>
                          <td style={S.td}><span style={S.tag(statusColor(p.status))}>{p.status}</span></td>
                          <td style={S.td}>
                            {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#667eea" }}>View →</a> : <span style={{ fontSize: "12px", color: "#ccc" }}>—</span>}
                          </td>
                          <td style={S.td}>
                            <button style={S.actionBtn("#667eea")} onClick={() => { setEditProject(p); setProjectModal(true); }}>Edit</button>
                            <button style={S.actionBtn("#e53e3e")} onClick={() => setDeleteProjectId(p.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── MESSAGES ── */}
          {tab === "messages" && (
            <>
              <div style={S.pageTitle}>Messages</div>
              <div style={S.pageSubtitle}>Contact form submissions from visitors</div>
              <div style={S.card}>
                <div style={S.emptyState}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💬</div>
                  <div style={{ fontWeight: "600", marginBottom: "6px" }}>No messages yet</div>
                  <div>When visitors fill the contact form, messages will appear here.</div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Blog Modal */}
      {blogModal && (
        <BlogModal
          blog={editBlog}
          onSave={saveBlog}
          onClose={() => { setBlogModal(false); setEditBlog({}); }}
        />
      )}

      {/* Project Modal */}
      {projectModal && (
        <ProjectModal
          project={editProject}
          onSave={saveProject}
          onClose={() => { setProjectModal(false); setEditProject({}); }}
        />
      )}

      {/* Delete Blog Confirm */}
      {deleteBlogId !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this blog post? This cannot be undone."
          onConfirm={() => deleteBlog(deleteBlogId)}
          onCancel={() => setDeleteBlogId(null)}
        />
      )}

      {/* Delete Project Confirm */}
      {deleteProjectId !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this project? This cannot be undone."
          onConfirm={() => deleteProject(deleteProjectId)}
          onCancel={() => setDeleteProjectId(null)}
        />
      )}

    </div>
  );
}