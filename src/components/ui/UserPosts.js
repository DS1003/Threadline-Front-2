import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical } from 'lucide-react';

const UserPosts = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
        <h1 className="font-semibold text-[#4A4A4A]  flex-grow-0 text-center text-3xl">Mes posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 space-y-2">
              <p className="text-gray-700">{post.content}</p>
              {post.image && (
                <img
                  src="https://avatars.githubusercontent.com/u/100100154?v=4"
                  alt="Post"
                  className="w-full h-90 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 ${
                    likedPosts[post.id] ? 'text-red-500' : 'text-gray-500'
                  } transition-colors duration-200`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedPosts[post.id] ? 'fill-current' : ''
                    } transform transition-transform duration-200 ${
                      likedPosts[post.id] ? 'scale-125' : ''
                    }`}
                  />
                  <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
              <button
                onClick={() => handleBookmark(post.id)}
                className={`${
                  bookmarkedPosts[post.id] ? 'text-blue-500' : 'text-gray-500'
                } transition-colors duration-200`}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    bookmarkedPosts[post.id] ? 'fill-current' : ''
                  } transform transition-transform duration-200 ${
                    bookmarkedPosts[post.id] ? 'scale-125' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;