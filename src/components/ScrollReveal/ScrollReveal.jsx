import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  scrollContainerRef = null,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const originalText = el.textContent;

    if (!originalText || originalText.trim() === "") return;

    const words = originalText
      .split(/(\s+)/)
      .map((word) => {
        if (word.match(/^\s+$/)) return word;
        return `<span class="word">${word}</span>`;
      })
      .join('');

    el.innerHTML = words;

    const scroller = scrollContainerRef?.current || window;
    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(
      el,
      { rotate: baseRotation, transformOrigin: '0% 50%' },
      {
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        opacity: 1,
        stagger: 0.01,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children]);

  return (
    <div className={containerClassName}>
      <p ref={containerRef} className={`leading-[1.5] ${textClassName}`}>
        {children}
      </p>
    </div>
  );
}
