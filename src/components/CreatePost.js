import React, { useState, useRef } from 'react';
import { Edit3, Image, X, Send } from 'lucide-react';
import ApiService from '../services/ApiService';
import Swal from 'sweetalert2';


export default function CreatePostCard({ user, onPostCreate }) {
  const [postContent, setPostContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
    } else {
      alert('Please select an image or video file.');
    }
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append('description', postContent);
    formData.append('tags', JSON.stringify(tags));
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await ApiService.request('POST', '/posts/create', formData, user.token);
      onPostCreate(2);
      user.credit = user.credit -2;;
      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire({
        title: 'Succès!',
        text: 'Post créé avec succès',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      setPostContent('');
      setTags([]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de la création du post.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <Edit3 className="w-5 h-5 text-[#CC8C87] mr-2" />
        <span className="text-gray-600 font-medium">Create Post</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-4">
          <img
            src={user.photoUrl}
            alt="User avatar"
            className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
          />
          <textarea
            className="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            placeholder="What's on your mind?"
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add a tag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-[#CC8C87] text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-[#cc8c87ce] focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            >
              Add Tag
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Image className="w-5 h-5 text-green-500 mr-1" />
              <span className="text-sm">Photo/Video</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {selectedFile && (
            <div className="text-sm text-gray-600 truncate max-w-full">
              File selected: {selectedFile.name}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#CC8C87] text-white px-4 py-2 rounded-lg hover:bg-[#cc8c87ce] focus:outline-none focus:ring-2 focus:ring-[#CC8C87] flex items-center justify-center"
        >
          <Send size={20} className="mr-2" />
          Post
        </button>
      </form>
    </div>
  );
}