// ===================== DATA =====================
const skills = [
  { name: "HTML",         icon: "🌐", desc: "Clean, semantic & responsive layouts" },
  { name: "CSS",          icon: "🎨", desc: "Flexbox, Grid & stunning animations" },
  { name: "JavaScript",   icon: "⚡", desc: "Interactive dynamic web apps" },
  { name: "React.js",     icon: "⚛️", desc: "Reusable UI components & hooks" },
  { name: "Node.js",      icon: "🟢", desc: "Server-side APIs & web apps" },
  { name: "PHP",          icon: "🐘", desc: "Server-side scripting & dynamic pages" },
  { name: "MySQL",        icon: "🗄️", desc: "Database design & management" },
  { name: "WordPress",    icon: "📝", desc: "Custom themes & plugins" },
  { name: "Git & GitHub", icon: "🔧", desc: "Version control & collaboration" },
  { name: "Bootstrap",    icon: "📐", desc: "Responsive fast UI design" },
  { name: "UI/UX Design", icon: "✏️", desc: "Intuitive user-friendly interfaces" },
  { name: "API Integration", icon: "🔌", desc: "Frontend & backend connectivity" },
];

const projects = [
  {
    title: "CodeSphere Academy",
    desc: "An Interactive Learning Platform for Programming and Development Skills.",
    tag: "EdTech",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
  },
  {
    title: "TravelVista",
    desc: "Explore the World with the Best Travel Tours — dynamic web app.",
    tag: "Travel",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  },
  {
    title: "Cafe Royale",
    desc: "Modern Café Website with elegant design & user experience.",
    tag: "Food & Beverage",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",
  },
  {
    title: "Glow Derma Clinic",
    desc: "Professional clinic website with interactive animations.",
    tag: "Healthcare",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
];

const education = [
  { title: "ITI Internship – SWDF",        year: "2025", icon: "🎓" },
  { title: "ITI Internship – FE Developer", year: "2026", icon: "💻" },
  { title: "Web Development Course",        year: "2025", icon: "📚" },
  { title: "UI/UX Design Certificate",      year: "2024", icon: "🎨" },
];

const testimonials = [
  { text: "Aya delivered an amazing website — highly recommended!", name: "Client 1", role: "Business Owner" },
  { text: "Professional, fast, and very talented developer.",         name: "Client 2", role: "Startup Founder" },
  { text: "Creative solutions and excellent communication throughout.", name: "Client 3", role: "Project Manager" },
];

// ===================== RENDER SKILLS =====================
const skillsGrid = document.getElementById("skills-grid");
skills.forEach(s => {
  skillsGrid.innerHTML += `
    <div class="skill-card">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-desc">${s.desc}</div>
    </div>`;
});

// ===================== RENDER PROJECTS =====================
const projectsGrid = document.getElementById("projects-grid");
projects.forEach(p => {
  projectsGrid.innerHTML += `
    <div class="project-card">
      <div class="project-img-wrap">
        <img src="${p.img}" alt="${p.title}" class="project-img" loading="lazy" />
        <div class="project-overlay"></div>
        <span class="project-tag">${p.tag}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
      </div>
    </div>`;
});

// ===================== RENDER EDUCATION =====================
const eduGrid = document.getElementById("edu-grid");
education.forEach(e => {
  eduGrid.innerHTML += `
    <div class="edu-card">
      <span class="edu-icon">${e.icon}</span>
      <div>
        <div class="edu-title">${e.title}</div>
        <div class="edu-year">${e.year}</div>
      </div>
    </div>`;
});

// ===================== RENDER TESTIMONIALS =====================
const testiGrid = document.getElementById("testi-grid");
testimonials.forEach(t => {
  testiGrid.innerHTML += `
    <div class="testi-card">
      <div class="testi-quote">"</div>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">
        <div class="testi-avatar">${t.name[0]}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>`;
});

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  highlightNav();
});

// ===================== BURGER MENU =====================
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
// close on link click
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===================== ACTIVE NAV HIGHLIGHT =====================
function highlightNav() {
  const sections = ["about","skills","projects","education","testimonials","contact"];
  let current = "";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// ===================== TYPING EFFECT =====================
const words = ["Web Developer", "UI Designer", "Frontend Engineer", "Problem Solver"];
let wordIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = words[wordIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ===================== INTERSECTION OBSERVER =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("in-view");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

// ===================== CONTACT FORM =====================
const EMAIL = "ayaelhenawey@gmail.com";
const WHATSAPP = "00201145711345";

document.getElementById("gmail-btn").addEventListener("click", () => {
  const name = document.getElementById("c-name").value.trim();
  const email = document.getElementById("c-email").value.trim();
  const msg = document.getElementById("c-msg").value.trim();
  if (!name || !email || !msg) return alert("Please fill all fields!");
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
  window.open(`https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${subject}&body=${body}`, "_blank");
  const sentMsg = document.getElementById("sent-msg");
  sentMsg.style.display = "block";
  setTimeout(() => { sentMsg.style.display = "none"; }, 4000);
});

document.getElementById("wa-btn").addEventListener("click", () => {
  const name = document.getElementById("c-name").value.trim();
  const email = document.getElementById("c-email").value.trim();
  const msg = document.getElementById("c-msg").value.trim();
  if (!name || !msg) return alert("Please fill your name and message!");
  const text = encodeURIComponent(`Hi Aya! I'm ${name}.\n\n${msg}\n\nMy email: ${email}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
});
