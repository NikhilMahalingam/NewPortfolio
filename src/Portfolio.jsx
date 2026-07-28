import React, { useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import "./thermal-portfolio.css";

const contact = {
  name: "Nikhil Mahalingam",
  email: "mahalingamnikhil@gmail.com",
  github: "https://github.com/NikhilMahalingam",
  linkedin: "https://www.linkedin.com/in/nikhil-mahalingam/",
};

const education = [
  {
    school: "Columbia University",
    logo: "/logos/columbia.png",
    degree: "M.S. Computer Engineering",
    meta: "Graduate Student",
    location: "New York, NY",
    timeframe: "Starting Fall 2026",
    details: "Graduate study focused on computer engineering, systems, and applied machine learning.",
  },
  {
    school: "Rutgers University — New Brunswick",
    logo: "/logos/rutgers.png",
    degree: "B.S. Electrical/Computer Engineering",
    meta: "Minor: Mathematics",
    location: "New Brunswick, NJ",
    timeframe: "Sep 2022 — May 2026",
    details: "4.00 ECE GPA",
  },
];

const experiences = [
  {
    year: "2025",
    organization: "Washington State University — Vancouver REU",
    logo: "/logos/wsu.png",
    role: "Undergraduate Researcher",
    detail: "Physics-informed neural networks for Navier–Stokes flow in deterministic lateral displacement microfluidic chips.",
    tags: ["PINNs", "PyTorch", "Scientific ML"],
  },
  {
    year: "2024–25",
    organization: "University of Delaware",
    logo: "/logos/uDel.png",
    role: "AI / Hardware Security Research Assistant",
    detail: "LLM- and agent-based workflows for hardware Trojan insertion, detection, and benchmarking.",
    tags: ["AI Agents", "Python", "Hardware Security"],
  },
  {
    year: "2024",
    organization: "Major League Baseball",
    logo: "/logos/mlb.jpg",
    role: "Software Engineer Intern",
    detail: "React and Redux product work across MLB.com experiences, accessibility improvements, routing, and CI/CD.",
    tags: ["React", "Redux", "GitHub Actions"],
  },
  {
    year: "2023–24",
    organization: "Rutgers Aresty Research Program",
    logo: "/logos/rutgers.png",
    role: "ML / AI Research Assistant",
    detail: "Multitask computer vision for NJ Transit safety, plus large-scale MySQL and InfluxDB backend work.",
    tags: ["Computer Vision", "DeepLabV3", "Databases"],
  },
  {
    year: "2023",
    organization: "Major League Baseball",
    logo: "/logos/mlb.jpg",
    role: "Software Engineer Intern",
    detail: "Built Creator Studio, centralizing more than 100,000 automated visualizations for internal teams.",
    tags: ["Remix", "PostgreSQL", "GCP"],
  },
];

/*
const projects = [
  {
    number: "01",
    title: "PINN Microfluidics",
    label: "RESEARCH",
    description: "A differentiable surrogate for fluid flow around DLD post arrays, trained through physical residuals rather than labeled CFD data.",
    tech: "PyTorch · Navier–Stokes · Scientific Computing",
    href: "#",
  },
  {
    number: "02",
    title: "Fencing Match Engine",
    label: "ALGORITHMS",
    description: "A tournament pairing and optimization system built around graph algorithms, shortest paths, and constrained matching.",
    tech: "Python · Graphs · Optimization",
    href: "#",
  },
  {
    number: "03",
    title: "Rail Safety Vision",
    label: "COMPUTER VISION",
    description: "A multitask perception pipeline for segmentation, object detection, and risk classification on railway imagery.",
    tech: "PyTorch · DeepLabV3 · MySQL",
    href: "#",
  },
];
*/

const skills = {
  Languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "Verilog", "MATLAB"],
  Systems: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "GCP", "AWS"],
  Intelligence: ["PyTorch", "TensorFlow", "Computer Vision", "PINNs", "AI Agents"],
};

const lifeMoments = [
  {
    id: "01",
    src: "/life/graduation-climb.jpeg",
    alt: "Climbing indoors while wearing graduation regalia",
    title: "Graduation, but make it climbing",
    category: "CLIMBING",
    caption: "One chapter closed. Another route opened.",
    position: "center 42%",
  },
  {
    id: "02",
    src: "/life/pottery.jpeg",
    alt: "Friends taking a cooking class together in Italy",
    title: "Cooking in Italy",
    category: "ITALY",
    caption: "Gnocchi, ravioli, and tiramisu made from scratch with friends.",
    position: "center 48%",
  },
  {
    id: "03",
    src: "/life/night-climbing.jpeg",
    alt: "Bouldering outdoors between rocks at night",
    title: "After dark",
    category: "BOULDERING",
    caption: "The best problems rarely have obvious solutions.",
    position: "center 43%",
  },
  {
    id: "04",
    src: "/life/fencing.jpeg",
    alt: "Competing in an épée fencing bout",
    title: "Fast-paced chess",
    category: "FENCING",
    caption: "Competition, discipline, and split-second decisions.",
    position: "center 54%",
  },
  {
    id: "05",
    src: "/life/graduate-cat.jpeg",
    alt: "A cat wearing a graduation cap and gown",
    title: "The real graduate",
    category: "HOME",
    caption: "A highly qualified supervisor with questionable attendance.",
    position: "center 38%",
  },
  {
    id: "06",
    src: "/life/climbing-trip.jpeg",
    alt: "Friends hiking through the woods carrying climbing pads",
    title: "The approach",
    category: "OUTDOORS",
    caption: "Good people, heavy crash pads, and somewhere worth going.",
    position: "center 50%",
  },
];

