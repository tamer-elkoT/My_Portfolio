import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-animate]');
    
    elements.forEach((el) => {
      const animationType = el.getAttribute('data-animate');
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      
      let fromProps = { opacity: 0 };
      
      switch (animationType) {
        case 'fade-up':
          fromProps = { ...fromProps, y: 50 };
          break;
        case 'fade-left':
          fromProps = { ...fromProps, x: -50 };
          break;
        case 'fade-right':
          fromProps = { ...fromProps, x: 50 };
          break;
        case 'scale-in':
          fromProps = { ...fromProps, scale: 0.9 };
          break;
        default:
          fromProps = { ...fromProps, y: 30 };
      }

      gsap.fromTo(
        el,
        fromProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            ...options.scrollTrigger,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, options]);
};
