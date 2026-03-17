import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(line1Ref.current, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        delay: 0.3,
      })
        .to(
          line2Ref.current,
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
          },
          '-=0.9'
        )
        .to(
          line3Ref.current,
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
          },
          '-=0.9'
        )
        .to(
          line4Ref.current,
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
          },
          '-=0.9'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] flex grain"
    >
      <div className="w-[60%] flex flex-col justify-end pb-24 pl-16 relative z-10">
        <div
          ref={line1Ref}
          className="font-mono text-[11px] tracking-system mb-8 gsap-mask"
        >
          [ STUDIO — 2019 ]
        </div>

        <div className="overflow-hidden">
          <h1
            ref={line2Ref}
            className="leading-[0.9] tracking-tight gsap-mask"
            style={{ fontSize: 'clamp(80px,12vw,160px)', fontFamily: '"Playfair Display", serif' }}
          >
            We build
          </h1>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={line3Ref}
            className="leading-[0.9] tracking-tight gsap-mask"
            style={{ fontSize: 'clamp(80px,12vw,160px)', fontFamily: '"Playfair Display", serif' }}
          >
            things that
          </h1>
        </div>

        <div className="overflow-hidden">
          <p
            ref={line4Ref}
            className="italic leading-[0.9] gsap-mask"
            style={{ fontSize: 'clamp(80px,12vw,160px)', fontFamily: '"Playfair Display", serif', color: '#D4341A' }}
          >
            cannot be ignored.
          </p>
        </div>
      </div>

      <div className="w-[40%] relative">
        <div
          className="absolute inset-0 grayscale mix-blend-multiply"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </section>
  );
}
