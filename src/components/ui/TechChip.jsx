const TechChip = ({ tech, className = '' }) => {
  return (
    <span className={`tech-chip ${className}`}>
      {tech}
    </span>
  );
};

export default TechChip;
