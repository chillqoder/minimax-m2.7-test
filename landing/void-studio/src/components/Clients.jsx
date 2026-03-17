import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'MERIDIAN',
  'OBSIDIAN',
  'KŌYŌ',
  'VOLTA',
  'NOOR',
  'ATLAS',
  'SENBA',
  'HAVEN',
];

export default function Clients() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = stripRef.current.querySelectorAll('.client-item');

      gsap.from(items, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="py-24 bg-paper px-6"
    >
      <div className="max-w-grid mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-system text-ash">
            [ TRUSTED BY ]
          </span>
        </div>

        <div
          ref={stripRef}
          className="flex flex-wrap md:flex-nowrap gap-8 md:gap-16 items-center"
        >
          {clients.map((client) => (
            <div
              key={client}
              className="client-item group cursor-pointer"
            >
              <span
                className="font-mono text-2xl text-ash group-hover:text-ink transition-all duration-300 group-hover:scale-105 inline-block"
              >
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
