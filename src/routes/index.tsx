import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Download, Mail, Github, ArrowUp, GraduationCap, Layers,
} from "lucide-react";
import resumeAsset from "@/assets/resume.asset.json";
import { motion } from "framer-motion";

// Reliable profile image (GitHub avatar)
const profileUrl = "https://avatars.githubusercontent.com/u/306114697?v=4&s=400";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gowtham V" },
      { name: "description", content: "Gowtham V — 2nd year B.E. CSE (AI & ML) student at Jeppiaar Engineering College. Python, Java, C++." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("opacity-100", "translate-y-0");
          e.target.classList.remove("opacity-0", "translate-y-6");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => {
      el.classList.add("transition-all", "duration-700", "ease-out", "opacity-0", "translate-y-6");
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

function Portfolio() {
  useReveal();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <Nav active={active} scrolled={scrolled} />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="glass glass-hover fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-sky-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function Nav({ active, scrolled }: { active: string; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-5xl px-4">
        <div className={`glass flex items-center justify-between rounded-2xl px-4 py-2.5 ${scrolled ? "glow-ring" : ""}`}>
          <a href="#home" className="font-display text-lg font-bold tracking-tight">
            <span className="text-gradient">Gowtham.V</span>
          </a>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === n.id
                    ? "bg-sky-400/15 text-sky-300"
                    : "text-slate-300 hover:text-sky-300"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={resumeAsset.url}
            download="Gowtham_V_Resume.pdf"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-sky-400 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button
            className="md:hidden rounded-lg p-2 text-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Layers className="h-5 w-5" />
          </button>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-2 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm ${
                  active === n.id ? "bg-sky-400/15 text-sky-300" : "text-slate-200"
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[90vh] items-center px-4 pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Gowtham V
          </h1>
          <p className="mt-3 text-lg text-slate-300">
            B.E. CSE (AI & ML) · 2nd Year
          </p>
          <p className="mt-1 text-base text-slate-400">
            Jeppiaar Engineering College · Chennai
          </p>
          <p className="mt-6 max-w-md text-slate-300/90 leading-relaxed">
            Writing code in Python, Java and C++. Currently learning data science through NPTEL.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeAsset.url}
              download="Gowtham_V_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.6)] transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
            <a
              href="#contact"
              className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-sky-300"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-4 rounded-full bg-sky-400/20 blur-2xl" aria-hidden />
          <div className="glass glow-ring relative overflow-hidden rounded-full p-1.5">
            <img
              src={profileUrl}
              alt="Gowtham V"
              width={400}
              height={400}
              className="h-64 w-64 rounded-full object-cover object-center sm:h-72 sm:w-72 md:h-80 md:w-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center" data-reveal>
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-16">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHeader title="About" />
      <div className="max-w-2xl mx-auto" data-reveal>
        <div className="glass rounded-3xl p-6 md:p-8">
          <p className="text-slate-200/90 leading-relaxed">
            2nd year B.E. Computer Science and Engineering (AI & ML) student at
            Jeppiaar Engineering College. CGPA 7.1/10.
          </p>
          <p className="mt-4 text-slate-200/90 leading-relaxed">
            Comfortable with Python, Java and C++. Currently doing the NPTEL
            Data Science with Python course. Looking for an internship where I
            can write actual code and learn from people who ship things.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Education() {
  const items = [
    {
      title: "B.E. CSE (AI & ML)",
      place: "Jeppiaar Engineering College",
      period: "2nd Year",
      detail: "CGPA 7.1/10",
    },
    {
      title: "NPTEL — Data Science with Python",
      place: "Online",
      period: "In progress",
      detail: "",
    },
  ];
  return (
    <Section id="education">
      <SectionHeader title="Education" />
      <div className="max-w-xl mx-auto space-y-3" data-reveal>
        {items.map((it) => (
          <div key={it.title} className="glass rounded-2xl p-5 flex items-start gap-4">
            <GraduationCap className="h-5 w-5 text-sky-300 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-slate-400">{it.place} · {it.period}</div>
              {it.detail && <div className="text-sm text-slate-300 mt-1">{it.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  const items = ["Python", "Java", "C++", "Git", "Data Structures", "OOP", "Basic ML"];
  return (
    <Section id="skills">
      <SectionHeader title="Skills" />
      <div className="flex flex-wrap justify-center gap-2.5 max-w-lg mx-auto" data-reveal>
        {items.map((s) => (
          <span
            key={s}
            className="rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300"
          >
            {s}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Smart Attendance System",
      desc: "Face recognition attendance using OpenCV + Python.",
      tags: ["Python", "OpenCV"],
    },
    {
      title: "This portfolio",
      desc: "Built with TanStack Start, Tailwind and Framer Motion.",
      tags: ["React", "TypeScript"],
    },
  ];
  return (
    <Section id="projects">
      <SectionHeader title="Projects" />
      <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto" data-reveal>
        {projects.map((p) => (
          <div key={p.title} className="glass glass-hover rounded-2xl p-5">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs text-sky-300/80">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <SectionHeader title="Contact" />
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto" data-reveal>
        <a
          href="mailto:gowtham_dev@outlook.com"
          className="glass glass-hover rounded-2xl px-5 py-3 flex items-center gap-3 text-sm"
        >
          <Mail className="h-4 w-4 text-sky-300" />
          Email
        </a>
        <a
          href="https://github.com/gowtham-v08"
          target="_blank"
          rel="noreferrer"
          className="glass glass-hover rounded-2xl px-5 py-3 flex items-center gap-3 text-sm"
        >
          <Github className="h-4 w-4 text-sky-300" />
          GitHub
        </a>
        <a
          href={resumeAsset.url}
          download="Gowtham_V_Resume.pdf"
          className="rounded-2xl bg-sky-400 px-5 py-3 flex items-center gap-3 text-sm font-semibold text-slate-900"
        >
          <Download className="h-4 w-4" />
          Resume
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 text-center text-sm text-slate-500">
      Gowtham V · Chennai
    </footer>
  );
}
