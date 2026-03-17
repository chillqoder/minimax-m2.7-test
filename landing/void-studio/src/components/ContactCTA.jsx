import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen bg-paper relative overflow-hidden grain"
    >
      <div
        className="absolute rotate-slow pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '600px',
          color: 'rgba(13,13,13,0.05)',
          fontFamily: '"Playfair Display", serif',
          lineHeight: 1,
        }}
      >
        °
      </div>

      <div className="max-w-grid mx-auto px-6 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="contact-text leading-[0.9] text-ink mb-8"
              style={{ fontSize: 'clamp(80px,12vw,180px)', fontFamily: '"Playfair Display", serif' }}
            >
              Let's talk.
            </h2>
            <p className="contact-text font-mono text-xs text-ash max-w-md">
              We're always open to discussing new projects, creative ideas, or
              opportunities to bring your vision to life.
            </p>
          </div>

          <div className="contact-form">
            {submitted ? (
              <div className="py-16 text-center">
                <p
                  className="text-3xl text-ink mb-4"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Message received.
                </p>
                <p className="font-mono text-sm text-ash">
                  We'll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${
                      errors.name ? 'border-vermillion' : 'border-ink'
                    } py-4 font-mono text-sm text-ink placeholder:text-ash/50 focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="font-mono text-xs text-vermillion mt-2">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b ${
                      errors.email ? 'border-vermillion' : 'border-ink'
                    } py-4 font-mono text-sm text-ink placeholder:text-ash/50 focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="font-mono text-xs text-vermillion mt-2">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="project"
                    placeholder="Project type (optional)"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-ink py-4 font-mono text-sm text-ink placeholder:text-ash/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-transparent border-b ${
                      errors.message ? 'border-vermillion' : 'border-ink'
                    } py-4 font-mono text-sm text-ink placeholder:text-ash/50 focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="font-mono text-xs text-vermillion mt-2">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-acid text-ink font-mono text-sm py-5 hover:bg-ink hover:text-acid transition-all duration-400 relative overflow-hidden group"
                >
                  <span className="relative z-10">SEND MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
