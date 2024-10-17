import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Star, Bookmark, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';
import apiService from '../../services/ApiService';
import Loading from '../animations/Loading';

const CommentModal = ({ post, onClose, user, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [subComment, setSubComment] = useState({ comment: '', parentId: null, postId: post.id });
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [isReplyInputFocused, setIsReplyInputFocused] = useState(false);
    const [expandedComments, setExpandedComments] = useState({}); // Track expanded comments


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await apiService.request('GET', `/comments/all/${post.id}`);
                setComments(response);
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
        if (post) {
            fetchComments();
        }
    }, [post]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiService.request('POST', '/comments/create', {
                content: comment,
                postId: post.id,
            }, user.token);

            setComments((prevComments) => [...prevComments, response.comment]);
            post.comments.lenght += 1
            setComment('');

            if (onCommentAdded) {
                onCommentAdded(post.id);
            }
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitSubComment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiService.request('POST', '/comments/create', {
                content: subComment.comment,
                postId: post.id,
                parentId: subComment.parentId,
            }, user.token);

            setComments((prevComments) => [
                ...prevComments,
                {
                    ...response.comment,
                    replies: [response.comment, ...prevComments.find((c) => c.id === subComment.parentId).replies],
                },
            ]);

            setSubComment({ comment: '', parentId: null, postId: post.id });

            if (onCommentAdded) {
                onCommentAdded(post.id);
            }
        } catch (error) {
            console.error('Failed to submit subcomment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        setSubComment((prevSubComment) => ({ ...prevSubComment, parentId: commentId }));
    };

    const handleCancelReply = () => {
        setReplyingTo(null); // <-- Reset when cancelling reply
    };

    // Toggle visibility of replies (sub-comments)
    const toggleReplies = (commentId) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId], // Toggle expanded state
        }));
    };

    const renderComments = (comments) => {
        return comments.map((comment) => (
            <div key={comment.id} className="mb-5">
                <div className='flex gap-3'>
                    <img src={comment.author?.photoUrl} alt="User" className="w-8 h-8 rounded-full" />
                    <div>
                        <p><span className="font-semibold text-sm mr-2">{comment.author?.firstname} {comment.author?.lastname}</span> <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span></p>
                        <p className="text-sm">{comment.content}</p>
                        <div className='mt-2 flex gap-2 items-center'>
                            <ThumbsUp size={15} cursor={"pointer"} />
                            <ThumbsDown size={15} cursor={"pointer"} />
                            <button onClick={() => handleReplyClick(comment.id)} className="text-blue-500 hover:text-blue-600 cursor-pointer text-sm">Répondre</button>
                        </div>

                        {/* Render sub-comments (replies) */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 mt-2">
                                {expandedComments[comment.id] ? (
                                    <>
                                        {renderComments(comment.replies)} {/* Recursive rendering of replies */}
                                        <button onClick={() => toggleReplies(comment.id)} className="text-blue-500 text-sm">
                                            Masquer les réponses
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => toggleReplies(comment.id)} className="text-blue-500 text-sm">
                                        Afficher plus ({comment.replies.length} réponses)
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                            <form onSubmit={handleSubmitSubComment}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Répondre..."
                                        value={subComment.comment}
                                        onChange={(e) => setSubComment({ ...subComment, comment: e.target.value })}
                                        className="w-[500px] pl-1 py-1 focus:outline-none focus:border-blue-500"
                                        onFocus={() => setIsReplyInputFocused(true)}
                                        onBlur={() => setIsReplyInputFocused(false)}
                                    />
                                    <hr className={`w-[500px] ${isReplyInputFocused ? 'border-blue-500' : 'border-gray-300'}`} />
                                </div>
                                <div className='mt-2 flex justify-end'>
                                    <button className='text-sm' onClick={handleCancelReply}>Annuler</button>
                                    <button
                                        type="submit"
                                        disabled={!subComment.comment.trim() || loading}
                                        className={`px-2 py-1 rounded-full font-semibold bg-blue-500 text-white ml-2 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                        {loading ? <Loading /> : "Envoyer"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden flex w-full max-w-6xl h-[90vh]">
                {/* Left side - Post content */}
                <div className="w-[60%] bg-black flex items-center justify-center">
                    <img src={post.content} alt="Post" className="max-w-full max-h-full object-contain" />
                </div>

                {/* Right side - Comments and interactions */}
                <div className="w-[65%] flex flex-col">
                    {/* Post owner info */}
                    <div className="p-4 border-b flex items-center">
                        <img src={user.photoUrl} alt="User" className="w-10 h-10 rounded-full mr-3" />
                        <span className="font-semibold"></span>
                        <button className="ml-auto">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    {/* Comments section */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {comments.length > 0 && renderComments(comments)}
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
                    </div>


                    {/* Comment input */}
                    <form onSubmit={handleSubmitComment} className="p-4 flex items-center">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Ajouter un commentaire..."
                            className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!comment.trim() || loading}
                            className={`px-4 py-2 rounded-full font-semibold ${comment.trim() ? 'bg-blue-500 text-white' : loading ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-500'}`}
                        >
                            {loading ? <Loading /> : "Envoyer"}
                        </button>
                    </form>

                    {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
