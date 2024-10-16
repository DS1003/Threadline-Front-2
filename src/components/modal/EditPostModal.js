import React, { useState, useRef } from 'react';
import { Edit3, Image, X } from 'lucide-react';
import ApiService from '../../services/ApiService';
import Swal from 'sweetalert2';

export default function EditPostModal({ post, onClose, onUpdate }) {

  const [postContent, setPostContent] = useState(post.description || '' );
  
  const updatePost = async () => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('recup token post:', user.token);  // Affiche le token pour le debuggage
    if (!user || !user.token) {
      alert('Token non trouvé, veuillez vous reconnecter.');
      return;
    }

    const formData = {
      description: postContent,
      content: post.content,
      // tags: post.tags || [],

    };
    // formData.append('description', postContent);
    try {
      console.log(formData); 
      const response = await ApiService.request('PUT', `/posts/update/${post.id}`, formData, user.token);

      
      Swal.fire({
        title: 'Succès!',
        text: 'Post modifié avec succès',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      
      onUpdate(response.post);
      onClose(); 

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Erreur: ${
          error.response ? error.response.data.message : error.message
        }`,
      });
      console.error('Erreur lors de la modification du post:', error);
      console.log('Une erreur est survenue lors de la modification du post.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <div className="flex items-center mb-4">
          <Edit3 className="w-5 h-5 text-[#CC8C87] mr-2" />
          <span className="text-gray-600 font-medium">Modifier le Post</span>
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-start mb-4">
            <img
              src="https://avatars.githubusercontent.com/u/100100154?v=4"
              alt="User avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <textarea
              className="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
              placeholder="Modifier votre post"
              rows={3}
              name="description"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#CC8C87] text-white px-4 py-2 rounded-lg hover:bg-[#cc8c87ce] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
