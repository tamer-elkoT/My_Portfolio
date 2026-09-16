import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ParticleField from '../components/ui/ParticleField';
import TypeWriter from '../components/ui/TypeWriter';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import { socialLinks } from '../data/socialLinks';
import './Home.css';

const Home = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const containerRef = useRef(null);
  
  useScrollAnimation(containerRef);

  return (
    <div ref={containerRef} className="page-home">
      {/* Hero Section */}
      <section className="hero-section">
        <ParticleField />
        <div className="container hero-container relative z-10">
          <div className="hero-content" data-animate="fade-up">
            <div className="status-chip mb-6">
              <div className="status-dot"></div>
              {t.hero.statusChip}
            </div>
            
            <h1 className="text-display-hero mb-4">
              <span className="block color-on-surface">{t.hero.name}</span>
              <span className="block color-primary" style={{ marginTop: '0.2em' }}>{t.hero.title}</span>
            </h1>
            
            <div className="hero-tagline text-body-lg mb-8">
              {t.hero.tagline}
              <div className="mt-2">
                <TypeWriter phrases={t.hero.typingPhrases} />
              </div>
            </div>
            
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                {t.hero.ctaPrimary}
                <span className="material-symbols-outlined" style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}>
                  arrow_right_alt
                </span>
              </Link>
              <Link to="/tech-stack" className="btn btn-secondary">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
          
          <div className="hero-visual hidden-sm" data-animate="fade-left" data-delay="0.3">
            <div className="profile-container">
              <div className="profile-glow"></div>
              <img src="/images/profile/profile.jpg" alt="Tamer Elkot, AI Engineer, headshot photo" className="profile-img" />
              <div className="floating-badge badge-top">
                <span className="material-symbols-outlined color-primary-container">visibility</span>
                <span>Computer Vision</span>
              </div>
              <div className="floating-badge badge-bottom">
                <span className="material-symbols-outlined color-secondary-container">auto_awesome</span>
                <span>Generative AI</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </section>

      {/* Summary Section */}
      <section className="section bg-surface-lowest">
        <div className="container">
          <div className="summary-grid">
            <div data-animate="fade-right">
              <SectionHeader 
                eyebrow={t.summary.eyebrow}
                title={t.summary.title}
              />
            </div>
            <div className="summary-content" data-animate="fade-left" data-delay="0.2">
              <p className="text-body-lg mb-4">{t.summary.p1}</p>
              <p className="text-body-md mb-4 color-on-surface-variant">{t.summary.p2}</p>
              <p className="text-body-md color-primary-container">{t.summary.p3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="section">
        <div className="container">
          <SectionHeader 
            eyebrow={t.pathways.eyebrow}
            title={t.pathways.title}
            subtitle={t.pathways.subtitle}
            align="center"
          />
          
          <div className="grid-auto-fill mt-12">
            {t.pathways.cards.map((card, idx) => (
              <GlassCard key={idx} className="flex flex-col h-full" data-animate="fade-up" data-delay={idx * 0.1}>
                <div className="text-label-caps color-primary-container mb-2">{card.category}</div>
                <h3 className="text-headline-md mb-3">{card.title}</h3>
                <p className="text-body-md color-on-surface-variant flex-1 mb-6">{card.desc}</p>
                <Link to={card.link} className="pathway-link">
                  {card.cta}
                  <span className="material-symbols-outlined" style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }}>
                    chevron_right
                  </span>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <GlassCard className="cta-banner" data-animate="scale-in">
            <div className="cta-banner-content">
              <h2 className="text-headline-lg mb-2">{t.ctaBanner.title}</h2>
              <p className="text-body-lg color-on-surface-variant mb-6">{t.ctaBanner.subtitle}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="btn btn-primary">
                  {t.hero.ctaPrimary}
                </Link>
                <a href={socialLinks.email} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <span className="material-symbols-outlined">mail</span>
                  {t.ctaBanner.email}
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Home;
