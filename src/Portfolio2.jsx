import React, { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
function Card({ className = "", children }) {
  return <div className={`rounded-3xl border ${className}`}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ asChild, className = "", children }) {
  if (asChild) {
    return React.cloneElement(children, {
      className: `${className} ${children.props.className || ""}`,
    });
  }

  return <button className={className}>{children}</button>;
}

const profileImage = "/profileImage.png";

const contact = {
  name: "Nikhil Mahalingam",
  email: "nikhil.mahalingam@rutgers.edu",
  linkedin: "#",
  github: "#",
};

const beyondClassroomPhotos = [
  {
    src: "/climbing.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/fencing.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/friends.jpg",
    alt: "",
    caption: "",
  },
  {
    src: "/cat.jpg",
    alt: "",
    caption: "",
  },
];

const education = [
  {
    school: "Columbia University",
    logo: "C",
    degree: "M.S. Computer Engineering",
    meta: "Incoming graduate student",
    location: "New York, NY",
    timeframe: "Starting Fall 2026",
    details: ["Graduate study focused on computer engineering, systems, and applied machine learning."],
  },
   {
    school: "Rutgers University — New Brunswick",
    logo: "R",
    degree: "B.S. Electrical/Computer Engineering & Mathematics",
    meta: "Minor: Computer Science",
    location: "New Brunswick, NJ",
    timeframe: "Sep 2022 — May 2026",
    details: [
      "Cumulative GPA: 3.99/4.00",
      "ECE GPA: 4.00/4.00 · Math GPA: 4.00/4.00",
      "Teaching Assistant: Intro to Mathematical Reasoning",
      "Grader: Intro to Linear Algebra",
    ],
  },
];

const experiences = [
  {
    company: "Washington State University — Vancouver REU",
    logo: "WSU",
    role: "Undergraduate Researcher",
    location: "Remote",
    timeframe: "Jun 2025 — Aug 2025",
    icon: "cpu",
    bullets: [
      "Developed a physics-informed neural network surrogate for Navier–Stokes flow in DLD microfluidic chips.",
      "Embedded PDE residuals, hard Dirichlet boundary conditions, and geometry-aware distance fields to predict full 2-D velocity maps.",
      "Improved the accuracy–cost trade-off through residual divergence analysis, GPU-friendly batching, and architecture experiments.",
    ],
  },
  {
    company: "University of Delaware",
    logo: "UD",
    role: "AI / Hardware Security Research Assistant",
    location: "Remote",
    timeframe: "Oct 2024 — May 2025",
    icon: "shield",
    bullets: [
      "Tested Hardware Trojan insertion and detection workflows using LLMs, the OpenAI API, and reinforcement learning agents.",
      "Built Python benchmarking scripts to evaluate files and identify potential vulnerabilities in hardware security workflows.",
    ],
  },
  {
    company: "Major League Baseball",
    logo: "MLB",
    role: "Software Engineer Intern",
    location: "New York, NY",
    timeframe: "Jun 2024 — Aug 2024",
    icon: "code",
    bullets: [
      "Delivered custom React.js and Redux features across six MLB.com monorepos, including All-Star Game, Gameday 3D, stats, and clubs.",
      "Improved accessibility with targeted ARIA enhancements for screen reader users.",
      "Configured Redux middleware URL handling to redirect legacy bookmarks to new routes and preserve user access.",
      "Streamlined CI/CD with GitHub Actions for automated unit testing.",
    ],
  },
  {
    company: "Rutgers University — Aresty Research Program",
    logo: "RU",
    role: "ML / AI Research Assistant",
    location: "Piscataway, NJ",
    timeframe: "Sep 2023 — May 2024",
    icon: "brain",
    bullets: [
      "Optimized hyperparameters and custom loss functions for the MTP-Rail multitask model on a 7,000+ image NJ Transit dataset.",
      "Achieved 93% overall detection accuracy, 64.9% IoU, 78.6% mean pixel accuracy, and 89.6% risk classification.",
      "Redesigned MySQL schema and indexing while re-engineering an InfluxDB backend for 1.5+ TB of time-series data.",
    ],
  },
  {
    company: "Major League Baseball",
    logo: "MLB",
    role: "Software Engineer Intern",
    location: "New York, NY",
    timeframe: "Jun 2023 — Aug 2023",
    icon: "database",
    bullets: [
      "Built MLB Creator Studio, a full-stack platform centralizing 100,000+ automated data visualizations for internal MLB teams.",
      "Integrated Okta authentication and developed player search using MLB’s internal player API.",
      "Moved visualization filters to a PostgreSQL and Express.js backend to accelerate processing for 100,000+ rows of data.",
    ],
  },
];

