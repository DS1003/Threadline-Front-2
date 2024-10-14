import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Heart, Share2, MessageCircle, Send, Image, Film, ChevronLeft, ChevronRight } from 'lucide-react';

// ... (StoryCircle component remains unchanged)
const StoryCircle = ({ user, image, isUser, onAddStory, onViewStory }) => (
  <div className="flex-shrink-0 w-24 sm:w-28 transition-transform duration-300 hover:scale-105">
    <button
      onClick={isUser ? onAddStory : onViewStory}
      className="w-full h-36 sm:h-44 relative rounded-xl overflow-hidden group"
    >
      <img
        src={image}
        alt={`${user}'s story`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      {isUser ? (
        <div className="absolute inset-x-2 bottom-2 bg-white bg-opacity-90 rounded-lg py-1 text-center transition-all duration-300 group-hover:bg-opacity-100">
          <Camera className="w-6 h-6 mx-auto text-[#CC8C87]" />
          <span className="text-xs font-medium text-[#242424]">Créer une story</span>
        </div>
      ) : (
        <div className="absolute inset-x-2 bottom-2 text-center">
          <span className="text-xs font-medium text-white drop-shadow-lg">{user}</span>
        </div>
      )}
    </button>
  </div>
);

const AddStoryModal = ({ isOpen, onClose, onAddStory }) => {
  const [content, setContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStory({ content, media: mediaPreview });
    setContent('');
    setMediaPreview(null);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Créer une story</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Que voulez-vous partager ?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="mb-4">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition duration-300"
            >
              <Image size={20} className="mr-2" />
              <Film size={20} className="mr-2" />
              Ajouter une photo ou une vidéo
            </button>
          </div>
          {mediaPreview && (
            <div className="mb-4 relative">
              {mediaPreview.startsWith('data:image') ? (
                <img src={mediaPreview} alt="Aperçu" className="w-full h-64 object-cover rounded-lg" />
              ) : (
                <video src={mediaPreview} controls className="w-full h-64 object-cover rounded-lg">
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )}
              <button
                onClick={() => setMediaPreview(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          )}
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300">
            Publier la story
          </button>
        </form>
      </div>
    </div>
  );
};

const StoryViewModal = ({ isOpen, onClose, story }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  if (!isOpen || !story) return null;

  const handleLike = () => setLiked(!liked);
  const handleShare = () => console.log("Sharing story:", story.user);
  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { text: comment, user: "Vous" }]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <div className="flex items-center">
            <img src={story.image} alt={story.user} className="w-10 h-10 rounded-full object-cover mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">{story.user}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="relative">
          {story.media ? (
            story.media.startsWith('data:image') ? (
              <img src={story.media} alt="Story" className="w-full h-[calc(100vh-250px)] object-cover" />
            ) : (
              <video src={story.media} controls className="w-full h-[calc(100vh-250px)] object-cover">
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            )
          ) : (
            <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
              <p className="text-3xl font-bold text-white text-center px-6">{story.content}</p>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex justify-between items-center">
              <button onClick={handleLike} className={`flex items-center ${liked ? 'text-red-500' : 'text-white'}`}>
                <Heart size={24} className={liked ? 'fill-current' : ''} />
                <span className="ml-2 text-sm">{liked ? 'Aimé' : 'Aimer'}</span>
              </button>
              <button onClick={handleShare} className="flex items-center text-white">
                <Share2 size={24} />
                <span className="ml-2 text-sm">Partager</span>
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2 text-gray-700">Commentaires</h3>
          <div className="max-h-32 overflow-y-auto mb-4 space-y-2">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-2">
                <span className="font-semibold text-gray-800">{comment.user}:</span> {comment.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className="flex">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ... (The rest of the Stories component remains unchanged)
const Stories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([
    { id: 1, user: "Vous", image: "https://img.freepik.com/photos-gratuite/mannequin-ruban-mesurer_93675-130756.jpg?t=st=1728783485~exp=1728787085~hmac=a46502455c05477cbefe8a43004002abb3a554bce8fe195afbbacaa7ff5e123d&w=740", isUser: true },
    { id: 2, user: "Marie L.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 3, user: "Thomas R.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 4, user: "Sophie K.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 5, user: "Emma J.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 6, user: "Luc P.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 7, user: "Julie M.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 8, user: "Marc D.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 5;
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const carouselRef = useRef(null);

  const handleAddStory = ({ content, media }) => {
    const newStory = {
      id: stories.length + 1,
      user: "Vous",
      image: media || "https://avatars.githubusercontent.com/u/100100154?v=4",
      content: content,
      media: media,
      isUser: true,
    };
    setStories([newStory, ...stories.filter(story => !story.isUser)]);
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
    setIsViewModalOpen(true);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentPage * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#242424]">Stories</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-300' : 'text-[#CC8C87] hover:bg-[#FDF1F2]'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'text-gray-300' : 'text-[#CC8C87] hover:bg-[#FDF1F2]'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-hidden scroll-smooth"
      >
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            {...story}
            onAddStory={() => setIsAddModalOpen(true)}
            onViewStory={() => handleViewStory(story)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentPage ? 'bg-[#CC8C87]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <AddStoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStory={handleAddStory}
      />
      <StoryViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        story={selectedStory}
      />
    </div>
  );
};

export default Stories;

// Styles pour la barre de défilement personnalisée
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

// Ajoutez ces styles à votre composant ou à votre fichier CSS global
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);