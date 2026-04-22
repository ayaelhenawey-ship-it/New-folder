import { useState, useEffect, useRef } from "react";

const WHATSAPP = "00201145711345";
const EMAIL = "ayaelhenawey@gmail.com";

const skills = [
  { name: "HTML", icon: "🌐", desc: "Clean, semantic & responsive layouts" },
  { name: "CSS", icon: "🎨", desc: "Flexbox, Grid & stunning animations" },
  { name: "JavaScript", icon: "⚡", desc: "Interactive dynamic web apps" },
  { name: "React.js", icon: "⚛️", desc: "Reusable UI components & hooks" },
  { name: "Node.js", icon: "🟢", desc: "Server-side APIs & web apps" },
  { name: "PHP", icon: "🐘", desc: "Server-side scripting & dynamic pages" },
  { name: "MySQL", icon: "🗄️", desc: "Database design & management" },
  { name: "WordPress", icon: "📝", desc: "Custom themes & plugins" },
  { name: "Git & GitHub", icon: "🔧", desc: "Version control & collaboration" },
  { name: "Bootstrap", icon: "📐", desc: "Responsive fast UI design" },
  { name: "UI/UX Design", icon: "✏️", desc: "Intuitive user-friendly interfaces" },
  { name: "API Integration", icon: "🔌", desc: "Frontend & backend connectivity" },
];

const projects = [
  {
    title: "CodeSphere Academy",
    desc: "An Interactive Learning Platform for Programming and Development Skills.",
    tag: "EdTech",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    color: "#1a3a6b",
  },
  {
    title: "TravelVista",
    desc: "Explore the World with the Best Travel Tours — dynamic web app.",
    tag: "Travel",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
    color: "#0d2d5e",
  },
  {
    title: "Cafe Royale",
    desc: "Modern Café Website with elegant design & user experience.",
    tag: "Food & Beverage",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
    color: "#162d52",
  },
  {
    title: "Glow Derma Clinic",
    desc: "Professional clinic website with interactive animations.",
    tag: "Healthcare",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    color: "#1d3461",
  },
];

const education = [
  { title: "ITI Internship – SWDF", year: "2025", icon: "🎓" },
  { title: "ITI Internship – FE Developer", year: "2026", icon: "💻" },
  { title: "Web Development Course", year: "2025", icon: "📚" },
  { title: "UI/UX Design Certificate", year: "2024", icon: "🎨" },
];

const testimonials = [
  { text: "Aya delivered an amazing website — highly recommended!", name: "Client 1", role: "Business Owner" },
  { text: "Professional, fast, and very talented developer.", name: "Client 2", role: "Startup Founder" },
  { text: "Creative solutions and excellent communication throughout.", name: "Client 3", role: "Project Manager" },
];

