import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  Smile, 
  MoreHorizontal, 
  MessageCircle, 
  Share,
  Bookmark,
  Camera,
  ThumbsUp,
  UserPlus,
  Globe,
  ChevronDown
} from 'lucide-react';

// Composant Stories
const Stories = () => {
  const stories = [
    { id: 1, user: "Vous", image: "https://avatars.githubusercontent.com/u/100100154?v=4", isUser: true },
    { id: 2, user: "Marie L.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 3, user: "Thomas R.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 4, user: "Sophie K.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 5, user: "Emma J.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 6, user: "Sophie K.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 7, user: "Marie L.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },
    { id: 8, user: "Thomas R.", image: "https://avatars.githubusercontent.com/u/100100154?v=4" },


  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 mt-10 overflow-x-auto">
      <div className="flex space-x-2">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-28 relative">
            <img src={story.image} alt={story.user} className="w-full h-44 object-cover rounded-xl" />
            {story.isUser ? (
              <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg py-1 text-center">
                <Camera className="w-6 h-6 mx-auto text-[#CC8C87]" />
                <span className="text-xs font-medium text-[#242424]">Créer une story</span>
              </div>
            ) : (
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs font-medium text-white drop-shadow-lg">{story.user}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour créer un nouveau post
const CreatePost = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-10 mb-6">
      <div className="flex items-center mb-4">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
        <input 
          type="text" 
          placeholder={`Quoi de neuf, ${user.firstName} ?`}
          className="flex-grow bg-[#F0F2F5] text-[#242424] placeholder-[#65676B] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#EAB0B7]"
        />
      </div>
      <div className="flex justify-between items-center border-t border-[#CED0D4] pt-3">
        <button className="flex items-center text-[#65676B] hover:bg-[#F0F2F5] rounded-lg px-3 py-1 flex-1 justify-center">
          <Video className="w-6 h-6 mr-2 text-[#F3425F]" />
          Vidéo en direct
        </button>
        <button className="flex items-center text-[#65676B] hover:bg-[#F0F2F5] rounded-lg px-3 py-1 flex-1 justify-center">
          <Image className="w-6 h-6 mr-2 text-[#45BD62]" />
          Photo/vidéo
        </button>
        <button className="flex items-center text-[#65676B] hover:bg-[#F0F2F5] rounded-lg px-3 py-1 flex-1 justify-center">
          <Smile className="w-6 h-6 mr-2 text-[#F7B928]" />
          Humeur/Activité
        </button>
      </div>
    </div>
  );
};

// Composant pour afficher un post
const Post = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md mt-10 mb-6">
      {/* En-tête du post */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold text-[#050505]">{user.name}</h3>
            <div className="flex items-center text-[#65676B] text-sm">
              <span>{post.timestamp}</span>
              <span className="mx-1">•</span>
              <Globe className="w-3 h-3 mr-1" />
            </div>
          </div>
        </div>
        <button className="text-[#65676B] hover:bg-[#F0F2F5] rounded-full p-2">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Contenu du post */}
      <div className="px-4 py-2">
        <p className="text-[#050505] mb-4">{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="w-full h-auto rounded-lg mb-4" />
        )}
      </div>

      {/* Compteurs de likes et commentaires */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-b border-[#CED0D4]">
        <div className="flex items-center">
          <span className="bg-[#1877F2] text-white rounded-full p-1 mr-2">
            <ThumbsUp className="w-4 h-4" />
          </span>
          <span className="text-[#65676B] text-sm">{post.likes}</span>
        </div>
        <div className="text-[#65676B] text-sm">
          <span className="mr-2">{post.comments} commentaires</span>
          <span>{post.shares} partages</span>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between items-center px-4 py-1">
        <button 
          className={`flex items-center justify-center flex-1 ${liked ? 'text-[#1877F2]' : 'text-[#65676B]'} hover:bg-[#F0F2F5] rounded-lg py-2`}
          onClick={() => setLiked(!liked)}
        >
          <ThumbsUp className={`w-5 h-5 mr-2 ${liked ? 'fill-[#1877F2]' : ''}`} />
          J'aime
        </button>
        <button className="flex items-center justify-center flex-1 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg py-2">
          <MessageCircle className="w-5 h-5 mr-2" />
          Commenter
        </button>
        <button className="flex items-center justify-center flex-1 text-[#65676B] hover:bg-[#F0F2F5] rounded-lg py-2">
          <Share className="w-5 h-5 mr-2" />
          Partager
        </button>
      </div>
    </div>
  );
};

// Composant pour les contacts
const Contacts = () => {
  const contacts = [
    { id: 1, name: "Alice Martin", avatar: "https://avatars.githubusercontent.com/u/100100154?v=4", online: true },
    { id: 2, name: "Bob Johnson", avatar: "https://avatars.githubusercontent.com/u/100100154?v=4", online: false },
    { id: 3, name: "Claire Davis", avatar: "https://avatars.githubusercontent.com/u/100100154?v=4", online: true },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-10">
      <h3 className="font-semibold text-[#65676B] mb-4">Contacts</h3>
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center mb-3">
          <div className="relative">
            <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full mr-3" />
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <span className="text-[#050505]">{contact.name}</span>
        </div>
      ))}
    </div>
  );
};

