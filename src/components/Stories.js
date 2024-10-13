import React, { useState, useRef } from 'react';
import { Camera, X, Heart, Share2, MessageCircle, Send, Image, Film } from 'lucide-react';

const StoryCircle = ({ user, image, isUser, onAddStory, onViewStory }) => (
  <div className="flex-shrink-0 w-28 relative">
    <button
      onClick={isUser ? onAddStory : onViewStory}
      className="w-full h-44 relative"
    >
      <img
        src={image}
        alt={`${user}'s story`}
        className="w-full h-full object-cover rounded-xl"
      />
      {isUser ? (
        <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-80 rounded-lg py-1 text-center">
          <Camera className="w-6 h-6 mx-auto text-[#CC8C87]" />
          <span className="text-xs font-medium text-[#242424]">Créer une story</span>
        </div>
      ) : (
        <div className="absolute bottom-2 left-2 right-2">
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Créer une story</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Que voulez-vous partager ?"
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
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
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded flex items-center"
            >
              <Image size={20} className="mr-2" />
              <Film size={20} className="mr-2" />
              Ajouter une photo ou une vidéo
            </button>
          </div>
          {mediaPreview && (
            <div className="mb-4">
              {mediaPreview.startsWith('data:image') ? (
                <img src={mediaPreview} alt="Aperçu" className="max-w-full h-auto rounded" />
              ) : (
                <video src={mediaPreview} controls className="max-w-full h-auto rounded">
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )}
            </div>
          )}
          <button type="submit" className="bg-[#CC8C87] text-white px-4 py-2 rounded">
            Publier
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 ">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Story de {story.user}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="bg-gray-200 h-64 flex items-center justify-center mb-4 rounded-xl">
            {story.media ? (
              story.media.startsWith('data:image') ? (
                <img src={story.media} alt={story.user} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <video src={story.media} controls className="w-full h-full object-cover rounded-xl">
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )
            ) : (
              <img src={story.image} alt={story.user} className="w-full h-full object-cover rounded-xl" />
            )}
          </div>
          {story.content && (
            <p className="mb-4 text-gray-700">{story.content}</p>
          )}
          <div className="flex justify-between mb-4">
            <button onClick={handleLike} className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-500'}`}>
              <Heart size={20} className={liked ? 'fill-current' : ''} />
              <span className="ml-1">J'aime</span>
            </button>
            <button onClick={handleShare} className="flex items-center text-gray-500">
              <Share2 size={20} />
              <span className="ml-1">Partager</span>
            </button>
            <button onClick={() => document.getElementById('comment-input').focus()} className="flex items-center text-gray-500">
              <MessageCircle size={20} />
              <span className="ml-1">Commenter</span>
            </button>
          </div>
          <div className="mb-4 max-h-40 overflow-y-auto custom-scrollbar">
            <h3 className="font-bold mb-2">Commentaires</h3>
            {comments.map((c, index) => (
              <p key={index} className="mb-1"><strong>{c.user}:</strong> {c.text}</p>
            ))}
          </div>
          <form onSubmit={handleComment} className="flex">
            <input
              id="comment-input"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-grow p-2 border border-gray-300 rounded-l"
            />
            <button type="submit" className="bg-[#CC8C87] text-white px-4 py-2 rounded-r">
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

  const handleAddStory = ({ content, media }) => {
    const newStory = {
      id: stories.length + 1,
      user: "Vous",
      image: "https://avatars.githubusercontent.com/u/100100154?v=4",
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

  return (
    <div className="bg-gray-50 mx-w-2xl rounded-xl shadow-md p-4 mb-6 overflow-x-auto custom-scrollbar">
      <div className="flex space-x-2">
        {stories.map((story) => (
          <StoryCircle
            key={story.id}
            {...story}
            onAddStory={() => setIsAddModalOpen(true)}
            onViewStory={() => handleViewStory(story)}
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
    background: #888;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Ajoutez ces styles à votre composant ou à votre fichier CSS global
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