function setHeatPosition(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--heat-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--heat-y", `${event.clientY - rect.top}px`);
}


function WordReveal({ text }) {
  return text.split(" ").map((word, index) => (
    <span className="word-mask" key={`${word}-${index}`}>
      <motion.span
        className="word-reveal"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.72, delay: 0.12 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  ));
}

function IntroCurtain() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <motion.div
      className="intro-curtain"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.9, delay: 0.18, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <motion.span initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.25, delay: 0.35 }}>NM / 26</motion.span>
    </motion.div>
  );
}

function ThermalText({ as: Tag = "span", children, className = "" }) {
  return <Tag className={className}>{children}</Tag>;
}

function ThermalLogo({ src, alt, className = "" }) {
  return (
    <div className={`thermal-logo ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

function Scribble({ className = "" }) {
  return (
    <svg className={`scribble ${className}`} viewBox="0 0 240 70" aria-hidden="true">
      <path d="M5 43c28-33 49 25 72-11 20-30 42 24 65-9 24-34 45 22 92-13" />
      <path d="M8 51c28-32 54 20 78-12 22-29 44 21 68-7 24-28 49 18 79-5" />
    </svg>
  );
}

function AppNav() {
  return (
    <nav className="topbar" aria-label="Primary navigation">
      <a className="signature" href="#top" aria-label="Home"><ThermalText>NM.</ThermalText></a>
      <div className="nav-links">
        <a href="#life"><ThermalText>Life</ThermalText></a>
        <a href="#experience"><ThermalText>Experience</ThermalText></a>
        <a href="#education"><ThermalText>Education</ThermalText></a>
        <a href="#about"><ThermalText>About</ThermalText></a>
      </div>
      <a className="contact-chip" href={`mailto:${contact.email}`}><ThermalText>Contact ↗</ThermalText></a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <ThermalText>ENGINEER · RESEARCHER · CLIMBER · FENCER · ALWAYS LEARNING</ThermalText>
        </motion.p>
        <h1 className="hero-title" aria-label="I turn complex systems into clear, useful technology.">
          <WordReveal text="Hey! I'm" />{` `}
          <em><WordReveal text="Nikhil Mahalingam." /></em>{` `}
        </h1>
        <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
          Software, research, and a little bit of adventure.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <a className="thermal-button" href="#life"><span>See a slice of my life</span></a>
          {/* <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer"><ThermalText>Resume ↗</ThermalText></a> */}
        </motion.div>
      </div>

      <motion.div className="portrait-stage" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <div className="portrait-frame thermal-reveal" onPointerMove={setHeatPosition}>
          <img src="/portrait-sketch.png" alt="Hand-drawn portrait of Nikhil Mahalingam" />
          <span className="portrait-thermal" aria-hidden="true" />
          <span className="portrait-thermal-contours" aria-hidden="true" />
          <span className="portrait-thermal-noise" aria-hidden="true" />
          <span className="portrait-thermal-rim" aria-hidden="true" />
        </div>
        <div className="portrait-note note-one">hover to reveal heat</div>
        <div className="portrait-note note-two">NYC · 2026</div>
        <Scribble className="portrait-scribble" />
        <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}>
          <span>SCROLL</span><i />
        </motion.div>
      </motion.div>
    </header>
  );
}

function ExperienceItem({ item, index }) {
  return (
    <motion.article className="experience-item" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.04 }}>
      <div className="experience-year"><ThermalText>{item.year}</ThermalText></div>
      <ThermalLogo src={item.logo} alt={`${item.organization} logo`} />
      <div className="experience-main">
        <h3><ThermalText>{item.role}</ThermalText></h3>
        <h4><ThermalText>{item.organization}</ThermalText></h4>
        <p>{item.detail}</p>
        <div className="tag-row">{item.tags.map((tag) => <ThermalText key={tag}>{tag}</ThermalText>)}</div>
      </div>
    </motion.article>
  );
}

function EducationCard({ item, index }) {
  return (
    <motion.article className="education-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08 }}>
      <ThermalLogo src={item.logo} alt={`${item.school} logo`} className="education-logo" />
      <div>
        <span className="education-time"><ThermalText>{item.timeframe}</ThermalText></span>
        <h3><ThermalText>{item.school}</ThermalText></h3>
        <h4><ThermalText>{item.degree}</ThermalText></h4>
        <p>{item.meta} · {item.location}</p>
        <p className="education-detail">{item.details}</p>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  const [activeLifeCard, setActiveLifeCard] = useState(null);
  const skillEntries = useMemo(() => Object.entries(skills), []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.22 });

  return (
    <div className="portfolio-shell">
      <IntroCurtain />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="paper-grain" aria-hidden="true" />
      <AppNav />
      <main>
        <Hero />

        <section className="manifesto" aria-label="Design statement">
          <span><ThermalText>01 / SYSTEMS</ThermalText></span>
          <p>Strong engineering is invisible structure. Clear interfaces. Reliable foundations. Thoughtful decisions under the surface.</p>
          <span><ThermalText>02 / CURIOSITY</ThermalText></span>
        </section>

        {/*
          Projects section intentionally saved for later use.
          Restore this block when display-ready projects are available.

          <section className="section" id="work">
            <div className="section-heading">
              <div>
                <span className="kicker">SELECTED WORK</span>
                <h2>Things I’ve made, tested, and obsessed over.</h2>
              </div>
              <Scribble />
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard project={project} index={index} key={project.title} />
              ))}
            </div>
          </section>
        */}

        <section className="section experience-section" id="experience">
          <div className="experience-aside">
            <span className="kicker"><ThermalText>FIELD NOTES</ThermalText></span>
            <h2>Experience across research, product, and everything in between.</h2>
            <p>From shipping fan-facing experiences at MLB to training physics-informed neural networks, I love work that connects theory to the real world.</p>
          </div>
          <div className="experience-list">
            {experiences.map((item, index) => <ExperienceItem item={item} index={index} key={`${item.organization}-${item.year}`} />)}
          </div>
        </section>

        <section className="section education-section" id="education">
          <div className="section-heading">
            <div>
              <span className="kicker"><ThermalText>EDUCATION</ThermalText></span>
              <h2>Built on engineering, mathematics, and curiosity.</h2>
            </div>
            <Scribble />
          </div>
          <div className="education-grid">
            {education.map((item, index) => <EducationCard item={item} index={index} key={item.school} />)}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-poster">
            <div className="poster-copy">
              <span className="kicker"><ThermalText>ABOUT</ThermalText></span>
              <h2>Precise by training.<br /><em>Playful by default.</em></h2>
              <p>I’m an engineer and researcher interested in machine learning, systems, algorithms, and mathematical structure. Outside the terminal, you can usually find me fencing, climbing, folding origami, or finding another problem to overthink.</p>
            </div>
            <div className="poster-mark">NM</div>
          </div>
          <div className="skills-panel">
            {skillEntries.map(([category, items]) => (
              <div className="skill-group" key={category}>
                <h3><ThermalText>{category}</ThermalText></h3>
                <div>{items.map((item) => <ThermalText key={item}>{item}</ThermalText>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="life-editorial-section" id="life">
          <div className="life-editorial-inner">
            <header className="life-editorial-heading">
              <div>
                <span className="life-editorial-kicker">VOL. 01 / BEYOND ENGINEERING</span>
                <h2 className="life-editorial-title">A slice of <em>my life.</em></h2>
              </div>
              <div className="life-editorial-intro">
                <span>FIELD NOTES / ISSUE 04</span>
                <p>Away from the screen, I spend my time fencing, climbing, exploring new places, and making memories with the people around me.</p>
              </div>
            </header>

            <div className="life-editorial-rule">
              <span>SELECTED MOMENTS</span>
              <span>2021 — PRESENT</span>
            </div>

            <div className="life-editorial-grid">
              {lifeMoments.map((moment, index) => (
                <motion.article
                  className={`life-editorial-card${activeLifeCard === moment.id ? " is-active" : ""}`}
                  key={moment.id}
                  onMouseEnter={() => setActiveLifeCard(moment.id)}
                  onFocus={() => setActiveLifeCard(moment.id)}
                  tabIndex={0}
                  style={{ zIndex: activeLifeCard === moment.id ? 50 : undefined }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.045 }}
                >
                  <div className="life-editorial-photo">
                    <img
                      src={moment.src}
                      alt={moment.alt}
                      loading="lazy"
                      style={{ objectPosition: moment.position }}
                    />
                    <span className="life-editorial-index">{moment.id}</span>
                    <span className="life-editorial-category">{moment.category}</span>
                  </div>
                  <div className="life-editorial-copy">
                    <h3>{moment.title}</h3>
                    <p>{moment.caption}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="life-editorial-signoff" aria-hidden="true">
              <span>OUTSIDE THE RÉSUMÉ</span>
              <span className="life-editorial-signoff-mark">✳</span>
              <span>FIELD NOTES / VOL. 01</span>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <span className="kicker"><ThermalText>LET’S BUILD SOMETHING</ThermalText></span>
          <h2>Have a difficult problem<br />worth obsessing over?</h2>
          <a href={`mailto:${contact.email}`}><ThermalText>{contact.email}</ThermalText></a>
          <div className="contact-links">
            <a href={contact.github}><ThermalText>GitHub ↗</ThermalText></a>
            <a href={contact.linkedin}><ThermalText>LinkedIn ↗</ThermalText></a>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Nikhil Mahalingam</span><span>Drawn in ink · revealed in heat</span></footer>
    </div>
  );
}
