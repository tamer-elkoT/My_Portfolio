import { useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images, alt = 'Carousel image' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-main">
        <img 
          src={images[currentIndex]} 
          alt={`${alt} ${currentIndex + 1}`} 
          className="carousel-image"
        />
        
        {images.length > 1 && (
          <>
            <button onClick={prevSlide} className="carousel-nav prev" aria-label="Previous image">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={nextSlide} className="carousel-nav next" aria-label="Next image">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="carousel-thumbnails">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setSlide(idx)}
              className={`thumbnail-btn ${currentIndex === idx ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
