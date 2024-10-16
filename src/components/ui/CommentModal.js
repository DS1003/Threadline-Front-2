import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Star, Bookmark, MoreHorizontal } from 'lucide-react';
import ApiService from '../../services/ApiService';

export default function CommentModal({ postId, onClose, post }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
          console.log('post id: ', postId);
          if (!postId) {
            alert('postId is not defined');
            return;
        }
            try {
              
                const response = await ApiService.request('GET', `/comments/all/${postId}`);
                console.log('API Response:', response);
                setComments(response);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
                // alert(`Error fetching comments: ${error.message || error}`);
            }
        };

        fetchComments();
    }, [postId]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            try {
              const user = JSON.parse(localStorage.getItem('user'));

                const response = await ApiService.request('POST', '/comments/create', {
                    content: comment,
                    postId: postId,
                }, user.token);
                // Ajouter le nouveau commentaire à l'état des commentaires
                setComments((prevComments) => [...prevComments, response.comment]);
                setComment('');
            } catch (error) {
                console.error('Failed to submit comment:', error);
                alert(`Error submitting comment: ${error.message || error}`);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden flex w-full max-w-6xl h-[90vh]">
                {/* Left side - Post content */}
                <div className="w-[60%] bg-black flex items-center justify-center">
                    <img src="{post.content}" alt="Post" className="max-w-full max-h-full object-contain" />
                </div>

                {/* Right side - Comments and interactions */}
                <div className="w-[40%] flex flex-col">
                    {/* Post owner info */}
                    <div className="p-4 border-b flex items-center">
                        <img src="" alt="" className="w-8 h-8 rounded-full mr-3" />
                        <span className="font-semibold"></span>
                        <button className="ml-auto">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Comments section */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-4">
                            <span className="font-semibold mr-2"></span>
                            <span></span>
                        </div>

                        {comments.map((comment) => (
                            <div key={comment.id} className="mb-4">
                                <span className="font-semibold mr-2"></span>
                                <span>{comment.content}</span>
                                <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    {/* Interaction buttons */}
                    <div className="p-4 border-t border-b">
                        <div className="flex justify-between mb-2">
                            <div className="flex space-x-4">
                                <button><Heart size={24} /></button>
                                <button><MessageCircle size={24} /></button>
                                <button><Share2 size={24} /></button>
                            </div>
                            <div className="flex space-x-4">
                                <button><Star size={24} /></button>
                                <button><Bookmark size={24} /></button>
                            </div>
                        </div>
                        <div className="font-semibold"> likes</div>
                    </div>

                    {/* Comment input */}
                    <form onSubmit={handleSubmitComment} className="p-4 flex items-center">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                        />
                        <button 
                            type="submit" 
                            disabled={!comment.trim()} 
                            className={`px-4 py-2 rounded-full font-semibold ${comment.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                            Post
                        </button>
                    </form>
                </div>

                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
