import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { skillDomains, pipelineNodes } from '../data/skills';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import TechChip from '../components/ui/TechChip';
import './TechStack.css';

const TechStack = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const isRTL = language === 'ar';
  
  useScrollAnimation(containerRef);

  return (
    <div ref={containerRef} className="page-tech-stack">
      <section className="section pb-0">
        <div className="container">
          <SectionHeader 
            title={t.techStack.pageTitle}
            subtitle={t.techStack.pageSubtitle}
            align="center"
            data-animate="fade-up"
          />
        </div>
      </section>

      {/* Tech Domains Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {skillDomains.map((domain, idx) => (
              <GlassCard key={domain.id} data-animate="fade-up" data-delay={idx * 0.1}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-surface-highest rounded-lg flex items-center justify-center color-primary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">{domain.icon}</span>
                  </div>
                  <div>
                    <div className="text-label-caps color-on-surface-variant mb-1">{domain.domainNum}</div>
                    <h3 className="text-headline-sm">{isRTL && domain.titleAr ? domain.titleAr : domain.title}</h3>
                  </div>
                </div>
                
                <p className="text-body-sm color-on-surface-variant mb-4">
                  {isRTL && domain.descriptionAr ? domain.descriptionAr : domain.description}
                </p>
                
                <div className="tech-stack-wrap mb-4">
                  {domain.technologies.map(tech => (
                    <TechChip key={tech} tech={tech} />
                  ))}
                </div>
                
                <div className="bg-surface-lowest p-3 rounded-md border border-glass-border">
                  <p className="text-body-sm">
                    <strong className="color-primary-container">{isRTL ? 'نقاط القوة الأساسية:' : 'Core Strengths:'}</strong> {isRTL && domain.strengthsAr ? domain.strengthsAr : domain.strengths}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Pipeline */}
      <section className="section bg-surface-lowest">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16" data-animate="fade-up">
            <h2 className="text-headline-lg mb-4">{t.techStack.architectureTitle}</h2>
            <p className="text-body-lg color-on-surface-variant">{t.techStack.architectureSubtitle}</p>
          </div>
          
          <div className="pipeline-container" data-animate="fade-up" data-delay="0.2">
            <div className="pipeline-label">{t.techStack.pipelineLabel}</div>
            <div className="pipeline-track">
              {pipelineNodes.map((node, idx) => (
                <div key={node.id} className={`pipeline-node ${node.isCore ? 'core-node' : ''}`}>
                  <div className="node-icon">
                    <span className="material-symbols-outlined">{node.icon}</span>
                  </div>
                  <div className="node-content">
                    <div className="node-metric">{node.metric}</div>
                    <h4 className="node-title">{isRTL && node.titleAr ? node.titleAr : node.title}</h4>
                    <p className="node-desc">{node.desc}</p>
                  </div>
                  {idx < pipelineNodes.length - 1 && (
                    <div className="node-connector">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="section text-center">
        <div className="container max-w-2xl" data-animate="scale-in">
          <h2 className="text-headline-md mb-4">{t.techStack.ctaTitle}</h2>
          <p className="text-body-md color-on-surface-variant mb-8">{t.techStack.ctaSubtitle}</p>
          <Link to="/projects" className="btn btn-primary">
            {t.techStack.ctaButton}
            <span className="material-symbols-outlined" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>arrow_right_alt</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
