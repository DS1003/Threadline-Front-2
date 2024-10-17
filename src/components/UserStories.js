import React, { useState, useEffect, useRef } from 'react';
import { X, Trash, Camera, ChevronLeft, ChevronRight, Image, Film } from 'lucide-react';
import apiService from '../services/ApiService';
const user = JSON.parse(localStorage.getItem('user'));
const UserStories = () => {
  const [userStories, setUserStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false); // State for Add Story Modal
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUserStories();
  }, []);

  const fetchUserStories = async () => {
    try {
      const response = await apiService.request('post', '/stories/connect-user', null, user.token);
      setUserStories(response.stories);
    } catch (error) {
      console.error('Error fetching user stories:', error);
    }
  };

  const openStories = () => {
    if (userStories.length > 0) {
      setIsModalOpen(true);
    }
  };

  const closeStories = () => {
    setIsModalOpen(false);
    setCurrentStoryIndex(0);
  };

  const nextStory = () => {
    if (currentStoryIndex < userStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeStories();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const StoryCircle = () => (
    <div 
      className="flex-shrink-0 w-24 sm:w-28 transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={openStories}
    >
      <div className="w-full h-36 sm:h-44 relative rounded-xl overflow-hidden group">
        <img
          src={user?.photoUrl || 'default-avatar.jpg'}
          alt={`${user?.name || 'User'}'s stories`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-x-2 bottom-2 bg-white bg-opacity-90 rounded-lg py-1 text-center transition-all duration-300 group-hover:bg-opacity-100">
          <Camera className="w-6 h-6 mx-auto text-[#CC8C87]" />
          <button
            onClick={(e) => {
                e.stopPropagation(); // Empêche la propagation du clic au parent
                setIsAddStoryModalOpen(true);
              }}
            className="text-xs font-medium text-[#242424] focus:outline-none"
          >
            Créer une story
          </button>
        </div>
      </div>
    </div>
  );

  const StoryModal = () => {
    const handleDelete = async (storiesId) => {
      const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette story ?");
      if (!confirmDelete) return;
    
      try {
        const response = await apiService.request(
          "POST",
          `/stories/delete/${storiesId}`,
          null,
          user.token
        );
        if (response) {
          alert("Story supprimée avec succès !");
          setUserStories((prevStories) => prevStories.filter((story) => story.id !== storiesId));
          if (userStories.length === 1) {
            closeStories();
          } else if (currentStoryIndex === userStories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex - 1);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la story :", error);
        alert("Impossible de supprimer la story. Veuillez réessayer.");
      }
    };

    if (!isModalOpen) return null;

    const currentStory = userStories[currentStoryIndex];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="relative w-full max-w-lg h-[80vh]">
          <button onClick={closeStories} className="absolute top-4 right-4 text-white z-10">
            <X size={24} />
          </button>
          <div className="relative h-full">
            {currentStory?.content ? (
              /\.(jpg|jpeg|png|gif)$/i.test(currentStory.content) ? (
                <img src={currentStory.content} alt="Story" className="w-full h-full object-cover" />
              ) : /\.(mp4|webm|ogg)$/i.test(currentStory.content) ? (
                <video src={currentStory.content} controls className="w-full h-full object-cover">
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                  <p className="text-3xl font-bold text-white text-center px-6">{currentStory.content}</p>
                </div>
              )
            ) : null}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <button onClick={prevStory} className="text-white" disabled={currentStoryIndex === 0}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextStory} className="text-white" disabled={currentStoryIndex === userStories.length - 1}>
                <ChevronRight size={24} />
              </button>
            </div>
            <button onClick={() => handleDelete(currentStory.id)} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">
              <Trash size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <StoryCircle />
      <StoryModal />
      <AddStoryModal 
        isOpen={isAddStoryModalOpen} 
        onClose={() => setIsAddStoryModalOpen(false)} 
        onAddStory={(newStory) => setUserStories([...userStories, newStory])} 
      />
    </>
  );
};

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
            <button type="submit" className="w-full bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7] text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition duration-300">
              Publier la story
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export default UserStories;
