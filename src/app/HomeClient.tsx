"use client";
import Link from "next/link";
import Image from "next/image";
import { FaGlobe, FaGraduationCap, FaPenNib, FaHandshake } from "react-icons/fa";
import { FaMobileRetro } from "react-icons/fa6";
import { SiJirasoftware } from "react-icons/si";

const PREVIEW_LENGTH = 100;

export default function HomeClient({ blogs }: { blogs: any[] }) {
  const services = [
    { icon: FaGlobe, title: "Web Development", desc: "Custom websites and web applications built with modern technologies tailored to your business needs." },
    { icon: FaMobileRetro, title: "Mobile Apps", desc: "Native and cross-platform mobile applications for iOS and Android that deliver seamless experiences." },
    { icon: SiJirasoftware, title: "Software Tools", desc: "Custom software solutions and automation tools that streamline your business operations." },
    { icon: FaGraduationCap, title: "Training Programs", desc: "Professional IT training through partner institutes covering web, mobile, and software development." },
    { icon: FaPenNib, title: "Tech Blogs", desc: "Insights, tutorials, and industry news to keep you updated with the latest in technology." },
    { icon: FaHandshake, title: "IT Consulting", desc: "Expert guidance to help your business navigate technology decisions and digital transformation." },
  ];

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      background: "white",
      minHeight: "100vh",
      color: "#fff",
    }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "white",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }} className="shadow-lg">
        
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
        
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          
          <div className="flex text-black gap-4 cursor-pointer">
            
         {["Services", "Training", "Blogs", "Contact"].map((item) => (
         <a key={item} href={`#${item.toLowerCase()}`}
         className="hover:font-bold transition-transform duration-300 hover:text-blue-700 active:scale-95 active:text-blue-900"
         > 
         {item}
         </a>
         ))}
         </div>
          
          <Link href="/login" 
          className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-800 active:scale-95 transition-transform duration-500 hover:scale-103">
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "88vh", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center", 
        padding: "6rem 2rem", 
        textAlign: "center",

        backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/cover-photo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
              background: "#fff", color: "#1e40af",
              fontSize: "15px", fontWeight: "700",
              textDecoration: "none", letterSpacing: "0.3px",
            }} className="active:scale-95 transition-transform duration-500 hover:scale-103">Explore Services</a>

            <a href="#contact" style={{
              padding: "14px 32px", borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff", fontSize: "15px",
              textDecoration: "none", letterSpacing: "0.3px",
            }} className="active:scale-95 transition-transform duration-500 hover:scale-103">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-t border-b border-gray-300 bg-white shadow">
  <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-center">
    
    {[
      { num: "50+", label: "Projects Delivered" },
      { num: "30+", label: "Happy Clients" },
      { num: "5+", label: "Years Experience" },
      { num: "100+", label: "Students Trained" },
    ].map((s) => (
      
      <div
        key={s.label}
        className="flex-1 min-w-40"
      >
        <div className="text-4xl font-bold text-blue-900 mb-2">
          {s.num}
        </div>

        <div className="text-sm text-gray-600 tracking-wide">
          {s.label}
        </div>
      </div>

    ))}
  </div>
