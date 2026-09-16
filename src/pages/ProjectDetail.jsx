import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ImageCarousel from '../components/ui/ImageCarousel';
import SectionHeader from '../components/ui/SectionHeader';
import TechChip from '../components/ui/TechChip';
import GlassCard from '../components/ui/GlassCard';

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  const project = projects.find(p => p.id === id);
  const isRTL = language === 'ar';
  
  if (!project || !project.detailPage) {
    return <Navigate to="/projects" replace />;
  }

  const title = isRTL && project.titleAr ? project.titleAr : project.title;
  const subtitle = isRTL && project.subtitleAr ? project.subtitleAr : project.subtitle;
  const description = isRTL && project.descriptionAr ? project.descriptionAr : project.description;

  return (
    <div className="page-projects">
      <section className="section">
        <div className="container">
          <Link to="/projects" className="btn btn-secondary btn-sm mb-8 inline-flex">
            <span className="material-symbols-outlined" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}>
              arrow_back
            </span>
            {t.projects.pageTitle}
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div data-animate="fade-right">
              <SectionHeader 
                eyebrow={project.category}
                title={title}
                subtitle={subtitle}
                className="mb-6"
              />
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-label-code color-primary-container">{project.date}</span>
              </div>
              
              <p className="text-body-lg mb-8">{description}</p>
              
              <div className="mb-8">
                <h3 className="text-label-caps color-on-surface-variant mb-3">Core Architecture & Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <TechChip key={tech} tech={tech} />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    {t.projects.viewDemo}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    {t.projects.viewArchitecture}
                  </a>
                )}
              </div>
            </div>
            
            <div data-animate="fade-left" data-delay="0.2">
              <ImageCarousel images={project.images} alt={title} />
            </div>
          </div>
          
          {project.features && project.features.length > 0 && (
            <div className="mt-24">
              <h3 className="text-headline-md mb-8 text-center">Engineering Features</h3>
              <div className="grid-auto-fill">
                {project.features.map((feature, idx) => (
                  <GlassCard key={idx} data-animate="fade-up" data-delay={idx * 0.1}>
                    <div className="w-12 h-12 bg-surface-highest rounded-lg flex items-center justify-center mb-4 color-primary-container">
                      <span className="material-symbols-outlined">{feature.icon}</span>
                    </div>
                    <h4 className="text-headline-sm mb-2">{feature.title}</h4>
                    <p className="text-body-sm color-on-surface-variant">{feature.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
