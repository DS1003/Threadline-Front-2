import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

const InstagramStyleFavorites = () => {
  // Initialisation des posts favoris
  const [favoritePosts, setFavoritePosts] = useState([
    {
      id: 1,
      user: {
        name: "Cameron Williamson",
        avatar: "https://avatars.githubusercontent.com/u/100100154?v=4"
      },
      image: "https://avatars.githubusercontent.com/u/100100154?v=4",
      description: "A beautiful view of the mountains.",
      likes: 120,
      comments: 24,
      bookmarked: true,
      liked: true,
      date: "14 Aug at 4:21 PM"
    },
    {
      id: 2,
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/40"
      },
      image: "https://avatars.githubusercontent.com/u/100100154?v=4",
      description: "A peaceful beach scene.",
      likes: 80,
      comments: 15,
      bookmarked: false,
      liked: false,
      date: "15 Aug at 9:45 AM"
    },
    {
      id: 3,
      user: {
        name: "Jane Smith",
        avatar: "https://via.placeholder.com/40"
      },
      image: "https://avatars.githubusercontent.com/u/100100154?v=4",
      description: "Sunset over the city skyline.",
      likes: 200,
      comments: 50,
      bookmarked: true,
      liked: true,
      date: "16 Aug at 7:30 PM"
    }
  ]);

  // Fonction pour gérer le like
  const handleLike = (postId) => {
    setFavoritePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  // Fonction pour gérer le bookmark
  const handleBookmark = (postId) => {
    setFavoritePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
    );
  };

  if (!favoritePosts || favoritePosts.length === 0) {
    return <div className="text-center text-gray-500">You have no favorite posts.</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF5F4] rounded-xl border-2  shadow-lg p-8 mb-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Favorite Posts</h2>
      
      <div className="grid grid-cols-3  gap-4">
        
        {favoritePosts.map((post) => (
          <div key={post.id} className="relative group">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full   object-cover rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102"
            />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramStyleFavorites;
