import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Bookmark, MoreHorizontal } from 'lucide-react';

export default function CommentModal({ onClose }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "john_doe", text: "Great post! Love the design.", timestamp: "2h ago" },
    { id: 2, user: "jane_smith", text: "This is absolutely stunning!", timestamp: "1h ago" },
    { id: 3, user: "design_enthusiast", text: "Can you share more details about the fabric?", timestamp: "45m ago" },
    { id: 4, user: "fashion_lover", text: "I need this in my wardrobe ASAP!", timestamp: "30m ago" },
  ]);

  const post = {
    image: "https://img.freepik.com/photos-gratuite/mannequin-ruban-mesurer_93675-130756.jpg?t=st=1728783485~exp=1728787085~hmac=a46502455c05477cbefe8a43004002abb3a554bce8fe195afbbacaa7ff5e123d&w=740",
    author: {
      username: "cameron_williamson",
      avatar: "https://avatars.githubusercontent.com/u/100100154?v=4"
    },
    caption: "Just finished this amazing piece! What do you think of the intricate embroidery and the flowing silhouette? It's a perfect blend of traditional craftsmanship and modern design. #FashionDesign #Couture",
    likes: 1234,
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: "current_user",
        text: comment,
        timestamp: "Just now"
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden flex w-full max-w-6xl h-[90vh]">
        {/* Left side - Post content */}
        <div className="w-[60%] bg-black flex items-center justify-center">
          <img src={post.image} alt="Post" className="max-w-full max-h-full object-contain" />
        </div>

        {/* Right side - Comments and interactions */}
        <div className="w-[40%] flex flex-col">
          {/* Post owner info */}
          <div className="p-4 border-b flex items-center">
            <img src={post.author.avatar} alt={post.author.username} className="w-8 h-8 rounded-full mr-3" />
            <span className="font-semibold">{post.author.username}</span>
            <button className="ml-auto">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Comments section */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Post caption */}
            <div className="mb-4">
              <span className="font-semibold mr-2">{post.author.username}</span>
              <span>{post.caption}</span>
            </div>

            {/* Comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <span className="font-semibold mr-2">{comment.user}</span>
                <span>{comment.text}</span>
                <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
              </div>
            ))}
          </div>

          {/* Interaction buttons */}
          <div className="p-4 border-t border-b">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <button><Heart size={24} /></button>
                <button><MessageCircle size={24} /></button>
                <button><Share2 size={24} /></button>
              </div>
              <div className="flex space-x-4">
                <button><Star size={24} /></button>
                <button><Bookmark size={24} /></button>
              </div>
            </div>
            <div className="font-semibold">{post.likes} likes</div>
          </div>

          {/* Comment input */}
          <form onSubmit={handleSubmitComment} className="p-4 flex items-center">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit" 
              disabled={!comment.trim()} 
              className={`px-4 py-2 rounded-full font-semibold ${comment.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              Post
            </button>
          </form>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}