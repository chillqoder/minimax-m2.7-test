import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Meridian Architecture',
    category: 'BRAND IDENTITY',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '02',
    title: 'Obsidian Fashion',
    category: 'EDITORIAL',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    span: 'col-span-5',
  },
  {
    id: '03',
    title: 'Kōyō Ginza',
    category: 'SPATIAL DESIGN',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    span: 'col-span-5',
  },
  {
    id: '04',
    title: 'Volta Electric',
    category: 'DIGITAL',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '05',
    title: 'Noor Cosmetics',
    category: 'BRAND IDENTITY',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    span: 'col-span-7',
  },
  {
    id: '06',
    title: 'Atlas Quarterly',
    category: 'EDITORIAL',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    span: 'col-span-5',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      data-project-card
      className={`relative overflow-hidden ${project.span} aspect-[4/3] group`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-600 ease-out scale-100 group-hover:scale-105"
        style={{ transitionDuration: '0.6s' }}
      />

      <div className="absolute top-4 left-4 font-mono text-xs text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {project.year}
      </div>

      <div className="absolute top-4 left-4 font-mono text-xs text-paper/80">
        {project.id}
      </div>

      <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-mono text-[10px] text-acid tracking-system mb-2">
            {project.category}
          </p>
          <h3
            className="text-2xl text-paper relative inline-block"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {project.title}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-vermillion group-hover:w-full transition-all duration-500" />
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function WorkGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 px-6 max-w-grid mx-auto grain"
    >
      <div className="mb-16">
        <span className="font-mono text-[10px] tracking-system text-ash">
          [ SELECTED WORK ]
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
