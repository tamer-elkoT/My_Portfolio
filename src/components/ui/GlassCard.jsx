const GlassCard = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <div 
      className={`glass-card ${!hoverEffect ? 'no-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
