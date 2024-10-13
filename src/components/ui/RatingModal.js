import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function RatingModal({ onClose, onRate }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleMouseEnter = (index, event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const value = index + (x < rect.width / 2 ? 0.5 : 1);
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index, event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const value = index + (x < rect.width / 2 ? 0.5 : 1);
    setRating(value);
    setError('');
  };

  const handleSubmit = () => {
    if (rating <= 2 && description.trim() === '') {
      setError('Please provide a description for ratings of 2 stars or less.');
      return;
    }
    onRate(rating, description);
    onClose();
  };

  const renderStar = (index) => {
    const fillPercentage = Math.min(100, Math.max(0, (hoverRating || rating) - index) * 100);

    return (
      <div
        key={index}
        className="relative w-8 h-8 cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter(index, e)}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleClick(index, e)}
      >
        <Star className="w-8 h-8 text-gray-300 absolute" />
        <div style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }} className="absolute">
          <Star className="w-8 h-8 text-yellow-500 fill-current" />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Rate this post</h2>
        <div className="flex justify-center mb-4">
          {[0, 1, 2, 3, 4].map(renderStar)}
        </div>
        <p className="text-center mb-4">
          Current rating: {rating.toFixed(1)} stars
        </p>
        <textarea
          className={`w-full p-2 border rounded mb-2 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={`Add a description ${rating <= 2 ? '(required for 2 stars or less)' : '(optional)'}`}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError('');
          }}
        ></textarea>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}   