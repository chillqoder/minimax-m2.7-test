import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ghostRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ghostPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ghost = ghostRef.current;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      ghostPos.current.x = lerp(ghostPos.current.x, pos.current.x, 0.15);
      ghostPos.current.y = lerp(ghostPos.current.y, pos.current.y, 0.15);

      if (ghost) {
        ghost.style.transform = `translate(${ghostPos.current.x}px, ${ghostPos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const handleMouseEnterProject = () => setIsHoveringProject(true);
    const handleMouseLeaveProject = () => setIsHoveringProject(false);
    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    const projectCards = document.querySelectorAll('[data-project-card]');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    projectCards.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterProject);
      el.addEventListener('mouseleave', handleMouseLeaveProject);
    });

    window.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      projectCards.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterProject);
        el.removeEventListener('mouseleave', handleMouseLeaveProject);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-acid rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          transform: 'translate(-50%, -50%)',
          width: isHoveringProject ? '64px' : isHovering ? '48px' : '24px',
          height: isHoveringProject ? '64px' : isHovering ? '48px' : '24px',
        }}
      />
      <div
        ref={ghostRef}
        className="fixed top-0 left-0 w-6 h-6 border border-ink rounded-full pointer-events-none z-[9998] opacity-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
