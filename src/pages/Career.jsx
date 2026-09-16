import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { experience } from '../data/experience';
import { certifications } from '../data/certifications';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import TechChip from '../components/ui/TechChip';
import './Career.css';

const Career = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);
  const isRTL = language === 'ar';
  
  useScrollAnimation(containerRef);

  const filteredExperience = filter === 'all' 
    ? experience 
    : experience.filter(item => item.category === filter);

  return (
    <div ref={containerRef} className="page-career">
      <section className="section pb-0">
        <div className="container">
          <SectionHeader 
            title={t.career.pageTitle}
            subtitle={t.career.pageSubtitle}
            align="center"
            data-animate="fade-up"
          />
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6" data-animate="fade-up">
            <h2 className="text-headline-md m-0">{t.career.timelineTitle}</h2>
            
            <div className="filters m-0">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                {t.career.filterAll}
              </button>
              <button 
                className={`filter-btn ${filter === 'engineering' ? 'active' : ''}`}
                onClick={() => setFilter('engineering')}
              >
                {t.career.filterEngineering}
              </button>
              <button 
                className={`filter-btn ${filter === 'mentorship' ? 'active' : ''}`}
                onClick={() => setFilter('mentorship')}
              >
                {t.career.filterMentorship}
              </button>
            </div>
          </div>
          
          <div className="timeline">
            <div className="timeline-line"></div>
            
            {filteredExperience.map((job, idx) => (
              <div key={job.id} className="timeline-item" data-animate="fade-up" data-delay={idx * 0.1}>
                <div className={`timeline-marker ${job.highlight ? 'highlight' : ''}`}>
                  <span className="material-symbols-outlined">{job.icon}</span>
                </div>
                
                <GlassCard className="timeline-content" hoverEffect={false}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-headline-sm color-primary">
                        {isRTL && job.titleAr ? job.titleAr : job.title}
                      </h3>
                      <div className="text-body-md color-on-surface-variant font-medium mt-1">
                        {job.companyUrl ? (
                          <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:color-primary-container transition-colors">
                            {isRTL && job.companyAr ? job.companyAr : job.company}
                          </a>
                        ) : (
                          <span>{isRTL && job.companyAr ? job.companyAr : job.company}</span>
                        )}
                        <span className="mx-2">•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    
                    <div className="timeline-date">
                      {isRTL && job.dateRangeAr ? job.dateRangeAr : job.dateRange}
                    </div>
                  </div>
                  
                  <ul className="timeline-bullets">
                    {(isRTL && job.bulletsAr ? job.bulletsAr : job.bullets).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  
                  <div className="tech-stack-wrap mt-6 pt-4 border-t border-glass-border">
                    {job.techStack.map(tech => (
                      <TechChip key={tech} tech={tech} />
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section bg-surface-lowest">
        <div className="container">
          <SectionHeader 
            title={t.career.educationTitle}
            align="center"
            data-animate="fade-up"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {certifications.map((cert, idx) => (
              <GlassCard key={idx} className="flex flex-col h-full" data-animate="fade-up" data-delay={idx * 0.1}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-surface-highest rounded-lg flex items-center justify-center color-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                  </div>
                  <div className="text-label-code color-on-surface-variant">{cert.date}</div>
                </div>
                
                <h3 className="text-headline-sm mb-1">{isRTL && cert.titleAr ? cert.titleAr : cert.title}</h3>
                <p className="text-body-sm color-on-surface-variant mb-6">{isRTL && cert.providerAr ? cert.providerAr : cert.provider}</p>
                
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-glass-border">
                  {cert.badge ? (
                    <span className="status-chip bg-surface-highest">
                      {cert.badge}
                    </span>
                  ) : cert.specializedTrack ? (
                    <span className="status-chip bg-surface-highest color-secondary-container">
                      Specialized Track
                    </span>
                  ) : <span></span>}
                  
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      Verify
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
