const SectionHeader = ({ eyebrow, title, subtitle, align = 'left', className = '', ...props }) => {
  return (
    <div 
      className={`section-header ${className}`} 
      style={{ textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', display: align === 'center' ? 'flex' : 'block', flexDirection: 'column' }}
      {...props}
    >
      {eyebrow && (
        <div className="section-header__eyebrow">
          <div className="section-header__eyebrow-dot"></div>
          <span className="section-header__label">{eyebrow}</span>
        </div>
      )}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle" style={{ marginInline: align === 'center' ? 'auto' : '0' }}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
