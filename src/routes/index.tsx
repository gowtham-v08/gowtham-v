import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Download, Mail, Phone, Linkedin, Github, ArrowUp, ExternalLink,
  Code2, Cpu, Database, Wrench, GraduationCap, Award, Trophy,
  Sparkles, QrCode, Rocket, BookOpen, Terminal, Layers,
} from "lucide-react";
import profileImg from "@/assets/profile.png.asset.json";
const profileUrl = profileImg.url;
import resumeAsset from "@/assets/resume.asset.json";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gowtham V — AI/ML Developer & Software Engineer" },
      { name: "description", content: "Portfolio of Gowtham V, B.E. CSE (AI & ML) student. Python, Java, C++, Android, and Machine Learning projects." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "vision", label: "Vision" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const TITLES = [
  "AI/ML Engineer",
  "Python Developer",
  "Android Developer",
  "Problem Solver",
];

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      const next = del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!del && next === current) setTimeout(() => setDel(true), 1400);
      else if (del && next === "") { setDel(false); setI((v) => v + 1); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

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

function useCounter(target: number, start: boolean, duration = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return v;
}

function Portfolio() {
  useReveal();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const typed = useTyping(TITLES);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl float-slow" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl float-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <Nav active={active} scrolled={scrolled} />
      <Hero typed={typed} />
      <VisionSection />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <ResumeCTA />
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
      <div className="mx-auto max-w-6xl px-4">
        <div className={`glass flex items-center justify-between rounded-2xl px-4 py-3 ${scrolled ? "glow-ring" : ""}`}>
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

function Hero({ typed }: { typed: string }) {
  return (
    <section id="home" className="relative pt-20">
      <ContainerScroll
        titleComponent={
          <>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Available for internships
            </div>
            <h1 className="text-4xl font-semibold text-white dark:text-white">
              Hi, I'm <span className="text-gradient">Gowtham V</span> <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none text-sky-300">
                AI / ML Developer
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              B.E. CSE (AI & ML) student building practical software with Python, Java & C++.
            </p>
          </>
        }
      >
        <img
          src={profileUrl}
          alt="Gowtham V"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="relative h-[900px] w-full overflow-hidden border-y border-white/5">
      <IntroAnimation />
    </section>
  );
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStart(true); }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const cgpa = useCounter(71, start) / 10;
  const projects = useCounter(4, start);
  const certs = useCounter(2, start);
  const langs = useCounter(3, start);
  return (
    <div ref={ref} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { v: cgpa.toFixed(1), l: "CGPA" },
        { v: projects, l: "Projects" },
        { v: certs, l: "Certifications" },
        { v: langs, l: "Languages" },
      ].map((s) => (
        <div key={s.l} className="glass rounded-2xl p-4 text-center">
          <div className="font-display text-2xl font-bold text-sky-300">{s.v}</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center" data-reveal>
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-slate-300/90">{desc}</p>}
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="About" title="A brief introduction" />
      <div className="grid gap-6 md:grid-cols-3" data-reveal>
        <div className="glass glass-hover rounded-3xl p-6 md:col-span-2">
          <p className="text-slate-200/90 leading-relaxed">
            I'm a detail-oriented B.E. Computer Science and Engineering (Artificial
            Intelligence & Machine Learning) student at Jeppiaar Engineering
            College, currently in my 2nd year with a CGPA of 7.1/10. I have
            hands-on experience in <span className="text-sky-300">Python, Java and C++</span>,
            with a strong foundation in Object-Oriented Programming, Data
            Structures and Algorithms.
          </p>
          <p className="mt-4 text-slate-200/90 leading-relaxed">
            I'm actively growing my Data Science and Machine Learning skills through
            the NPTEL Data Science with Python program, and I love turning ideas into
            reliable, well-structured software. I'm seeking an AI/ML or Software
            Development internship where I can apply my analytical skills to
            real-world engineering problems.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI / ML", "Python", "Android", "Data Science", "OOP", "DSA"].map((t) => (
              <span key={t} className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="glass glass-hover rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="font-display font-semibold">What drives me</div>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {[
              "Building AI/ML systems that solve real problems",
              "Writing clean, modular, well-tested code",
              "Continuous learning through hands-on projects",
              "Collaborating with curious, driven teams",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Education() {
  const items = [
    {
      title: "B.E. Computer Science & Engineering (AI & ML)",
      place: "Jeppiaar Engineering College",
      period: "2nd Year • Ongoing",
      detail: "CGPA: 7.1 / 10 — Coursework in OOP, DSA, Python, ML fundamentals, Data Analysis.",
    },
    {
      title: "NPTEL — Data Science with Python",
      place: "Online Certification (in progress)",
      period: "Currently pursuing",
      detail: "Building foundations in data wrangling, visualization, and ML with Python.",
    },
  ];
  return (
    <Section id="education">
      <SectionHeader eyebrow="Education" title="Academic journey" />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-sky-400/60 via-sky-400/20 to-transparent md:left-1/2" />
        <div className="space-y-8">
          {items.map((it, i) => (
            <div
              key={it.title}
              data-reveal
              className={`relative md:grid md:grid-cols-2 md:gap-8 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}
            >
              <div className="glass glass-hover ml-10 rounded-2xl p-5 md:ml-0">
                <div className="flex items-center gap-2 text-sky-300">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wider">{it.period}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{it.title}</h3>
                <div className="text-sm text-slate-400">{it.place}</div>
                <p className="mt-2 text-sm text-slate-300">{it.detail}</p>
              </div>
              <span className="absolute left-[9px] top-6 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.2)] md:left-1/2 md:-translate-x-1/2" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  const langs = [
    { name: "Python", level: 88 },
    { name: "Java", level: 78 },
    { name: "C++", level: 74 },
  ];
  const tools = [
    { name: "Git & GitHub", level: 82 },
    { name: "VS Code", level: 90 },
    { name: "JSON / File I/O", level: 80 },
  ];
  const concepts = [
    "Object-Oriented Programming",
    "Data Structures & Algorithms",
    "Problem Solving",
    "File Handling",
    "Machine Learning Fundamentals",
    "Data Analysis",
  ];
  const Bar = ({ name, level }: { name: string; level: number }) => (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-200">{name}</span>
        <span className="text-sky-300">{level}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${level}%`, background: "var(--gradient-accent)" }}
        />
      </div>
    </div>
  );
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Skills" title="Technical toolkit" />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass glass-hover rounded-3xl p-6" data-reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Code2 className="h-5 w-5" /></div>
            <div className="font-display font-semibold">Languages</div>
          </div>
          <div className="space-y-4">{langs.map((l) => <Bar key={l.name} {...l} />)}</div>
        </div>
        <div className="glass glass-hover rounded-3xl p-6" data-reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Wrench className="h-5 w-5" /></div>
            <div className="font-display font-semibold">Tools</div>
          </div>
          <div className="space-y-4">{tools.map((t) => <Bar key={t.name} {...t} />)}</div>
        </div>
        <div className="glass glass-hover rounded-3xl p-6" data-reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Cpu className="h-5 w-5" /></div>
            <div className="font-display font-semibold">Concepts</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {concepts.map((c) => (
              <span key={c} className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Smart Attendance System",
      desc: "Face recognition based attendance using OpenCV and Python.",
      tags: ["Python", "OpenCV", "ML"],
    },
    {
      title: "Personal Portfolio",
      desc: "Modern animated portfolio built with TanStack Start + Framer Motion.",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      title: "Android Utility App",
      desc: "Lightweight Android app for daily productivity tasks.",
      tags: ["Java", "Android"],
    },
  ];
  return (
    <Section id="projects">
      <SectionHeader eyebrow="Projects" title="Selected work" />
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <div key={p.title} className="glass glass-hover rounded-3xl p-6" data-reveal>
            <h3 className="font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader eyebrow="Certifications" title="Learning path" />
      <div className="grid gap-4 md:grid-cols-2" data-reveal>
        <div className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
          <Award className="h-6 w-6 text-sky-300 shrink-0" />
          <div>
            <div className="font-semibold">NPTEL — Data Science with Python</div>
            <div className="text-sm text-slate-400">In progress</div>
          </div>
        </div>
        <div className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
          <BookOpen className="h-6 w-6 text-sky-300 shrink-0" />
          <div>
            <div className="font-semibold">Python for Everybody (Coursera)</div>
            <div className="text-sm text-slate-400">Completed</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader eyebrow="Achievements" title="Highlights" />
      <div className="grid gap-4 md:grid-cols-2" data-reveal>
        <div className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
          <Trophy className="h-6 w-6 text-sky-300 shrink-0" />
          <div>
            <div className="font-semibold">Hackathon Participant</div>
            <div className="text-sm text-slate-400">College level AI/ML challenges</div>
          </div>
        </div>
        <div className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
          <Terminal className="h-6 w-6 text-sky-300 shrink-0" />
          <div>
            <div className="font-semibold">Open Source Contributor</div>
            <div className="text-sm text-slate-400">Active on GitHub</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ResumeCTA() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl glass rounded-3xl p-8 md:p-12 text-center" data-reveal>
        <h2 className="font-display text-3xl font-bold">Ready to work together?</h2>
        <p className="mt-3 text-slate-300">Download my resume or get in touch — I'm open to internships and exciting projects.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={resumeAsset.url}
            download="Gowtham_V_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-900 hover:scale-105 transition-transform"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
          <a href="#contact" className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sky-300">
            <Mail className="h-4 w-4" /> Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <SectionHeader eyebrow="Contact" title="Let's connect" />
      <div className="grid gap-6 md:grid-cols-2" data-reveal>
        <a href="mailto:gowtham@example.com" className="glass glass-hover rounded-2xl p-6 flex items-center gap-4">
          <Mail className="h-6 w-6 text-sky-300" />
          <div>
            <div className="font-semibold">Email</div>
            <div className="text-sm text-slate-400">gowtham@example.com</div>
          </div>
        </a>
        <a href="https://github.com/gowtham-v08" target="_blank" rel="noreferrer" className="glass glass-hover rounded-2xl p-6 flex items-center gap-4">
          <Github className="h-6 w-6 text-sky-300" />
          <div>
            <div className="font-semibold">GitHub</div>
            <div className="text-sm text-slate-400">gowtham-v08</div>
          </div>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="glass glass-hover rounded-2xl p-6 flex items-center gap-4">
          <Linkedin className="h-6 w-6 text-sky-300" />
          <div>
            <div className="font-semibold">LinkedIn</div>
            <div className="text-sm text-slate-400">Connect with me</div>
          </div>
        </a>
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <Phone className="h-6 w-6 text-sky-300" />
          <div>
            <div className="font-semibold">Phone</div>
            <div className="text-sm text-slate-400">Available on request</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10 text-center text-sm text-slate-400">
      <div className="mx-auto max-w-6xl">
        © {new Date().getFullYear()} Gowtham V. Built with TanStack Start + Framer Motion.
      </div>
    </footer>
  );
}
