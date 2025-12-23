import React, { useState } from 'react';
import Lightbox from '../components/Lightbox';
import '../styles/Gallery.css';

// Import all your images at the top - extra images from: (Google Gemini, Generate Images Prompts 2025)
// (Google Gemini - Quantic Project Image Generation, 2025)
import interiorImage from '../assets/imgs/gallery-cafe-interior.webp';
import ribeyeImage from '../assets/imgs/gallery-ribeye-steak.webp';
import homeCafe from '../assets/imgs/home-cafe-fausse.webp';
import specialEvent from '../assets/imgs/gallery-special-event.webp';
import pastaImage from '../assets/imgs/gallery-pasta-dish.webp';
import chefWorking from '../assets/imgs/gallery-chef-at-work.webp';
import tiramisuImage from '../assets/imgs/gallery-tiramisu.webp';
import wineImage from '../assets/imgs/gallery-wine.webp';
import grilledSalmon from '../assets/imgs/gallery-grilled-salmon.webp';

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Define the gallery of images
  const galleryImages = [
    { id: 1, title: 'Restaurant Interior', category: 'ambiance', url: interiorImage },
    { id: 2, title: 'Grilled Salmon', category: 'dishes', url: grilledSalmon },
    { id: 3, title: 'Dining Area', category: 'ambiance', url: homeCafe },
    { id: 4, title: 'Ribeye Steak', category: 'dishes', url: ribeyeImage },
    { id: 5, title: 'Wine Collection', category: 'ambiance', url: wineImage },
    { id: 6, title: 'Tiramisu', category: 'dishes', url: tiramisuImage },
    { id: 7, title: 'Chef at Work', category: 'events', url: chefWorking },
    { id: 8, title: 'Private Dining Room', category: 'ambiance', url: specialEvent },
    { id: 9, title: 'Pasta', category: 'events', url: pastaImage }
  ];

  const awards = [
    { year: '2022', title: 'Culinary Excellence Award' },
    { year: '2023', title: 'Restaurant of the Year' },
    { year: '2023', title: 'Best Fine Dining Experience', source: 'Foodie Magazine' }
  ];

  const reviews = [
    {
      text: 'Exceptional ambiance and unforgettable flavors.',
      source: 'Gourmet Review'
    },
    {
      text: 'A must-visit restaurant for food enthusiasts.',
      source: 'The Daily Bite'
    }
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1>Gallery</h1>
        <p>A Visual Journey through Café Fausse</p>
      </div>

      <div className="gallery-container">
        <section className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <span>{image.title}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="awards-section">
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-icon">🏆</div>
                <h3>{award.title}</h3>
                <p className="award-year">{award.year}</p>
                {award.source && <p className="award-source">{award.source}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="reviews-section">
          <h2>What People Say</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="quote-icon">❝</div>
                <p className="review-text">{review.text}</p>
                <p className="review-source">— {review.source}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedImage}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}

export default Gallery;