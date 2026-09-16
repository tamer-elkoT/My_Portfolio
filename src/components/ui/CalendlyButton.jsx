import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { socialLinks } from '../../data/socialLinks';
import './CalendlyButton.css';

const CalendlyButton = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Calendly widget CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: socialLinks.calendly });
    } else {
      window.open(socialLinks.calendly, '_blank');
    }
  };

  return (
    <button 
      className="calendly-fab" 
      onClick={openCalendly}
      aria-label={t.nav.bookConsultation}
    >
      <span className="material-symbols-outlined">calendar_month</span>
      <span className="fab-text">{t.nav.bookConsultation}</span>
    </button>
  );
};

export default CalendlyButton;
