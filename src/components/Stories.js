import React, { useState, useRef, useEffect } from 'react';
import { Trash,Camera, X, Heart, Share2, MessageCircle, Send, Image, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import apiService from '../services/ApiService';
 // Assuming you are using react-feather for icons
const user = JSON.parse(localStorage.getItem('user'));

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
          {/* Changed span to button */}
          <button
            onClick={onAddStory}
            className="text-xs font-medium text-[#242424] focus:outline-none"
          >
            Créer une story
          </button>
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
  // Define the state for stories
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mediaFile) {
      formData.append('content', mediaFile);
    } else {
      formData.append('content', content);
    }
    formData.append('description', description);

    try {
      
    const response = await apiService.request('post', '/stories/new', formData, user.token);
    console.log("Fetched stories:", response);
      onAddStory(response.story);
      setContent('');
      setDescription('');
      setMediaFile(null);
      setMediaPreview(null);
      setError(null);
      onClose();
    } catch (error) {
      console.error('Error adding story:', error);
      setError(error.message || 'Failed to add story. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
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
          {/* Affichage de l'erreur si elle existe */}
          {error && (
            <div className="mb-4 p-2 text-red-700 bg-red-100 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Que voulez-vous partager ?"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optionnel)"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onClick={() => {
                  setMediaPreview(null);
                  setMediaFile(null);
                }}
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
  const [stories, setStories] = useState([]);
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
  const handleDelete = async (storiesId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette story ?");
    if (!confirmDelete) return;
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await apiService.request(
        "POST",
        `/stories/delete/${storiesId}`,
        null,
        user.token);
        if (response){

          alert("Story supprimée avec succès !");
        }
      onClose(); // Close the modal after deletion
      setStories((prevStories) => prevStories.filter((storiesId) =>  storiesId!== story.id)); // Update the state
    } catch (error) {
      console.error("Erreur lors de la suppression de la story :", error);
      alert("Impossible de supprimer la story. Veuillez réessayer.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <div className="flex items-center">
            <img src={user.photoUrl} alt={story.user} className="w-10 h-10 rounded-full object-cover mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">{story.user}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="relative">
        {story.content ? (
  /\.(jpg|jpeg|png|gif)$/i.test(story.content) ? (
    <img src={story.content} alt="Story" className="w-full h-[calc(100vh-250px)] object-cover" />
  ) : /\.(mp4|webm|ogg)$/i.test(story.content) ? (
    <video src={story.content} controls className="w-full h-[calc(100vh-250px)] object-cover">
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  ) : (
    <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <p className="text-3xl font-bold text-white text-center px-6">{story.content}</p>
    </div>
  )
) : null}

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
        <button onClick={() => handleDelete(story.id)} className="flex items-center text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">
  <Trash size={24} />
  <span className="ml-2 text-sm">Supprimer</span>
</button>

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


const Stories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const storiesPerPage = 5;
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try { 
      const response = await apiService.request('post', '/stories/all', null, user.token);
      console.log('Response:', response); // Affiche la réponse complète pour inspection
      const stories = response.stories; // correction ici
      
      // Assurez-vous que `response.stories` existe avant de le définir
      if (stories) {
        setStories(stories);
        setError(null);
      } else {
        console.error('Story data not found in response:', stories);
        setError('No story data found in response.');
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError(error.message || 'Failed to fetch stories. Please try again.');
    }
};

  
  const handleAddStory = (newStory) => {
    setStories([newStory, ...stories]);
  };
  
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setIsViewModalOpen(true);
  };
  
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(stories.length / storiesPerPage) - 1));
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
  
  const totalPages = Math.ceil(stories.length / storiesPerPage);
  
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
      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-hidden scroll-smooth"
      >
        <StoryCircle
          user="Vous"
          image={stories.content}
          isUser={true}
          onAddStory={() => setIsAddModalOpen(true)}
          onViewStory={() => {}}
        />
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            user={story.author ? story.author.id : 'Utilisateur'}
            image={story.content}
            isUser={false}
            onAddStory={() => {}}
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