import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe } from './Globe';
import { FadeIn } from './FadeIn';
import { ThemeContext } from '../App';
import { Instagram } from 'lucide-react';
import { XIcon, DiscordIcon } from './Icons';

export function Hero() {
  const { theme } = React.useContext(ThemeContext);
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll over the entire 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Map scroll progress to a normalized 0-1 range for the transition phase (0 to 66% of scrollable area)
  // This means the animation finishes after 100vh of scrolling, leaving 50vh of sticky pause
  const globeProgress = useTransform(scrollYProgress, [0, 0.66, 1], [0, 1, 1]);

  // Responsive Globe transforms
  const globeLeft = useTransform(globeProgress, (p) => {
    const endLeft = isMobile ? 50 : 75; // Center on mobile, right on desktop
    const ease = p * p * (3 - 2 * p); // Smoothstep easing
    return `${50 + (endLeft - 50) * ease}%`;
  });

  const globeTop = useTransform(globeProgress, (p) => {
    const endTop = isMobile ? 80 : 50; // Move down on mobile, center on desktop
    const ease = p * p * (3 - 2 * p);
    return `${58 + (endTop - 58) * ease}%`;
  });

  const globeScale = useTransform(globeProgress, (p) => {
    const endScale = isMobile ? 0.65 : 1.0;
    const ease = p * p * (3 - 2 * p);
    return 1 + (endScale - 1) * ease;
  });

  // Text 1 (Initial Hero) fades out early
  const text1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // Text 2 (Side by Side) fades in after
  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.66], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.35, 0.66], [100, 0]);

  return (
    <section ref={containerRef} id="hero-sequence" className="relative w-full bg-[var(--bg)] h-[250vh]" style={{ position: 'relative' }}>

      {/* STICKY LAYER - Background & Single Globe Instance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">

          {/* Vignette Background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none transition-colors duration-500"
            style={{
              background: theme === 'light'
                ? `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(236, 236, 235, 0) 0%, rgba(236, 236, 235, 0) 35%, rgba(236, 236, 235, 0.45) 62%, rgba(236, 236, 235, 0.92) 85%, rgba(236, 236, 235, 1) 100%), linear-gradient(180deg, rgba(236, 236, 235, 0.82) 0%, rgba(236, 236, 235, 0) 14%, rgba(236, 236, 235, 0) 78%, rgba(236, 236, 235, 0.95) 100%)`
                : `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(4, 5, 13, 0) 0%, rgba(4, 5, 13, 0) 35%, rgba(4, 5, 13, 0.45) 62%, rgba(4, 5, 13, 0.92) 85%, rgba(4, 5, 13, 1) 100%), linear-gradient(180deg, rgba(4, 5, 13, 0.82) 0%, rgba(4, 5, 13, 0) 14%, rgba(4, 5, 13, 0) 78%, rgba(4, 5, 13, 0.95) 100%)`
            }}
          />

          {/* Interactive Globe Container */}
          <motion.div
            className="absolute pointer-events-auto z-10"
            style={{
              left: globeLeft,
              top: globeTop,
              x: "-50%",
              y: "-50%",
              scale: globeScale,
              width: "min(918px, 108vw)",
              height: "min(918px, 108vw)"
            }}
          >
            <Globe className="w-full h-full" />
          </motion.div>

        </div>
      </div>

      {/* SCROLLING CONTENT LAYER - Text Section 1 */}
      <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center px-8 lg:px-[52px] pointer-events-none z-20 pt-16">
        <motion.div
          className="hero-left text-center pointer-events-auto"
          style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale }}
        >
          <FadeIn delay={0.15} className="hero-tag">
            <span className="htag-dot"></span>ACCESS // 01 — DELHI NCR BASE
          </FadeIn>

          <FadeIn as="h1" delay={0.28} className="hero-h">
            BUILT FOR<br /><span className="soft">founders who refuse</span>MEDIOCRITY.
          </FadeIn>

          <FadeIn as="span" delay={0.41} className="hero-accent">
            BUILD. SHIP. SCALE.
          </FadeIn>

          <FadeIn as="p" delay={0.54} className="hero-sub">
            A private residency for elite builders working on real companies. Not an
            accelerator. Not a co-working space. Something built for the obsessed. Base 01: Delhi NCR.
          </FadeIn>

          <FadeIn delay={0.67} className="hero-actions">
            <a href="https://forms.gle/ne34sghCSUdwxTD18" target="_blank" rel="noopener noreferrer" className="btn-p">APPLY NOW</a>
          </FadeIn>
        </motion.div>

        {/* Social Icons - Bottom Left */}
        <motion.div
          className="absolute bottom-12 left-8 lg:left-[52px] flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto z-30"
          style={{ opacity: text1Opacity, y: text1Y }}
        >
          <div className="flex items-center gap-5">
            <a href="https://x.com/thepeakex" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--ng)] transition-colors" title="X (Twitter)">
              <XIcon size={20} />
            </a>
            <a href="https://www.instagram.com/thepeakex/" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--ng)] transition-colors" title="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://discord.gg/xxbPnbukEy" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--ng)] transition-colors" title="Discord">
              <DiscordIcon size={20} />
            </a>
          </div>


        </motion.div>
      </div>

      {/* SCROLLING CONTENT LAYER - Text Section 2 */}
      {/* Starts at 100vh down, and sticks to center of screen for the remainder of the scroll */}
      <div className="absolute top-[100vh] left-0 w-full h-[150vh] flex px-8 lg:px-[52px] pointer-events-none z-20">
        <div className="sticky top-0 w-full h-[100vh] flex items-center justify-center lg:justify-start max-w-[1400px] mx-auto">
          <motion.div
            className="flex flex-col items-start text-left w-full lg:w-[45%] pointer-events-auto lg:pr-8 max-lg:-mt-24"
            style={{ opacity: text2Opacity, y: text2Y }}
          >
            <div className="hero-tag !justify-start">
              <span className="htag-dot"></span>EXPANSION // 02 — SCALE GLOBALLY
            </div>

            <h2 className="hero-h !text-left !text-[clamp(32px,4vw,64px)] !leading-[1.05]">
              BEYOND<br />
              <span className="soft !text-left !inline-block">borders and limits</span>
              DOMINATION.
            </h2>

            <span className="hero-accent !text-left mt-2 !text-[clamp(12px,1.2vw,18px)]">
              CONNECT. PARTNER. CONQUER.
            </span>

            <p className="hero-sub !text-left mt-6 !max-w-md">
              Join a worldwide syndicate of outlier founders. Scale your operations
              across continents with the backing of an elite international network.
            </p>

            <div className="hero-actions !justify-start mt-8">
              <a href="https://discord.gg/xxbPnbukEy" target="_blank" rel="noopener noreferrer" className="btn-p">JOIN NETWORK</a>
              <a href="#program" className="btn-l">View Reach</a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}