import React, { useState, useEffect } from 'react';
import { X, Trash,ChevronLeft, ChevronRight } from 'lucide-react';
import apiService from '../services/ApiService';

const UserStories = () => {
  const [userStories, setUserStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUserStories();
  }, []);

  const fetchUserStories = async () => {
    try {
      const response = await apiService.request('post', '/stories/connect-user', null, user.token);
      console.log(response.stories); // Vérifiez le nombre de stories ici
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
    <div className="flex-shrink-0 w-24 sm:w-28 transition-transform duration-300 hover:scale-105">
      <button
        onClick={openStories}
        className="w-full h-36 sm:h-44 relative rounded-xl overflow-hidden group"
      >
        <img
          src={user.photoUrl || 'default-avatar.jpg'}
          alt={`${user.name}'s stories`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-x-2 bottom-2 text-center">
          <span className="text-xs font-medium text-white drop-shadow-lg">Vos stories</span>
        </div>
      </button>
    </div>
  );

  const StoryModal = () => {
    const [stories, setStories] = useState([]);
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
          // Close the modal after deletion
          setStories((prevStories) => prevStories.filter((storiesId) =>  storiesId!== currentStory.id)); // Update the state
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
            {currentStory.content ? (
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
            <button onClick={() => handleDelete(currentStory.id)} className="flex items-center text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300">
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
    </>
  );
};

export default UserStories;