// Composant principal du Feed
const Feed = () => {
  const user = {
    name: "John Doe",
    firstName: "John",
    avatar: "https://avatars.githubusercontent.com/u/100100154?v=4"
  };

  const posts = [
    {
      id: 1,
      content: "Je suis ravi de partager mon dernier projet de design avec vous tous ! J'ai travaillé dur dessus et j'aimerais avoir vos retours. N'hésitez pas à commenter et à partager vos impressions !",
      image: "/api/placeholder/600/400",
      timestamp: "Il y a 2 heures",
      likes: 124,
      comments: 23,
      shares: 5
    },
    {
      id: 2,
      content: "Quelle magnifique journée pour coder en plein air ! Le soleil brille, les oiseaux chantent, et mon code fonctionne parfaitement. Qui d'autre aime travailler à l'extérieur quand le temps le permet ?",
      timestamp: "Il y a 5 heures",
      likes: 89,
      comments: 12,
      shares: 2
    },
    {
      id: 1,
      content: "Je suis ravi de partager mon dernier projet de design avec vous tous ! J'ai travaillé dur dessus et j'aimerais avoir vos retours. N'hésitez pas à commenter et à partager vos impressions !",
      image: "/api/placeholder/600/400",
      timestamp: "Il y a 2 heures",
      likes: 124,
      comments: 23,
      shares: 5
    },
    {
      id: 2,
      content: "Quelle magnifique journée pour coder en plein air ! Le soleil brille, les oiseaux chantent, et mon code fonctionne parfaitement. Qui d'autre aime travailler à l'extérieur quand le temps le permet ?",
      timestamp: "Il y a 5 heures",
      likes: 89,
      comments: 12,
      shares: 2
    },
    {
      id: 1,
      content: "Je suis ravi de partager mon dernier projet de design avec vous tous ! J'ai travaillé dur dessus et j'aimerais avoir vos retours. N'hésitez pas à commenter et à partager vos impressions !",
      image: "/api/placeholder/600/400",
      timestamp: "Il y a 2 heures",
      likes: 124,
      comments: 23,
      shares: 5
    },
    {
      id: 2,
      content: "Quelle magnifique journée pour coder en plein air ! Le soleil brille, les oiseaux chantent, et mon code fonctionne parfaitement. Qui d'autre aime travailler à l'extérieur quand le temps le permet ?",
      timestamp: "Il y a 5 heures",
      likes: 89,
      comments: 12,
      shares: 2
    }
  ];

  return (
    <div className="bg-[#F0F2F5] min-h-screen py-8  ">
      <div className="max-w-6xl mx-auto px-4 flex">
        {/* Sidebar gauche */}
        <div className="w-1/4 pr-4 mt-10">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h3 className="font-semibold text-[#65676B] mb-4">Raccourcis</h3>
            <button className="flex items-center text-[#050505] hover:bg-[#F0F2F5] rounded-lg px-3 py-2 w-full mb-2">
              <UserPlus className="w-5 h-5 mr-3 text-[#1877F2]" />
              Trouver des amis
            </button>
            <button className="flex items-center text-[#050505] hover:bg-[#F0F2F5] rounded-lg px-3 py-2 w-full mb-2">
              <Bookmark className="w-5 h-5 mr-3 text-[#BA68C8]" />
              Enregistrements
            </button>
            <button className="flex items-center text-[#050505] hover:bg-[#F0F2F5] rounded-lg px-3 py-2 w-full">
              <ChevronDown className="w-5 h-5 mr-3" />
              Voir plus
            </button>
          </div>
        </div>

        {/* Feed principal */}
        <div className="w-1/2 px-4">
          <Stories />
          <CreatePost user={user} />
          {posts.map(post => (
            <Post key={post.id} post={post} user={user} />
          ))}
        </div>

        {/* Sidebar droite */}
        <div className="w-1/4 pl-4">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Feed;