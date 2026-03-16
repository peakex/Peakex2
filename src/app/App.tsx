import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { FadeIn } from './components/FadeIn';
import { Sun, Moon, Instagram, MessageSquare } from 'lucide-react';
import { XIcon, DiscordIcon } from './components/Icons';
import peakLogo from '../assets/6c1ad29fe28a41934639a5fda0cbf939b8d2ef87.png';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export const ThemeContext = React.createContext({ theme: 'dark', toggleTheme: () => { } });

function Navbar() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <nav className="nav-header">
      <a href="#hero" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ImageWithFallback
          src={peakLogo}
          alt="Peak Ex Logo"
          style={{ width: '63px', height: '63px', objectFit: 'contain', mixBlendMode: theme === 'light' ? 'multiply' : 'screen', filter: theme === 'light' ? 'invert(1)' : 'none' }}
        />
        <span className="text-[24px]">PEAK<span className="sl">  </span>EX</span>
      </a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#program">Program</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 mr-2">
          <a href="https://x.com/thepeakex" target="_blank" rel="noopener noreferrer" className="social-link" title="X (Twitter)"><XIcon size={14} /></a>
          <a href="https://www.instagram.com/thepeakex/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram"><Instagram size={14} /></a>
          <a href="https://discord.gg/xxbPnbukEy" target="_blank" rel="noopener noreferrer" className="social-link" title="Discord"><DiscordIcon size={14} /></a>
        </div>
        <button
          onClick={toggleTheme}
          className="text-[var(--offwhite)] hover:text-[var(--ng)] transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="https://forms.gle/ne34sghCSUdwxTD18" target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:inline-block">Apply Now</a>
        <button className="nav-hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </nav>
  );
}

function What() {
  return (
    <>
      <section id="what" className="section-pad">
        <FadeIn className="what-left">
          <div className="section-label-v">// SYSTEM INIT</div>
          <h2>THIS IS<br />NOT A<br />CO-LIVING<br /><em>SPACE.</em></h2>
        </FadeIn>
        <FadeIn delay={0.12} className="what-right">
          <p>
            Peak Ex is a high-performance residency for founders. You live together. You build together. You ship real products in weeks, not months.<br /><br />
            No pitch theater. No vanity metrics. No startup cosplay. Just builders doing the work.
          </p>
          <div className="stats-grid">
            <div className="stat-block">
              <div className="stat-label">Duration</div>
              <div className="stat-value">50-Day<br />Sprints</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Environment</div>
              <div className="stat-value">24/7<br />Builder</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Standard</div>
              <div className="stat-value">Zero<br />Excuses</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Base 01</div>
              <div className="stat-value">Delhi<br />NCR</div>
            </div>
          </div>
        </FadeIn>
      </section>
      <div className="divider"></div>
    </>
  );
}