function useTyping(words, speed = 100, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Projects", "Education", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,15,40,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(212,175,55,0.18)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "70px",
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#D4AF37", letterSpacing: "1px", fontWeight: 700 }}>
        Aya<span style={{ color: "#fff" }}> Elhenawey</span>
      </span>
      {/* Desktop */}
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              onClick={() => setActive(l)}
              style={{
                color: active === l ? "#D4AF37" : "#ccd6f6",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.5px",
                paddingBottom: "2px",
                borderBottom: active === l ? "2px solid #D4AF37" : "2px solid transparent",
                transition: "all 0.3s",
              }}
            >{l}</a>
          </li>
        ))}
      </ul>
      {/* Contact button */}
      <a
        href={`mailto:${EMAIL}`}
        style={{
          background: "linear-gradient(135deg, #D4AF37, #B8960C)",
          color: "#060F28",
          padding: "0.45rem 1.2rem",
          borderRadius: "30px",
          fontWeight: 700,
          fontSize: "0.85rem",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 15px rgba(212,175,55,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 22px rgba(212,175,55,0.5)"; }}
        onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 15px rgba(212,175,55,0.35)"; }}
      >
        Hire Me ✦
      </a>
    </nav>
  );
}

function Hero() {
  const typed = useTyping(["Web Developer", "UI Designer", "Frontend Engineer", "Problem Solver"]);
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "0 2rem",
    }}>
      {/* Animated BG orbs */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${120 + i * 60}px`, height: `${120 + i * 60}px`,
          borderRadius: "50%",
          background: i % 2 === 0
            ? "radial-gradient(circle, rgba(212,175,55,0.12), transparent)"
            : "radial-gradient(circle, rgba(29,67,145,0.2), transparent)",
          top: `${10 + i * 18}%`, left: `${5 + i * 20}%`,
          animation: `float ${4 + i}s ease-in-out infinite alternate`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{ textAlign: "center", maxWidth: "800px", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "30px", padding: "0.35rem 1rem", marginBottom: "1.8rem",
          color: "#D4AF37", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif",
          animation: "fadeUp 0.8s ease both",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
          Available for opportunities
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 900, lineHeight: 1.1,
          color: "#E8EEFF",
          marginBottom: "0.4rem",
          animation: "fadeUp 0.9s ease 0.1s both",
        }}>
          Hello, I'm
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
          fontWeight: 900, lineHeight: 1.1,
          background: "linear-gradient(135deg, #D4AF37 0%, #F5D76E 50%, #B8960C 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "1.5rem",
          animation: "fadeUp 0.9s ease 0.2s both",
        }}>
          Aya Elhenawey
        </h1>

        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
          color: "#8892b0",
          marginBottom: "2.5rem",
          minHeight: "2rem",
          animation: "fadeUp 0.9s ease 0.3s both",
        }}>
          <span style={{ color: "#ccd6f6" }}>{typed}</span>
          <span style={{ color: "#D4AF37", animation: "blink 1s step-end infinite" }}>|</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.4s both" }}>
          <a href="#projects" style={btnStyle("primary")}>View My Work ↓</a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=Hi%20Aya!%20I%20saw%20your%20portfolio%20and%20I'd%20love%20to%20work%20with%20you!`}
            target="_blank" rel="noreferrer"
            style={btnStyle("whatsapp")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Me
          </a>
        </div>

        {/* Social links */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", justifyContent: "center", animation: "fadeUp 0.9s ease 0.5s both" }}>
          <SocialLink href="https://www.linkedin.com/in/aya-elhenawey/" label="LinkedIn" />
          <SocialLink href="https://github.com/ayaelhenawey-ship-it" label="GitHub" />
          <SocialLink href={`mailto:${EMAIL}`} label="Email" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        color: "#8892b0", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif",
        animation: "bounce 2s infinite",
      }}>
        <span>scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}

