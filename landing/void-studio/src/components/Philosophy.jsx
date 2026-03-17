import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quote = 'Design is not decoration. It is the architecture of attention.';
const words = quote.split(' ');

const disciplines = ['BRANDING', 'DIGITAL', 'SPATIAL', 'MOTION'];

export default function Philosophy() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const disciplineRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = quoteRef.current.querySelectorAll('.word');

      gsap.from(wordElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      });

      disciplineRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          x: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.6 + i * 0.2,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-ink py-32 px-6 relative"
    >
      <div className="h-[6px] bg-acid w-full mb-24" />

      <div className="max-w-grid mx-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <blockquote
            ref={quoteRef}
            className="italic text-paper text-balance leading-tight"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)', fontFamily: '"Fraunces", serif' }}
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </blockquote>
        </div>

        <div className="md:w-64 flex flex-col justify-end">
          <div className="space-y-4 text-right">
            {disciplines.map(( discipline, i) => (
              <p
                key={discipline}
                ref={(el) => (disciplineRefs.current[i] = el)}
                className="font-mono text-xs text-paper/60 tracking-system"
              >
                {discipline}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[6px] bg-acid w-full mt-24" />
    </section>
  );
}
