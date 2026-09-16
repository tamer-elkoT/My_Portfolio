import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import CalendlyButton from './components/ui/CalendlyButton';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import TechStack from './pages/TechStack';
import Career from './pages/Career';
import Competitions from './pages/Competitions';
import Contact from './pages/Contact';

// Meta tag updater component
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const MetaUpdater = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    let title = 'Tamer Elkot | AI Engineer — Computer Vision & Generative AI';
    let description = 'Tamer Elkot is an AI Engineer specializing in Computer Vision, Generative AI, and Backend Systems. Available for freelance projects and full-time roles.';
    
    switch (location.pathname) {
      case '/projects': 
        title = `AI Projects | Tamer Elkot — Computer Vision, LLMs & MLOps`;
        description = `Portfolio of AI projects by Tamer Elkot including Rabih CRM, AgriVision, and EmpVision.`;
        break;
      case '/tech-stack': 
        title = `Technical Skills | Tamer Elkot, AI Engineer`; 
        description = `Explore the technical stack used by Tamer Elkot to build AI systems, including PyTorch, FastAPI, YOLOv8, and LangChain.`;
        break;
      case '/career': 
        title = `Experience & Certifications | Tamer Elkot`; 
        description = `Work experience and certifications of Tamer Elkot in AI Engineering and applied machine learning.`;
        break;
      case '/competitions': 
        title = `Competitions & Hackathons | Tamer Elkot`; 
        description = `Tamer Elkot's achievements in global AI competitions like Kaggle and Microsoft DeepX Hackathon.`;
        break;
      case '/contact': 
        title = `Contact Tamer Elkot — AI Engineer for Hire`; 
        description = `Get in touch with Tamer Elkot for AI engineering roles, freelance projects, and consulting.`;
        break;
      default: 
        if (location.pathname.startsWith('/projects/')) {
          title = `Project Details | Tamer Elkot`;
        }
    }
    
    document.title = title;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Inject JSON-LD
    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Tamer Elkot",
      "jobTitle": "AI Engineer",
      "url": "https://tamerelkot.com",
      "sameAs": [
        "https://www.linkedin.com/in/tamer-elkot/",
        "https://github.com/tamer-elkoT"
      ]
    });
  }, [location, t]);

  return null;
};

function AppContent() {
  return (
    <>
      <MetaUpdater />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/tech-stack" element={<PageTransition><TechStack /></PageTransition>} />
          <Route path="/career" element={<PageTransition><Career /></PageTransition>} />
          <Route path="/competitions" element={<PageTransition><Competitions /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </main>
      <Footer />
      <CalendlyButton />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