function SocialLink({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{
      color: hov ? "#D4AF37" : "#8892b0",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.85rem",
      textDecoration: "none",
      letterSpacing: "1px",
      textTransform: "uppercase",
      transition: "color 0.3s",
      fontWeight: 600,
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >{label}</a>
  );
}

function About() {
  return (
    <section id="about" style={sectionStyle}>
      <AnimatedSection>
        <SectionTitle>About Me</SectionTitle>
        <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Photo placeholder with geometric frame */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: "280px", height: "320px",
              background: "linear-gradient(135deg, #0d2a6e, #1d3a8a)",
              borderRadius: "12px",
              border: "2px solid rgba(212,175,55,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
              <div style={{ fontSize: "6rem" }}>👩‍💻</div>
            </div>
            {/* Decorative corner */}
            <div style={{
              position: "absolute", top: "-12px", right: "-12px",
              width: "80px", height: "80px",
              border: "2px solid #D4AF37",
              borderRadius: "8px",
              opacity: 0.5,
            }} />
            <div style={{
              position: "absolute", bottom: "-12px", left: "-12px",
              width: "60px", height: "60px",
              background: "linear-gradient(135deg, #D4AF37, transparent)",
              borderRadius: "6px",
              opacity: 0.3,
            }} />
          </div>

          <div style={{ maxWidth: "520px" }}>
            <p style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>
              ✦ Web Developer & UI Designer
            </p>
            <p style={{ color: "#ccd6f6", fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              I'm <strong style={{ color: "#D4AF37" }}>Aya Elhenawey</strong>, a passionate web developer and UI designer who transforms ideas into functional, beautiful websites. I combine creativity with technical precision to deliver the best user experience for every project.
            </p>
            <p style={{ color: "#8892b0", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8 }}>
              Skilled in modern web technologies — from HTML/CSS to React and Node.js — I continuously strive to learn new tools and push the boundaries of what's possible on the web.
            </p>
            <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {[["4+", "Projects Done"], ["2+", "Years Learning"], ["100%", "Dedication"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#D4AF37", fontFamily: "'Playfair Display', serif" }}>{n}</div>
                  <div style={{ color: "#8892b0", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ ...sectionStyle, background: "rgba(13,42,110,0.15)", borderRadius: "24px", margin: "0 1rem 4rem" }}>
      <AnimatedSection>
        <SectionTitle>Skills & Technologies</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
          {skills.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 50} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function SkillCard({ skill, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(212,175,55,0.12)" : "rgba(6,15,40,0.6)",
        border: `1px solid ${hov ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.15)"}`,
        borderRadius: "12px",
        padding: "1.2rem",
        cursor: "default",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 30px rgba(212,175,55,0.2)" : "0 2px 10px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{skill.icon}</div>
      <div style={{ color: "#D4AF37", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: "0.3rem" }}>{skill.name}</div>
      <div style={{ color: "#8892b0", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{skill.desc}</div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={sectionStyle}>
      <AnimatedSection>
        <SectionTitle>My Projects</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${hov ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.15)"}`,
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.35s ease",
        background: "#06101f",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img src={project.img} alt={project.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.5s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent, rgba(6,15,40,0.85))",
        }} />
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(212,175,55,0.9)", color: "#060F28",
          padding: "0.25rem 0.7rem", borderRadius: "20px",
          fontSize: "0.72rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
        }}>{project.tag}</span>
      </div>
      <div style={{ padding: "1.3rem" }}>
        <h3 style={{ color: "#E8EEFF", fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{project.title}</h3>
        <p style={{ color: "#8892b0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.6 }}>{project.desc}</p>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section id="education" style={{ ...sectionStyle, background: "rgba(13,42,110,0.1)", borderRadius: "24px", margin: "0 1rem 4rem" }}>
      <AnimatedSection>
        <SectionTitle>Education & Certificates</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.2rem" }}>
          {education.map((e) => (
            <EduCard key={e.title} item={e} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function EduCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(212,175,55,0.1)" : "rgba(6,15,40,0.6)",
        border: `1px solid ${hov ? "#D4AF37" : "rgba(212,175,55,0.2)"}`,
        borderRadius: "14px",
        padding: "1.5rem",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "none",
        display: "flex", alignItems: "flex-start", gap: "1rem",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: "2rem" }}>{item.icon}</span>
      <div>
        <div style={{ color: "#ccd6f6", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, marginBottom: "0.3rem" }}>{item.title}</div>
        <div style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>{item.year}</div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section style={sectionStyle}>
      <AnimatedSection>
        <SectionTitle>What Clients Say</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} item={t} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

function TestimonialCard({ item }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      background: hov ? "rgba(212,175,55,0.08)" : "rgba(13,29,78,0.6)",
      border: `1px solid ${hov ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.15)"}`,
      borderRadius: "16px",
      padding: "1.8rem",
      transition: "all 0.3s ease",
      transform: hov ? "translateY(-5px)" : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ color: "#D4AF37", fontSize: "2rem", marginBottom: "0.5rem" }}>"</div>
      <p style={{ color: "#ccd6f6", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1.2rem" }}>{item.text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #D4AF37, #B8960C)", display: "flex", alignItems: "center", justifyContent: "center", color: "#060F28", fontWeight: 700, fontSize: "0.85rem" }}>
          {item.name[0]}
        </div>
        <div>
          <div style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>{item.name}</div>
          <div style={{ color: "#8892b0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem" }}>{item.role}</div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleGmail = () => {
    if (!form.name || !form.email || !form.message) return alert("Please fill all fields!");
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleWhatsApp = () => {
    if (!form.name || !form.message) return alert("Please fill your name and message!");
    const text = encodeURIComponent(`Hi Aya! I'm ${form.name}.\n\n${form.message}\n\nMy email: ${form.email}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" style={sectionStyle}>
      <AnimatedSection>
        <SectionTitle>Get In Touch</SectionTitle>
        <p style={{ textAlign: "center", color: "#8892b0", fontFamily: "'DM Sans', sans-serif", marginBottom: "3rem", maxWidth: "500px", margin: "0 auto 3rem" }}>
          Have a project in mind? I'd love to hear about it. Send me a message via Gmail or WhatsApp!
        </p>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "email", placeholder: "Your Email", type: "email" },
          ].map(f => (
            <input
              key={f.key}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={inputStyle}
            />
          ))}
          <textarea
            placeholder="Your Message..."
            rows={5}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={handleGmail} style={btnStyle("primary")}>
              📧 Send via Gmail
            </button>
            <button
              onClick={handleWhatsApp}
              style={{
                ...btnStyle("whatsapp"),
                border: "none",
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </button>
          </div>
          {sent && (
            <div style={{
              marginTop: "1rem",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: "8px", padding: "0.8rem 1.2rem",
              color: "#4ade80", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
            }}>
              ✓ Gmail opened! Your message is ready to send.
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(212,175,55,0.15)",
      padding: "2.5rem 2rem",
      textAlign: "center",
      background: "rgba(6,10,25,0.8)",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#D4AF37", marginBottom: "1rem" }}>
        Aya Elhenawey
      </div>
      <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <SocialLink href="https://www.linkedin.com/in/aya-elhenawey/" label="LinkedIn" />
        <SocialLink href="https://github.com/ayaelhenawey-ship-it" label="GitHub" />
        <SocialLink href={`mailto:${EMAIL}`} label="Email" />
        <SocialLink href={`https://wa.me/${WHATSAPP}`} label="WhatsApp" />
      </div>
      <p style={{ color: "#4a5568", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}>
        © 2025 Aya Elhenawey. All rights reserved. Built with React ⚛️
      </p>
    </footer>
  );
}

// Floating WhatsApp button
function FloatingWA() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=Hi%20Aya!%20I%20saw%20your%20portfolio%20and%20I'd%20love%20to%20connect!`}
      target="_blank" rel="noreferrer"
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999,
        width: "56px", height: "56px", borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? "0 8px 30px rgba(37,211,102,0.6)" : "0 4px 20px rgba(37,211,102,0.4)",
        transform: hov ? "scale(1.1)" : "scale(1)",
        transition: "all 0.3s ease",
        textDecoration: "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Chat on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ---- Shared styles ----
const sectionStyle = {
  maxWidth: "1100px",
  margin: "0 auto 5rem",
  padding: "3rem 1.5rem",
};

function SectionTitle({ children }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <p style={{ color: "#D4AF37", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.5rem" }}>
        ✦ Portfolio
      </p>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
        color: "#E8EEFF",
        fontWeight: 800,
      }}>
        {children}
      </h2>
      <div style={{ width: "60px", height: "3px", background: "linear-gradient(90deg, #D4AF37, transparent)", margin: "1rem auto 0", borderRadius: "2px" }} />
    </div>
  );
}

function btnStyle(type) {
  const base = {
    padding: "0.75rem 1.8rem",
    borderRadius: "30px",
    fontWeight: 700,
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
  };
  if (type === "primary") return { ...base, background: "linear-gradient(135deg, #D4AF37, #B8960C)", color: "#060F28", boxShadow: "0 4px 20px rgba(212,175,55,0.4)" };
  if (type === "whatsapp") return { ...base, background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" };
  return base;
}

const inputStyle = {
  width: "100%",
  background: "rgba(13,29,78,0.5)",
  border: "1px solid rgba(212,175,55,0.25)",
  borderRadius: "10px",
  padding: "0.85rem 1.2rem",
  color: "#ccd6f6",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  marginBottom: "1rem",
  display: "block",
  boxSizing: "border-box",
};

// ---- Main App ----
export default function App() {
  const [active, setActive] = useState("About");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060F28; color: #E8EEFF; overflow-x: hidden; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes float { from { transform: translateY(0) scale(1); } to { transform: translateY(-20px) scale(1.05); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        input:focus, textarea:focus { border-color: rgba(212,175,55,0.6) !important; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
        ::selection { background: rgba(212,175,55,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060F28; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 3px; }
      `}</style>

      <NavBar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingWA />
    </>
  );
}
