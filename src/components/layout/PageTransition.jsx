import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Entrance animation
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [location.pathname]);

  return (
    <div ref={pageRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default PageTransition;
