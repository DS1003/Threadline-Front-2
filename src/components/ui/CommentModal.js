import React, { useState } from 'react';

export default function CommentModal({ postImage, onClose }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Great post!', timestamp: '2h ago' },
    { id: 2, user: 'Jane Smith', text: 'I love this!', timestamp: '1h ago' },
  ]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: 'Current User', text: comment, timestamp: 'Just now' },
      ]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden flex w-full max-w-4xl h-[80vh]">
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img src={postImage} alt="Post" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4">
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.text}</p>
                <p className="text-xs text-gray-500">{comment.timestamp}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitComment} className="p-4 border-t">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </form>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}