function Who() {
  return (
    <>
      <section id="who" className="section-pad">
        <FadeIn className="section-label-v">// WHO GETS ACCESS</FadeIn>
        <FadeIn as="h2" delay={0.12}>FOR THE<br />OBSESSED.</FadeIn>
        <div className="who-grid">
          <FadeIn className="who-card">
            <div className="who-num">01 // FOUNDERS</div>
            <h3>Early-Stage<br />Founders</h3>
            <p>You have an idea and a burning need to prove it works. Done theorizing. Shipping is the only metric that matters.</p>
          </FadeIn>
          <FadeIn delay={0.24} className="who-card">
            <div className="who-num">02 // BUILDERS</div>
            <h3>Technical<br />Builders</h3>
            <p>Engineers who can't stop building. You see a problem and your first instinct is to code the solution. Fast, ruthless, relentless.</p>
          </FadeIn>
          <FadeIn delay={0.36} className="who-card">
            <div className="who-num">03 // DESIGNERS</div>
            <h3>Designers<br />Shipping Product</h3>
            <p>Not mockup artists. Designers who think in systems and ship in production. Your portfolio is a live URL, not a Figma link.</p>
          </FadeIn>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
}

function Program() {
  return (
    <>
      <section id="program" className="section-pad">
        <FadeIn className="section-label-v">// ACCESS LEVELS</FadeIn>
        <FadeIn as="h2" delay={0.12}>THE<br />PROGRAM.</FadeIn>
        <div className="prog-grid">
          <FadeIn className="prog-card">
            <div className="prog-access">ACCESS LEVEL 01 // ENTRY</div>
            <div className="prog-title">Foundation</div>
            <ul className="prog-items">
              <li>30-day live-in residency</li>
              <li>Daily build sprints</li>
              <li>Founder accountability system</li>
              <li>Structured workblock schedules</li>
              <li>Peer code &amp; product reviews</li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.24} className="prog-card">
            <div className="prog-access">ACCESS LEVEL 02 // BUILD MODE</div>
            <div className="prog-title">Execution</div>
            <ul className="prog-items">
              <li>1:1 founder mentorship</li>
              <li>Private technical workshops</li>
              <li>Real-time product feedback</li>
              <li>Growth architecture sessions</li>
              <li>Investor network access</li>
            </ul>
          </FadeIn>
          <FadeIn delay={0.36} className="prog-card">
            <div className="prog-access">ACCESS LEVEL 03 // DEMO DAY</div>
            <div className="prog-title">Launch</div>
            <ul className="prog-items">
              <li>Curated investor room</li>
              <li>Pitch refinement sessions</li>
              <li>Launch strategy development</li>
              <li>Media &amp; press intro</li>
              <li>Post-cohort alumni network</li>
            </ul>
          </FadeIn>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
}

function Proof() {
  return (
    <>
      <section id="proof" className="section-pad">
        <FadeIn className="section-label-v">// BUILDER LOGS</FadeIn>
        <FadeIn as="h2" delay={0.12}>BUILT BY<br />DOERS.</FadeIn>
        <div className="proof-grid">
          <FadeIn className="proof-card">
            <div className="proof-meta">RESIDENT_001 // COHORT 01 // DELHI NCR</div>
            <p className="proof-text">"I shipped more in 30 days here than in 6 months working alone. The environment makes it impossible to not build."</p>
            <div className="proof-author">A.K.</div>
            <div className="proof-role">SaaS Founder, Series A pending</div>
          </FadeIn>
          <FadeIn delay={0.24} className="proof-card">
            <div className="proof-meta">RESIDENT_002 // COHORT 01 // DELHI NCR</div>
            <p className="proof-text">"This is not a bootcamp. This is what happens when you put intense builders in the same room and say go. We launched on day 28."</p>
            <div className="proof-author">M.R.</div>
            <div className="proof-role">Technical Co-Founder</div>
          </FadeIn>
          <FadeIn delay={0.36} className="proof-card">
            <div className="proof-meta">RESIDENT_003 // COHORT 01 // DELHI NCR</div>
            <p className="proof-text">"The accountability alone is worth it. When everyone around you is shipping daily, slowing down feels physically uncomfortable."</p>
            <div className="proof-author">J.T.</div>
            <div className="proof-role">Product Designer → Founder</div>
          </FadeIn>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
}

function About() {
  return (
    <>
      <section id="about" className="section-pad">
        <FadeIn className="about-left">
          <div className="section-label-v">// PHILOSOPHY</div>
          <h2>WHY<br />THIS<br />EXISTS.</h2>
        </FadeIn>
        <FadeIn delay={0.24} className="about-right">
          <p><strong>The best companies aren't built in classrooms or conferences.</strong> They're built in rooms full of people who care too much, sleep too little, and can't stop working on the thing.</p>
          <p>Peak Ex exists because the current model of founder support is broken. Accelerators optimize for pitch decks. Co-working spaces sell you a desk. Neither gives you what you actually need: <strong>an environment engineered for building.</strong></p>
          <p>We start in <strong>Delhi NCR</strong> — India's most concentrated builder ecosystem. A city that builds fast, ships hard, and doesn't wait for permission.</p>
          <p><strong>This is the future of founder communities.</strong> Smaller. More intense. Built around output, not optics.</p>
        </FadeIn>
      </section>
      <div className="divider"></div>
    </>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Is this a startup accelerator?", a: "No. We are a builder residency. Accelerators optimize for decks. We optimize for shipping product." },
    { q: "Where is Peak Ex based?", a: "Base 01 is Delhi NCR, India. We chose Delhi for its raw builder energy, technical talent density, and zero tolerance for pretense." },
    { q: "Do I need funding to join?", a: "No. Just conviction. We select on builder capacity and obsession, not bank balance." },
    { q: "How many founders per cohort?", a: "Cohorts are intentionally small. Small enough that everyone knows what everyone is building. Quality over quantity." },
    { q: "Is there an equity requirement?", a: "No equity taken. We accelerate your velocity, not own your outcome." }
  ];

  return (
    <>
      <section id="faq" className="section-pad">
        <div className="faq-inner">
          <FadeIn className="section-label-v">// SYSTEM LOGS</FadeIn>
          <FadeIn as="h2" delay={0.12}>QUESTIONS<br />ANSWERED.</FadeIn>
          <FadeIn delay={0.24}>
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  {faq.q} <span className="faq-icon">+</span>
                </div>
                <div className="faq-a">
                  <p><span className="lp">&gt;&gt;</span> {faq.a}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
}

function CTA() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <section id="cta" className="relative overflow-hidden">
      <ImageWithFallback
        src={peakLogo}
        alt="Peak Ex Logo Background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.02]"
        style={{ width: 'min(600px, 150vw)', height: 'min(600px, 150vw)', objectFit: 'contain', mixBlendMode: theme === 'light' ? 'multiply' : 'screen', filter: theme === 'light' ? 'invert(1)' : 'none' }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <FadeIn className="section-label-v" style={{ justifyContent: 'center' }}>// FINAL CALL</FadeIn>
        <FadeIn as="h2" delay={0.12}>READY<br />TO BUILD?</FadeIn>
        <FadeIn delay={0.24} as="p">Spots are limited. Delhi NCR. Selection is intentional.</FadeIn>
        <FadeIn delay={0.36}>
          <a href="https://forms.gle/ne34sghCSUdwxTD18" target="_blank" rel="noopener noreferrer" className="btn-p" style={{ display: 'inline-block' }}>APPLY NOW →</a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <footer className="footer-wrap">
      <div className="footer-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ImageWithFallback
          src={peakLogo}
          alt="Peak Ex Logo"
          style={{ width: '15px', height: '15px', objectFit: 'contain', mixBlendMode: theme === 'light' ? 'multiply' : 'screen', filter: theme === 'light' ? 'invert(1)' : 'none' }}
        />
        <span>PEAK <em>//</em> EX</span>
      </div>
      <div className="footer-center">© 2025 PEAK EX — BASE 01: DELHI NCR — BUILD OR GO HOME</div>
      <div className="footer-right">
        <a href="https://x.com/thepeakex" target="_blank" rel="noopener noreferrer" className="social-link" title="X (Twitter)"><XIcon size={18} /></a>
        <a href="https://www.instagram.com/thepeakex/" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram"><Instagram size={18} /></a>
        <a href="https://discord.gg/xxbPnbukEy" target="_blank" rel="noopener noreferrer" className="social-link" title="Discord"><DiscordIcon size={18} /></a>
        <a href="#about">About</a>
        <a href="#program">Program</a>
        <a href="https://forms.gle/ne34sghCSUdwxTD18" target="_blank" rel="noopener noreferrer">Apply</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <Navbar />
        <Hero />
        <Ticker />
        <What />
        <Who />
        <Program />
        <Proof />
        <About />
        <FAQ />
        <CTA />
        <Footer />
      </>
    </ThemeContext.Provider>
  );
}
