import { useLanguage } from '../../context/LanguageContext';
import { socialLinks } from '../../data/socialLinks';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="brand-name">TAMER ELKOT</span>
              <span className="brand-divider">/</span>
              <span className="brand-role color-primary-container">AI ENGINEER</span>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          
          <div className="footer-social">
            <div className="social-links">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">GitHub</a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">LinkedIn</a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">WhatsApp</a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Instagram</a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Facebook</a>
              <a href={socialLinks.email} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">{t.footer.copyright}</p>
          <div className="telemetry-pill">
            <span className="location">{t.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
