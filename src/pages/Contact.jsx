import { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { socialLinks } from '../data/socialLinks';
import SectionHeader from '../components/ui/SectionHeader';
import GlassCard from '../components/ui/GlassCard';
import './Contact.css';

const Contact = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const isRTL = language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useScrollAnimation(containerRef);

  const handleSubmit = (e) => {
    // Form is handled by Formspree, but we can intercept to add UX
    // Calendly redirect will be handled by Formspree's success page redirect settings
    // Alternatively, we can do it via JS if we intercept the form submit fully:
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const data = new FormData(form);
    
    fetch(socialLinks.formspree, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Redirect to Calendly upon successful form submission
        window.location.href = socialLinks.calendly;
      } else {
        alert(isRTL ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'There was an error. Please try again.');
        setIsSubmitting(false);
      }
    }).catch(error => {
      alert(isRTL ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'There was an error. Please try again.');
      setIsSubmitting(false);
    });
  };

  return (
    <div ref={containerRef} className="page-contact">
      <section className="section pb-0">
        <div className="container">
          <SectionHeader 
            title={t.contact.pageTitle}
            subtitle={t.contact.pageSubtitle}
            align="center"
            data-animate="fade-up"
          />
        </div>
      </section>

      {/* Split Screen Contact Area */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Side: Trust & Social */}
            <div className="contact-info" data-animate="fade-right">
              <h2 className="text-headline-md mb-4">{t.contact.trustTitle}</h2>
              <p className="text-body-lg color-on-surface-variant mb-8 leading-relaxed">
                {t.contact.trustDesc}
              </p>
              
              <div className="contact-details mb-8">
                <div className="contact-item">
                  <div className="contact-icon">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <div className="text-label-caps color-on-surface-variant mb-1">{isRTL ? 'زمن الاستجابة' : 'Response Time'}</div>
                    <div className="text-headline-sm">{t.contact.responseTime}</div>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <div>
                    <div className="text-label-caps color-on-surface-variant mb-1">{t.contact.locationLabel}</div>
                    <div className="text-headline-sm">{t.contact.locationBadge}</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-label-caps color-on-surface-variant mb-4">{t.contact.directChannels}</h3>
                <div className="flex flex-col gap-3">
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp w-full justify-start">
                    <span className="material-symbols-outlined">chat</span>
                    {t.contact.whatsappLabel}
                  </a>
                  <a href={socialLinks.email} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full justify-start">
                    <span className="material-symbols-outlined">mail</span>
                    {t.contact.emailLabel}
                  </a>
                  <a href={socialLinks.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full justify-start mt-2">
                    <span className="material-symbols-outlined">download</span>
                    {t.contact.downloadCV}
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-label-caps color-on-surface-variant mb-4">{t.contact.networkMatrix}</h3>
                <div className="social-links">
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                    <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Side: Formspree Form */}
            <div className="contact-form-wrapper" data-animate="fade-left" data-delay="0.2">
              <GlassCard hoverEffect={false}>
                <h3 className="text-headline-md mb-6">{t.contact.formTitle}</h3>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label htmlFor="name" className="form-label">{t.contact.formName}</label>
                    <input type="text" id="name" name="name" className="form-input" placeholder={t.contact.formNamePlaceholder} required />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label">{t.contact.formEmail}</label>
                    <input type="email" id="email" name="email" className="form-input" placeholder={t.contact.formEmailPlaceholder} required />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label htmlFor="company" className="form-label">{t.contact.formCompany}</label>
                    <input type="text" id="company" name="company" className="form-input" placeholder={t.contact.formCompanyPlaceholder} />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label htmlFor="scope" className="form-label">{t.contact.formScope}</label>
                    <select id="scope" name="scope" className="form-select" required>
                      <option value="" disabled selected>{isRTL ? 'اختر التخصص...' : 'Select scope...'}</option>
                      {t.contact.formScopeOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group mb-6">
                    <label htmlFor="message" className="form-label">{t.contact.formMessage}</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder={t.contact.formMessagePlaceholder} required></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : t.contact.formSubmit}
                  </button>
                  
                  <p className="text-body-sm color-outline text-center mt-4">
                    <span className="material-symbols-outlined text-[14px] align-middle mr-1">lock</span>
                    {t.contact.formPrivacy}
                  </p>
                </form>
              </GlassCard>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section for GEO/SEO */}
      <section className="section pt-0">
        <div className="container" data-animate="fade-up">
          <SectionHeader 
            title={t.contact.faqTitle}
            align="center"
          />
          <div className="faq-grid" style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            marginTop: '2rem'
          }}>
            {t.contact.faq?.map((item, index) => (
              <GlassCard key={index} hoverEffect={false}>
                <h4 className="text-headline-sm mb-3 color-primary-container">{item.q}</h4>
                <p className="text-body-lg color-on-surface-variant leading-relaxed">
                  {item.a}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
