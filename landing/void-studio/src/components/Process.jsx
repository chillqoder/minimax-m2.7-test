import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    id: '01',
    title: 'DISCOVERY',
    yearRange: '2019 — 2020',
    description:
      'We begin with deep listening. Research, stakeholder interviews, competitive analysis. Understanding the landscape before drawing a single line. This is where the foundation is laid.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
  {
    id: '02',
    title: 'STRATEGY',
    yearRange: '2020 — 2021',
    description:
      'Insights crystallize into direction. Positioning, messaging architecture, creative territories. We define the strategic framework that every design decision will be measured against.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    id: '03',
    title: 'CRAFT',
    yearRange: '2021 — 2023',
    description:
      'The hand meets the mind. Iterative design development across all touchpoints. Every detail is considered, every choice is intentional. This is where the work becomes extraordinary.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  },
  {
    id: '04',
    title: 'LAUNCH',
    yearRange: '2023 — PRESENT',
    description:
      'The work meets the world. Implementation, quality assurance, deployment. We shepherd each project into existence with obsessive attention to how it lives and breathes in the real world.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
  },
];

function AccordionItem({ process, isOpen, onClick, index }) {
  const contentRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        maxHeight: '500px',
        duration: 0.5,
        ease: 'power3.inOut',
      });
    } else {
      gsap.to(contentRef.current, {
        maxHeight: '0px',
        duration: 0.4,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`border-l-[4px] transition-colors duration-300 ${
        isOpen ? 'border-acid' : 'border-ash'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-baseline gap-8 py-6 px-6 hover:bg-ink/20 transition-colors"
      >
        <span
          className={`leading-none transition-colors duration-300 ${
            isOpen ? 'text-acid' : 'text-paper/40'
          }`}
          style={{ fontSize: 'clamp(40px,6vw,80px)', fontFamily: '"Playfair Display", serif' }}
        >
          {process.id}
        </span>
        <div className="flex-1 flex items-baseline justify-between gap-4">
          <span
            className="text-2xl text-paper text-left"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {process.title}
          </span>
          <span className="font-mono text-xs text-ash">{process.yearRange}</span>
        </div>
      </button>

      <div ref={contentRef} className="max-h-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-8">
          <p
                className="italic text-paper/80 text-lg leading-relaxed"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
            {process.description}
          </p>
          <div className="relative aspect-video overflow-hidden">
            <img
              src={process.image}
              alt={process.title}
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-ink py-24 px-6"
    >
      <div className="max-w-grid mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[10px] tracking-system text-ash">
            [ METHOD ]
          </span>
        </div>

        <div className="border-t border-ash">
          {processes.map((process, index) => (
            <AccordionItem
              key={process.id}
              process={process}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
