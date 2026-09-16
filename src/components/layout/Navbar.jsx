import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { socialLinks } from '../../data/socialLinks';
import './Navbar.css';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-left">
          <NavLink to="/" className="brand">
            <div className="brand-logo">
              <span className="brand-name">TAMER ELKOT</span>
              <span className="brand-divider">/</span>
              <span className="brand-role">AI ENGINEER</span>
            </div>
            <div className="brand-status">
              <div className="status-dot"></div>
              <span>{t.nav.openToOpportunities}</span>
            </div>
          </NavLink>
        </div>

        <nav className="nav-center hidden-lg">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t.nav.home}</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t.nav.projects}</NavLink>
          <NavLink to="/tech-stack" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t.nav.techStack}</NavLink>
          <NavLink to="/career" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t.nav.career}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{t.nav.contact}</NavLink>
        </nav>

        <div className="nav-right hidden-sm">
          <button onClick={toggleLanguage} className="icon-btn" aria-label="Toggle Language">
            {language === 'en' ? 'ع' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
            <span className="material-symbols-outlined">chat</span>
            <span>{t.nav.whatsapp}</span>
          </a>
          
          <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <span className="material-symbols-outlined">download</span>
            <span>{t.nav.resume}</span>
          </a>
        </div>

        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink to="/">{t.nav.home}</NavLink>
          <NavLink to="/projects">{t.nav.projects}</NavLink>
          <NavLink to="/tech-stack">{t.nav.techStack}</NavLink>
          <NavLink to="/career">{t.nav.career}</NavLink>
          <NavLink to="/contact">{t.nav.contact}</NavLink>
        </nav>
        
        <div className="mobile-actions">
          <div className="mobile-toggles">
            <button onClick={toggleLanguage} className="btn btn-secondary flex-1">
              {language === 'en' ? 'عربي' : 'English'}
            </button>
            <button onClick={toggleTheme} className="btn btn-secondary flex-1">
              <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
          
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full justify-center">
            <span className="material-symbols-outlined">chat</span>
            {t.nav.whatsapp}
          </a>
          
          <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-center">
            <span className="material-symbols-outlined">download</span>
            {t.nav.resume}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