</section>

      {/* Services */}
      <section id="services" className="py-24 px-8 shadow-md border-b border-gray-300">
        <div className="max-w-250 mx-auto">
          <div className="text-center mb-16">
            <p className="text-[13px] text-black tracking-[2px] uppercase mb-4">What We Do</p>
            <h2 className="font-bold text-black text-[clamp(2rem,4vw,3rem)]">Our Services</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-8 rounded-xl border border-white/15   bg-gray-100 shadow  hover:scale-103 transition-transform duration-500 hover:shadow-lg">

                <div className="text-3xl mb-4 ">
                  {typeof s.icon === "string" ? s.icon : (() => { const Icon = s.icon; return <Icon size={32} color="black" />; })()}
                </div>
                <h3 className="text-[1.1rem] font-semibold text-black mb-3">{s.title}</h3>
                <p className="text-[14px] text-black leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="py-24 px-8  border-b border-gray-300 shadow-md">
        <div className="max-w-225 mx-auto grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[13px] text-black tracking-[2px] uppercase mb-4">Learn & Grow</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-black mb-6">
              Training Through Partner Institutes
            </h2>
            <p className="text-black leading-[1.8] mb-6">
              We collaborate with leading training institutes to offer professional IT courses
              in web development, mobile app development, software engineering, and more.
            </p>
            
              <a href="#contact" className=" text-sm font-semibold bg-blue-500 text-white p-2 rounded-full hover:font-bold  hover:bg-blue-600 inline-block hover:scale-103 transition-transform duration-800">
                Enquire about programs →
                </a>
            
          </div>
          <div className="flex flex-col gap-4">
            {["Web Development Bootcamp", "Mobile App Development", "Software Engineering", "UI/UX Design Fundamentals"].map((course) => (
             
             <div key={course} className="p-4 py-4 px-5 rounded-lg border border-white/15 bg-gray-100 shadow-md cursor-default flex items-center gap-3 hover:scale-102 transition-transform duration-500 hover:shadow-lg">

                <div className="w-1.5 h-1.5 rounded-full bg-gray-800 shrink-0"/>
                <span className="text-semibold text-sm text-black ">{course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" className="py-24 px-8 border-b border-gray-300 shadow-md">
        <div className="max-w-250 mx-auto">
          <div className="text-center mb-16">
            <p className="text-black text-[13px] tracking-[2px] uppercase mb-4">Stay Updated</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-black">Latest from Our Blog</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {blogs.slice(0, 3).map((post) => (
              <div key={post._id} className="hover:scale-103 transition-transform duration-500 hover:shadow-lg p-7 rounded-lg border border-gray-300 bg-gray-100 shadow">
                <span className="text-[11px] tracking-[1px] uppercase text-black bg-gray-200 px-2.5 py-0.75 rounded-md font-semibold">{post.tag}</span>
                <h3 className="text-base font-medium text-black mt-4 mb-3 leading-normal">{post.title}</h3>
                <p className="text-[14px] text-gray-600 leading-[1.7] mb-3">
                  {post.content.slice(0, PREVIEW_LENGTH)}...
                </p>
                <Link href={`/blog/${post.slug}`} className="text-[13px] font-semibold text-white  underline-offset-[3px] opacity-85 bg-blue-500 px-2 py-1 rounded-full active:scale-95 transition-transform duration-500 hover:scale-105 hover:bg-blue-800">
                  <span className="inline-block hover:scale-105 transition-transform duration-500">Read More →</span>
                </Link>
                <p className="text-[13px] text-black mt-3">{post.date}</p>
              </div>
            ))}
          </div>

          {/* View More Blogs Button */}
          {blogs.length > 3 && (
            <div className="text-center mt-12">
              <Link href="/blog" className="inline-block py-4 px-8 rounded-full border border-gray-300 bg-blue-500 text-white text-[15px] font-semibold hover:bg-blue-600 hover:shadow-lg hover:scale-102 transition-transform duration-500 active:scale-95">
                View More Blogs →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 text-center border-b shadow-lg border-gray-300 ">
        <div className="max-w-140 mx-auto">
          <p className="text-black text-[13px] tracking-[2px] uppercase mb-4">Get In Touch</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-black mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-black leading-[1.8] mb-10">
            Tell us about your idea and we will help you bring it to life. From concept to launch, we are with you every step.
          </p>
          <a href="mailto:infotech.orson@gmail.com" className="inline-block py-4 px-8 rounded-lg bg-blue-500 text-white text-md font-bold hover:scale-103 transition-transform duration-500 active:scale-95 hover:bg-blue-600">infotech.orson@gmail.com</a>
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