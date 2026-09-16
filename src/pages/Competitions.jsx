import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { competitions, achievementBadges } from '../data/competitions';
import { socialLinks } from '../data/socialLinks';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import ImageCarousel from '../components/ui/ImageCarousel';
import TechChip from '../components/ui/TechChip';
import './Competitions.css';

const Competitions = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const isRTL = language === 'ar';
  
  useScrollAnimation(containerRef);

  return (
    <div ref={containerRef} className="page-competitions">
      <section className="section pb-0">
        <div className="container">
          <SectionHeader 
            title={t.competitions.pageTitle}
            subtitle={t.competitions.pageSubtitle}
            align="center"
            data-animate="fade-up"
          />
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="section pb-0">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievementBadges.map((badge, idx) => (
              <GlassCard key={idx} className="text-center p-6" hoverEffect={false} data-animate="fade-up" data-delay={idx * 0.1}>
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="text-headline-sm color-primary mb-1">{badge.value}</div>
                <div className="text-label-caps color-on-surface-variant">{badge.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions Feed */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-16">
            {competitions.map((comp, idx) => (
              <GlassCard key={comp.id} className="competition-card" data-animate="fade-up" data-delay={0.1}>
                <div className="competition-grid">
                  <div className="competition-content">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="status-chip bg-surface-highest">
                        <span className="text-lg leading-none mr-2">{comp.achievementIcon}</span>
                        {isRTL && comp.achievementAr ? comp.achievementAr : comp.achievement}
                      </span>
                      <span className="text-label-code color-primary-container">{comp.date}</span>
                    </div>
                    
                    <h2 className="text-headline-md mb-2">{isRTL && comp.titleAr ? comp.titleAr : comp.title}</h2>
                    <div className="text-body-md color-on-surface-variant font-medium mb-6">
                      {isRTL && comp.organizerAr ? comp.organizerAr : comp.organizer}
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-label-caps color-primary-container mb-2">
                        {isRTL ? 'التركيز الأساسي' : 'Primary Focus'}
                      </div>
                      <p className="text-body-md font-semibold">
                        {isRTL && comp.focusAr ? comp.focusAr : comp.focus}
                      </p>
                    </div>
                    
                    <p className="text-body-md mb-8">
                      {isRTL && comp.descriptionAr ? comp.descriptionAr : comp.description}
                    </p>
                    
                    {comp.techStack && (
                      <div className="tech-stack-wrap mt-auto">
                        {comp.techStack.map(tech => (
                          <TechChip key={tech} tech={tech} />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {comp.photos && comp.photos.length > 0 && (
                    <div className="competition-visual">
                      <ImageCarousel images={comp.photos} alt={comp.title} />
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section text-center bg-surface-lowest">
        <div className="container max-w-3xl" data-animate="scale-in">
          <h2 className="text-headline-md mb-4">{t.competitions.ctaTitle}</h2>
          <p className="text-body-md color-on-surface-variant mb-8">{t.competitions.ctaSubtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn btn-primary">
              {t.competitions.ctaPrimary}
            </Link>
            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <span className="material-symbols-outlined">chat</span>
              {t.competitions.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Competitions;
