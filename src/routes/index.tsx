import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Download, Mail, Phone, Linkedin, Github, ArrowUp, ExternalLink,
  Code2, Cpu, Database, Wrench, GraduationCap, Award, Trophy,
  Sparkles, QrCode, Rocket, BookOpen, Terminal, Layers,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import resumeAsset from "@/assets/resume.asset.json";

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
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-28 md:pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
            <Sparkles className="h-3.5 w-3.5" /> Available for internships
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Hi, I'm <span className="text-gradient">Gowtham V</span>
          </h1>
          <p className="mt-3 text-lg text-slate-300 md:text-xl">
            Artificial Intelligence &amp; Machine Learning Student
          </p>
          <p className="mt-2 min-h-[1.75rem] font-display text-lg font-semibold text-sky-300 caret">
            {typed}
          </p>
          <p className="mt-5 max-w-xl text-slate-300/90">
            B.E. CSE (AI &amp; ML) at Jeppiaar Engineering College. I build clean,
            practical software in Python, Java and C++, and I'm actively growing
            into data science and machine learning through hands-on projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeAsset.url}
              download="Gowtham_V_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-900 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.7)] transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#contact"
              className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-sky-300"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          <Stats />
        </div>

        <div className="relative mx-auto md:ml-auto">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-sky-400/30 to-transparent blur-2xl" aria-hidden />
          <div className="glass glow-ring float-slow relative overflow-hidden rounded-full p-2">
            <img
              src={profileImg}
              alt="Gowtham V portrait"
              width={512}
              height={512}
              className="h-72 w-72 rounded-full object-cover object-center sm:h-80 sm:w-80"
            />
          </div>
          <div className="glass absolute bottom-2 left-0 rounded-full px-3 py-2 text-xs">
            <span className="text-sky-300">●</span> Chennai, India
          </div>
        </div>
      </div>
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
            Intelligence &amp; Machine Learning) student at Jeppiaar Engineering
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
            <h3 className="font-display font-semibold">Programming Languages</h3>
          </div>
          <div className="space-y-4">{langs.map((s) => <Bar key={s.name} {...s} />)}</div>
        </div>
        <div className="glass glass-hover rounded-3xl p-6" data-reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Wrench className="h-5 w-5" /></div>
            <h3 className="font-display font-semibold">Developer Tools</h3>
          </div>
          <div className="space-y-4">{tools.map((s) => <Bar key={s.name} {...s} />)}</div>
        </div>
        <div className="glass glass-hover rounded-3xl p-6" data-reveal>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Cpu className="h-5 w-5" /></div>
            <h3 className="font-display font-semibold">Core Concepts</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {concepts.map((c) => (
              <span key={c} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-3 text-xs text-sky-200">
            <Database className="h-4 w-4" /> Domains: AI, ML, Data Science, Software Dev
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const main = {
    title: "Smart QR Attendance System",
    tag: "Featured Project",
    desc: "A modern attendance platform that replaces paper roll calls with dynamic QR codes. Students scan a session-specific code from their phones, and attendance syncs instantly to a secure dashboard.",
    tech: ["Python", "Android (Java)", "SQLite", "QR Code API", "REST"],
    features: [
      "Dynamic, time-bound QR codes to prevent proxy attendance",
      "Instant marking via mobile camera scan",
      "Admin dashboard with per-class analytics",
      "Offline capture with automatic sync on reconnect",
    ],
    challenges:
      "Designing tamper-resistant, short-lived QR tokens and reconciling offline scans without duplicates.",
    learned:
      "Cross-platform data flow between Android and a Python backend, session-based auth, and clean separation between UI, service and data layers.",
  };
  const others = [
    {
      title: "Student Record Management System",
      desc: "Console-based CRUD system in Python with persistent file storage, modular OOP design, and fast search/update.",
      tech: ["Python", "OOP", "File Handling"],
    },
    {
      title: "Data Science Sandbox",
      desc: "NPTEL-driven notebooks exploring Pandas, NumPy, and matplotlib workflows for real datasets.",
      tech: ["Python", "Pandas", "NumPy"],
    },
    {
      title: "DSA Practice Playground",
      desc: "Curated set of C++ solutions to classic Data Structures & Algorithms problems, focused on clarity.",
      tech: ["C++", "DSA"],
    },
  ];
  return (
    <Section id="projects">
      <SectionHeader eyebrow="Projects" title="Selected work" desc="A mix of course, competition and self-driven builds." />

      <div className="glass glass-hover rounded-3xl p-6 sm:p-8" data-reveal>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
              <Sparkles className="h-3.5 w-3.5" /> {main.tag}
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{main.title}</h3>
            <p className="mt-3 text-slate-300">{main.desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {main.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{t}</span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoBlock icon={<Trophy className="h-4 w-4" />} title="Challenges">
                {main.challenges}
              </InfoBlock>
              <InfoBlock icon={<BookOpen className="h-4 w-4" />} title="What I learned">
                {main.learned}
              </InfoBlock>
            </div>
          </div>

          <div className="relative">
            <div className="glass glow-ring aspect-square w-full rounded-3xl p-6">
              <div className="grid h-full place-items-center rounded-2xl bg-gradient-to-br from-sky-400/10 to-transparent">
                <QrCode className="h-32 w-32 text-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-xs uppercase tracking-widest text-slate-400">Key features</div>
              <ul className="space-y-2 text-sm text-slate-200">
                {main.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {others.map((p) => (
          <div key={p.title} className="glass glass-hover rounded-3xl p-6" data-reveal>
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-400/15 text-sky-300"><Terminal className="h-5 w-5" /></div>
              <ExternalLink className="h-4 w-4 text-slate-500" />
            </div>
            <h4 className="mt-4 font-display font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function InfoBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-sky-300">{icon}<span className="text-xs uppercase tracking-wider">{title}</span></div>
      <p className="mt-2 text-sm text-slate-200">{children}</p>
    </div>
  );
}

function Certifications() {
  const items = [
    { title: "NPTEL — Data Science with Python", org: "IIT / NPTEL", note: "In progress", icon: <Database className="h-5 w-5" /> },
    { title: "Certificate in 3D Animation", org: "Modeling, animation & rendering", note: "Completed", icon: <Award className="h-5 w-5" /> },
    { title: "Python Programming Workshop", org: "Fundamentals & problem solving", note: "Completed", icon: <Code2 className="h-5 w-5" /> },
    { title: "3D Animation Workshop", org: "Hands-on training", note: "Completed", icon: <Sparkles className="h-5 w-5" /> },
  ];
  return (
    <Section id="certifications">
      <SectionHeader eyebrow="Credentials" title="Certifications & Training" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c) => (
          <div key={c.title} className="glass glass-hover rounded-3xl p-6" data-reveal>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-400/15 text-sky-300">{c.icon}</div>
            <h4 className="mt-4 font-display font-semibold">{c.title}</h4>
            <p className="mt-1 text-sm text-slate-400">{c.org}</p>
            <span className="mt-4 inline-flex rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-0.5 text-[11px] text-sky-300">{c.note}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Achievements() {
  const items = [
    { icon: <Trophy className="h-5 w-5" />, title: "Technical Symposium Participant", desc: "Presented and networked at inter-college technical symposiums." },
    { icon: <Code2 className="h-5 w-5" />, title: "Coding Competitions", desc: "Active on LeetCode, solving DSA problems in Python and C++." },
    { icon: <GraduationCap className="h-5 w-5" />, title: "Academic Excellence", desc: "Consistent academic performance with strong CS fundamentals." },
    { icon: <Sparkles className="h-5 w-5" />, title: "Workshops & Training", desc: "Hands-on training across Python and 3D animation tooling." },
  ];
  return (
    <Section id="achievements">
      <SectionHeader eyebrow="Highlights" title="Achievements" />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a) => (
          <div key={a.title} className="glass glass-hover flex gap-4 rounded-3xl p-6" data-reveal>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-400/15 text-sky-300">{a.icon}</div>
            <div className="min-w-0">
              <h4 className="font-display font-semibold">{a.title}</h4>
              <p className="mt-1 text-sm text-slate-300">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ResumeCTA() {
  return (
    <Section id="resume">
      <div className="glass glow-ring relative overflow-hidden rounded-3xl p-8 sm:p-12" data-reveal>
        <div className="absolute inset-0 -z-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">Resume</div>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Get the full picture</h2>
            <p className="mt-2 max-w-xl text-slate-300">
              Download my latest resume for a complete overview of my education,
              projects, technical skills and certifications.
            </p>
          </div>
          <a
            href={resumeAsset.url}
            download="Gowtham_V_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 font-semibold text-slate-900 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.7)] transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" /> Download Resume (PDF)
          </a>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const items = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "vgvgowtham585@gmail.com", href: "mailto:vgvgowtham585@gmail.com" },
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "Available on request", href: "mailto:vgvgowtham585@gmail.com" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: "linkedin.com/in/gowtham-v", href: "https://linkedin.com/in/gowtham-v" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/GowthamV", href: "https://github.com/GowthamV" },
  ];
  return (
    <Section id="contact">
      <SectionHeader eyebrow="Contact" title="Let's build something" desc="Open to internships, collaborations, and interesting problems." />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="glass glass-hover flex items-center gap-4 rounded-3xl p-6"
            data-reveal
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-400/15 text-sky-300">{c.icon}</div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-slate-400">{c.label}</div>
              <div className="truncate font-display font-semibold text-slate-100">{c.value}</div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-slate-400">© {new Date().getFullYear()} Gowtham V. Crafted with care.</div>
        <div className="flex items-center gap-3">
          {[
            { icon: <Github className="h-4 w-4" />, href: "https://github.com/GowthamV" },
            { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/in/gowtham-v" },
            { icon: <Mail className="h-4 w-4" />, href: "mailto:vgvgowtham585@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer" className="glass glass-hover grid h-9 w-9 place-items-center rounded-full text-sky-300">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