const skills = {
  Languages: ["Python", "Java", "JavaScript", "TypeScript", "HTML/CSS", "SQL", "Verilog", "MATLAB"],
  Tools: ["Git", "Vercel", "Docker", "Jira", "GCP", "AWS", "Android Studio"],
  Frameworks: ["React", "Flask", "JavaFX", "TensorFlow", "PyTorch", "Node.js", "Express.js", "Redux"],
};

const awards = [
  "HackRU Winner — Spring 2023",
  "SBU Hacks Winner — Fall 2022",
  "Rutgers Competitive Fencing Team Captain",
  "Rutgers Origami Club Web Developer",
  "Machine Learning / AI Club Member",
];

function validatePortfolioData() {
  const requiredExperienceFields = ["company", "role", "timeframe", "location", "bullets"];
  const requiredEducationFields = ["school", "degree", "timeframe", "location", "details"];
  const experienceIsValid = experiences.every((item) => requiredExperienceFields.every((field) => Boolean(item[field])) && item.bullets.length > 0);
  const educationIsValid = education.every((item) => requiredEducationFields.every((field) => Boolean(item[field])) && item.details.length > 0);
  const skillsAreValid = Object.values(skills).every((group) => Array.isArray(group) && group.length > 0);
  return experienceIsValid && educationIsValid && skillsAreValid && Boolean(contact.email);
}

const iconPaths = {
  github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.9 12.9 0 0 0-6.7 0C6.7.3 5.6.6 5.6.6a4.8 4.8 0 0 0-.1 3.6A5.2 5.2 0 0 0 4.1 7.8c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  graduation: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 12h20" /></>,
  trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M5 5H2v2a5 5 0 0 0 5 5" /><path d="M19 5h3v2a5 5 0 0 1-5 5" /></>,
  code: <><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>,
  sparkles: <><path d="M12 3 9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5L12 3Z" /><path d="M5 3v4" /><path d="M3 5h4" /><path d="M19 17v4" /><path d="M17 19h4" /></>,
  cpu: <><rect x="7" y="7" width="10" height="10" rx="2" /><rect x="10" y="10" width="4" height="4" /><path d="M4 10h3M4 14h3M17 10h3M17 14h3M10 4v3M14 4v3M10 17v3M14 17v3" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 5 2.2V4.8A3 3 0 0 0 9 4Z" /><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-5 2.2V4.8A3 3 0 0 1 15 4Z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
};

function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {iconPaths[name] || iconPaths.sparkles}
    </svg>
  );
}

