import React, { useState, useEffect } from 'react';

function Lightbox({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [index]);

  const goToNext = () => {
    setIndex((index + 1) % images.length);
  };

  const goToPrevious = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        
        <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
          ‹
        </button>
        
        <img 
          src={images[index].url} 
          alt={images[index].title}
          className="lightbox-image"
        />
        
        <button className="lightbox-nav lightbox-next" onClick={goToNext}>
          ›
        </button>
        
        <div className="lightbox-caption">
          {images[index].title}
        </div>
      </div>

      <style jsx>{`
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .lightbox-close:hover {
          transform: scale(1.1);
        }

        .lightbox-nav {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid white;
          color: white;
          font-size: 48px;
          cursor: pointer;
          padding: 10px 20px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.3s;
          backdrop-filter: blur(10px);
          border-radius: 8px;
        }

        .lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .lightbox-prev {
          left: -80px;
        }

        .lightbox-next {
          right: -80px;
        }

        .lightbox-caption {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          color: white;
          text-align: center;
          font-size: 18px;
          padding: 10px;
        }

        @media (max-width: 768px) {
          .lightbox-nav {
            font-size: 32px;
            padding: 5px 15px;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .lightbox-close {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Lightbox;