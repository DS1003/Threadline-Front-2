import React, { useState, useEffect, useRef } from 'react';
import { Smile, Paperclip, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';
import apiService from '../../services/ApiService';
import Loading from '../animations/Loading';
import EmojiPicker from 'emoji-picker-react';

const CommentModal = ({ post, onClose, user, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [subComment, setSubComment] = useState({ comment: '', parentId: null });
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showSubEmojiPicker, setShowSubEmojiPicker] = useState(false);
    const [showReplies, setShowReplies] = useState({}); // Track which comments' replies are visible
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchComments = async () => {
            if (post) {
                try {
                    const response = await apiService.request('GET', `/comments/all/${post.id}`);
                    setComments(response);
                } catch (error) {
                    console.error('Failed to fetch comments:', error);
                }
            }
        };
        fetchComments();
    }, [post]);

    const handleEmojiClick = (emojiObject) => {
        setComment(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleSubEmojiClick = (emojiObject) => {
        setSubComment(prev => ({ ...prev, comment: prev.comment + emojiObject.emoji }));
        setShowSubEmojiPicker(false);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setLoading(true);
        
        try {
            const response = await apiService.request('POST', '/comments/create', {
                content: comment,
                postId: post.id,
            }, user.token);

            setComments(prev => [...prev, response.comment]);
            setComment('');

            if (onCommentAdded) onCommentAdded(post.id);
        } catch (error) {
            console.error('Failed to submit comment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitSubComment = async (e) => {
        e.preventDefault();
        if (!subComment.comment.trim()) return;
        setLoading(true);
        
        try {
            const response = await apiService.request('POST', '/comments/create', {
                content: subComment.comment,
                postId: post.id,
                parentId: subComment.parentId,
            }, user.token);

            setComments(prev => {
                return updateCommentReplies(prev, subComment.parentId, response.comment);
            });

            setSubComment({ comment: '', parentId: null });
            setReplyingTo(null);

            if (onCommentAdded) onCommentAdded(post.id);
        } catch (error) {
            console.error('Failed to submit subcomment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        setSubComment({ comment: '', parentId: commentId });
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setSubComment({ comment: '', parentId: null });
    };

    const toggleReplies = (commentId) => {
        setShowReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const updateCommentReplies = (comments, parentId, newReply) => {
        return comments.map(comment => {
            if (comment.id === parentId) {
                return { ...comment, replies: [...(comment.replies || []), newReply] };
            } else if (comment.replies) {
                return { ...comment, replies: updateCommentReplies(comment.replies, parentId, newReply) };
            }
            return comment;
        });
    };

    const renderComments = (comments) => {
        return comments.map(comment => (
            <div key={comment.id} className="mb-5">
                <div className='flex gap-3'>
                    <img src={comment.author?.photoUrl} alt={`${comment.author?.firstname} ${comment.author?.lastname}`} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                        <p>
                            <span className="font-semibold">{comment.author?.firstname} {comment.author?.lastname}</span>
                            <span className="text-xs text-gray-500 ml-2">{new Date(comment.createdAt).toLocaleString()}</span>
                        </p>
                        <p>{comment.content}</p>
                        <div className='mt-2 flex gap-2 items-center'>
                            <ThumbsUp size={15} className="cursor-pointer" />
                            <ThumbsDown size={15} className="cursor-pointer" />
                            <button onClick={() => handleReplyClick(comment.id)} className="text-blue-500 hover:text-blue-600 text-sm">Répondre</button>
                            {comment.replies && comment.replies.length > 0 && ( // Only show button if replies exist
                                <button onClick={() => toggleReplies(comment.id)} className="text-gray-500 hover:text-gray-600 text-sm ml-2">
                                    {showReplies[comment.id] ? 'Masquer réponses' : `Voir ${comment.replies.length} réponses`}
                                </button>
                            )}
                        </div>

                        {showReplies[comment.id] && comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 mt-2">
                                {renderComments(comment.replies)}
                            </div>
                        )}

                        {replyingTo === comment.id && (
                            <form onSubmit={handleSubmitSubComment} className="mt-3">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        placeholder="Répondre..."
                                        value={subComment.comment}
                                        onChange={(e) => setSubComment({ ...subComment, comment: e.target.value })}
                                        className="flex-1 border rounded px-3 py-1"
                                    />
                                    <button type="button" onClick={() => setShowSubEmojiPicker(!showSubEmojiPicker)} className="mr-2">
                                        <Smile size={20} />
                                    </button>
                                    <input type="file" ref={fileInputRef} className="hidden" />
                                    <button type="button" onClick={() => fileInputRef.current.click()} className="mr-2">
                                        <Paperclip size={20} />
                                    </button>
                                </div>
                                {showSubEmojiPicker && (
                                    <EmojiPicker onEmojiClick={handleSubEmojiClick} />
                                )}
                                <div className='mt-2 flex justify-end gap-2'>
                                    <button type="button" onClick={handleCancelReply} className="text-sm text-gray-500 hover:text-gray-700">Annuler</button>
                                    <button type="submit" disabled={!subComment.comment.trim() || loading} className={`px-3 py-1 rounded-full text-sm font-semibold ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                                        {loading ? <Loading /> : "Répondre"}
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
            <div className="bg-white rounded-lg flex w-full max-w-6xl h-[90vh]">
                <div className="w-[60%] bg-black flex items-center justify-center">
                    <img src={post.content} alt="Post" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="w-[40%] flex flex-col relative">
                    <div className="p-4 border-b flex items-center">
                        <img src={user.photoUrl} alt={`${user.firstname} ${user.lastname}`} className="w-10 h-10 rounded-full mr-3" />
                        <span className="font-semibold">{user.firstname} {user.lastname}</span>
                        <button className="ml-auto"><MoreHorizontal size={20} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {comments.length > 0 ? renderComments(comments) : <p className="text-gray-500">Aucun commentaire encore.</p>}
                    </div>
                    <form onSubmit={handleSubmitComment} className="p-4 border-t">
                        <div className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="flex-1 border rounded px-3 py-1"
                            />
                            <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="mr-2">
                                <Smile size={20} />
                            </button>
                            <input type="file" ref={fileInputRef} className="hidden" />
                            <button type="button" onClick={() => fileInputRef.current.click()} className="mr-2">
                                <Paperclip size={20} />
                            </button>
                        </div>
                        {showEmojiPicker && (
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        )}
                        <div className='mt-2 flex justify-end gap-2'>
                            <button type="button" onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Annuler</button>
                            <button type="submit" disabled={!comment.trim() || loading} className={`px-3 py-1 rounded-full text-sm font-semibold ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                                {loading ? <Loading /> : "Commenter"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