function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: 6 + ((i * 9) % 22),
        left: `${(i * 11) % 100}%`,
        top: `${(i * 17) % 100}%`,
        duration: 9 + (i % 6) * 2,
        delay: (i % 7) * 0.35,
        opacity: 0.08 + (i % 5) * 0.035,
        color: i % 3 === 0 ? "bg-red-700" : i % 3 === 1 ? "bg-orange-400" : "bg-red-400",
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff,#fff8f6_40%,#fff2ee_100%)]" />
      <motion.div
        className="absolute -left-28 -top-28 h-[26rem] w-[26rem] rounded-full bg-red-800/20 blur-3xl"
        animate={reduceMotion ? {} : { x: [0, 40, -16, 0], y: [0, 28, 56, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-6rem] top-20 h-[30rem] w-[30rem] rounded-full bg-orange-400/20 blur-3xl"
        animate={reduceMotion ? {} : { x: [0, -54, -10, 0], y: [0, 34, -24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-red-500/12 blur-3xl"
        animate={reduceMotion ? {} : { x: [0, 30, -32, 0], y: [0, -24, 14, 0] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[55%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-black/6 blur-3xl"
        animate={reduceMotion ? {} : { x: [0, 18, -12, 0], y: [0, -12, 18, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={`absolute rounded-full ${particle.color} shadow-[0_0_18px_rgba(239,68,68,0.18)]`}
          style={{ width: particle.size, height: particle.size, left: particle.left, top: particle.top, opacity: particle.opacity }}
          animate={reduceMotion ? {} : { y: [0, -24, 10, 0], x: [0, 8, -6, 0], opacity: [particle.opacity, particle.opacity + 0.08, particle.opacity], scale: [1, 1.15, 0.96, 1] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.16)_1px,transparent_1px)] [background-size:44px_44px]" />
    </div>
  );
}

function LogoBadge({ children, className = "" }) {
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-gradient-to-br from-red-800 via-red-600 to-orange-500 text-sm font-black tracking-tight text-white shadow-lg shadow-red-800/10 ${className}`}>
      {children}
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-red-800/20 via-orange-400/15 to-black/10 blur-2xl" />
      <motion.div whileHover={{ y: -6, rotate: 1 }} transition={{ type: "spring", stiffness: 180, damping: 18 }} className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-white/85 p-3 shadow-[0_22px_70px_rgba(127,29,29,0.16)] backdrop-blur-xl">
        <img src={profileImage} alt="Nikhil Mahalingam" className="h-[420px] w-full rounded-[1.5rem] object-cover object-top sm:h-[520px]" />
      </motion.div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 bg-clip-text text-sm font-bold uppercase tracking-[0.25em] text-transparent">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{children}</p>}
    </div>
  );
}

function TimelineCard({ item, type = "experience" }) {
  const iconName = item.icon || "graduation";

  return (
    <Card className="group overflow-hidden border-red-100/80 bg-white/90 shadow-[0_18px_50px_rgba(127,29,29,0.08)] backdrop-blur transition hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-orange-50/60">
      <CardContent className="p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row">
          <LogoBadge>{item.logo}</LogoBadge>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 bg-clip-text text-transparent">
                  <Icon name={type === "education" ? "graduation" : iconName} className="h-4 w-4 text-red-700" />
                  <span className="text-sm font-semibold">{type === "education" ? item.degree : item.role}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-950">{type === "education" ? item.school : item.company}</h3>
                {item.meta && <p className="mt-1 text-sm text-slate-600">{item.meta}</p>}
              </div>
              <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 px-4 py-3 text-left lg:text-right">
                <p className="text-sm font-bold text-slate-950">{item.timeframe}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 lg:justify-end"><Icon name="map" className="h-3.5 w-3.5" />{item.location}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {(item.bullets || item.details).map((bullet) => (
                <li key={bullet} className="flex gap-3"><Icon name="chevron" className="mt-1 h-4 w-4 shrink-0 text-orange-500" /><span>{bullet}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PolaroidStack({ photos }) {
  return (
    <div className="relative mx-auto mt-10 h-[420px] w-full max-w-4xl sm:h-[480px]">
      {photos.map((photo, index) => {
        const positions = [
          "left-2 top-6 rotate-[-10deg] sm:left-6",
          "left-[22%] top-20 rotate-[8deg] sm:left-[24%]",
          "left-[45%] top-4 rotate-[-7deg] sm:left-[48%]",
          "left-[64%] top-24 rotate-[9deg] sm:left-[68%]",
        ];

        return (
          <div
            key={photo.alt}
            className={`absolute w-[150px] sm:w-[190px] md:w-[210px] ${positions[index]} transition duration-300 hover:z-20 hover:scale-105`}
          >
            <div className="rounded-[1.1rem] border border-red-100 bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
              <div className="overflow-hidden rounded-[0.8rem] border border-red-50 bg-slate-100">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-[170px] w-full object-cover sm:h-[220px]"
                />
              </div>
              <div className="pt-3 text-center">
                <p className="text-sm font-semibold tracking-wide text-slate-700">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const year = new Date().getFullYear();

  useEffect(() => {
    console.assert(validatePortfolioData(), "Portfolio data validation failed: missing required fields.");
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <AnimatedBackground />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 font-black tracking-tight text-slate-950"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-800 via-red-600 to-orange-500 text-white shadow-lg shadow-red-700/20">NM</span>{contact.name}</a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#about" className="transition hover:text-orange-600">About</a>
          <a href="#experience" className="transition hover:text-orange-600">Experience</a>
          <a href="#education" className="transition hover:text-orange-600">Education</a>
          <a href="#skills" className="transition hover:text-orange-600">Skills</a>
        </nav>
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm backdrop-blur"><Icon name="sparkles" className="h-4 w-4 text-orange-500" /> Software Engineer · Researcher · Builder</div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">Nikhil Mahalingam</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">I’m an Electrical/Computer Engineering and Mathematics student at Rutgers, incoming M.S. Computer Engineering student at Columbia, and software engineer with experience across MLB.com, AI research, hardware security, databases, and physics-informed neural networks.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-2xl border-0 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 px-6 py-6 text-base font-bold text-white shadow-lg shadow-red-700/20 hover:from-red-900 hover:via-red-700 hover:to-orange-600"><a href="#experience"><Icon name="briefcase" className="mr-2 h-5 w-5" />View Experience</a></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
            <a className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 shadow-sm transition hover:bg-orange-50 hover:text-orange-700" href={contact.linkedin}><Icon name="linkedin" className="h-4 w-4" />LinkedIn</a>
            <a className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 shadow-sm transition hover:bg-orange-50 hover:text-orange-700" href={contact.github}><Icon name="github" className="h-4 w-4" />GitHub</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex justify-center lg:justify-end">
          <ProfilePhoto />
        </motion.div>
      </section>

      <section id="about" className="relative z-10 border-y border-red-100 bg-gradient-to-b from-red-50/60 to-orange-50/40 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle eyebrow="About" title="A builder at the intersection of software, math, and AI." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-red-100 bg-white/90 shadow-[0_14px_40px_rgba(127,29,29,0.07)]"><CardContent className="p-6 text-base leading-7 text-slate-700">I enjoy turning complex technical ideas into polished products, from high-traffic sports experiences at MLB to research systems for rail perception, microfluidics, and hardware security.</CardContent></Card>
            <Card className="border-red-100 bg-white/90 shadow-[0_14px_40px_rgba(127,29,29,0.07)]"><CardContent className="p-6 text-base leading-7 text-slate-700">My background combines rigorous mathematics, electrical and computer engineering, full-stack development, databases, machine learning, and research-driven experimentation.</CardContent></Card>
            <Card className="border-red-100 bg-white/90 shadow-[0_14px_40px_rgba(127,29,29,0.07)] sm:col-span-2"><CardContent className="p-6 text-base leading-7 text-slate-700">Outside of engineering, I compete with and captain the Rutgers Competitive Fencing Team, build community websites, participate in hackathons, and keep exploring new ways to apply AI to real-world systems.</CardContent></Card>
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionTitle eyebrow="Experience" title="Work and research experience">Internships and research roles spanning frontend, full-stack systems, AI, hardware security, databases, and physics-informed modeling.</SectionTitle>
        <div className="space-y-5">{experiences.map((item) => <TimelineCard key={`${item.company}-${item.timeframe}`} item={item} />)}</div>
      </section>

      <section id="education" className="relative z-10 bg-gradient-to-b from-white to-orange-50/35 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Education" title="Academic background">A dual foundation in computer engineering, mathematics, systems, and applied machine learning.</SectionTitle>
          <div className="space-y-5">{education.map((item) => <TimelineCard key={item.school} item={item} type="education" />)}</div>
        </div>
      </section>

      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionTitle eyebrow="Skills" title="Technical toolkit" />
        <div className="grid gap-5 md:grid-cols-3">
          {Object.entries(skills).map(([group, list]) => (
            <Card key={group} className="border-red-100/80 bg-white/90 shadow-[0_18px_50px_rgba(127,29,29,0.08)] backdrop-blur transition hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-orange-50/60">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-black text-slate-950">{group}</h3>
                <div className="flex flex-wrap gap-2">{list.map((skill) => <span key={skill} className="rounded-full border border-red-100 bg-gradient-to-br from-red-50 to-orange-50 px-3 py-1.5 text-sm text-slate-700">{skill}</span>)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

<section className="relative z-10 border-y border-red-100 bg-gradient-to-b from-red-50/50 to-orange-50/40 px-5 py-20 sm:px-8">
  <div className="mx-auto max-w-6xl">
    <SectionTitle eyebrow="Awards & Activities" title="Beyond the classroom">
      A few snapshots from the communities, competitions, and projects that shape who I am outside of coursework.
    </SectionTitle>

    <PolaroidStack photos={beyondClassroomPhotos} />

    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {awards.map((award) => (
        <div
          key={award}
          className="flex items-center gap-3 rounded-3xl border border-red-100 bg-white/90 p-5 text-slate-700 shadow-[0_14px_35px_rgba(127,29,29,0.07)]"
        >
          <Icon name="trophy" className="h-5 w-5 shrink-0 text-orange-500" />
          <span className="font-semibold">{award}</span>
        </div>
      ))}
    </div>
  </div>
</section>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {year} {contact.name}. Built with React, Tailwind, and Framer Motion.</p>
        <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 bg-clip-text font-semibold text-transparent">{contact.email} <Icon name="external" className="h-4 w-4 text-orange-500" /></a>
      </footer>
    </main>
  );
}
