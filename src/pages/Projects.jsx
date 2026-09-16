import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { projects } from '../data/projects';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import TechChip from '../components/ui/TechChip';
import './Projects.css';

const Projects = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);
  
  useScrollAnimation(containerRef);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const isRTL = language === 'ar';

  return (
    <div ref={containerRef} className="page-projects">
      <section className="section pb-0">
        <div className="container">
          <SectionHeader 
            title={t.projects.pageTitle}
            subtitle={t.projects.pageSubtitle}
            align="center"
            data-animate="fade-up"
          />
          
          <div className="filters" data-animate="fade-up" data-delay="0.2">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t.projects.filterAll}
            </button>
            <button 
              className={`filter-btn ${filter === 'cv' ? 'active' : ''}`}
              onClick={() => setFilter('cv')}
            >
              {t.projects.filterCV}
            </button>
            <button 
              className={`filter-btn ${filter === 'nlp' ? 'active' : ''}`}
              onClick={() => setFilter('nlp')}
            >
              {t.projects.filterNLP}
            </button>
            <button 
              className={`filter-btn ${filter === 'ds' ? 'active' : ''}`}
              onClick={() => setFilter('ds')}
            >
              {t.projects.filterDS}
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <GlassCard key={project.id} className="project-card" data-animate="fade-up" data-delay={0.1}>
                <div className="project-image-wrapper">
                  <img src={project.images[0]} alt={project.title} className="project-cover" />
                  <div className="project-overlay">
                    {project.detailPage ? (
                      <Link to={`/projects/${project.id}`} className="btn btn-primary">
                        {t.projects.viewDetails}
                      </Link>
                    ) : (
                      project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          {t.projects.viewGithub}
                        </a>
                      )
                    )}
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-label-code color-primary-container">{project.date}</span>
                    {project.accuracy && (
                      <span className="status-chip bg-surface-highest">
                        <span className="material-symbols-outlined text-[14px]">insights</span>
                        {project.accuracy}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-headline-md mb-1">{isRTL && project.titleAr ? project.titleAr : project.title}</h3>
                  <p className="text-body-sm color-on-surface-variant mb-4">{isRTL && project.subtitleAr ? project.subtitleAr : project.subtitle}</p>
                  
                  <p className="text-body-md mb-6">{isRTL && project.descriptionAr ? project.descriptionAr : project.description}</p>
                  
                  <div className="tech-stack-wrap mb-6">
                    {project.techStack.map(tech => (
                      <TechChip key={tech} tech={tech} />
                    ))}
                  </div>
                  
                  <div className="project-actions mt-auto">
                    {project.detailPage && (
                      <Link to={`/projects/${project.id}`} className="btn btn-secondary w-full">
                        {t.projects.viewDetails}
                      </Link>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                        {t.projects.viewDemo}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full">
                        {t.projects.viewArchitecture}
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
