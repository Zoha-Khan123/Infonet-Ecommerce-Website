import './stars.css';  // Import stars styles


export default function renderStars(rating: number) {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);
  
    return (
      <>
        {/* Filled Stars */}
        {"★".repeat(filledStars).split('').map((star, index) => (
          <span key={`filled-${index}`} className="star-filled">{star}</span>
        ))}
        
        {/* Empty Stars */}
        {"☆".repeat(emptyStars).split('').map((star, index) => (
          <span key={`empty-${index}`} className="star-empty">{star}</span>
        ))}
      </>
    );
  }
  