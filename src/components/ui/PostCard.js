import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import RatingModal from "./RatingModal";
import CommentModal from "./CommentModal";
import apiService from "../../services/ApiService";
import EditPostModal from "../../components/modal/EditPostModal"; 
import { format } from 'date-fns';

import Swal from 'sweetalert2';


export default function PostCard() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(12);
  const [shareCount, setShareCount] = useState(5);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await apiService.request(
          "GET",
          "/posts/getAllPost",
          null,
          token
        );

        
        if (!response || !response.posts) {
          throw new Error("Aucun post n'a été récupéré");
        }
        
        const data = response.posts.map((post) => ({
          ...post,
          liked: false,
          likeCount: 0,
        }));
        
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
    console.log(postId);
  };

  const handleBookmark = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    setShowRatingModal(false);
  };

  const toggleMenu = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showMenu: !post.showMenu }
          : { ...post, showMenu: false }
      )
    );
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiService.request(
        "DELETE",
        `/posts/delete/${postId}`,
        null,
        token
      );
  
      // Si la suppression est réussie
      if (response && response.status === 200) {
        // Supprimer le post du DOM uniquement après la réussite de l'opération
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Le post a été supprimé avec succès !",
        });
      } else {
        throw new Error("La suppression du post a échoué.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Erreur: ${
          error.response ? error.response.data.message : error.message
        }`,
      });
      console.error("Erreur lors de la suppression du post:", error);
    }
  };
  
  const handleEditPost = (post) => {
    setCurrentPost(post);
    console.log(post);
    setShowEditModal(true);
  };

  const handleSavePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-2xl mt-3 bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex  items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={post.author.photoUrl}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.author.firstname}</p>{" "}
                  <p className="text-sm text-gray-500">{format(new Date(post.publishedAt), 'dd/MM/yyyy HH:mm')}</p>{" "}              
                </div>
              </div>
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => toggleMenu(post.id)}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {post.showMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier le post
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer le post
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Êtes-vous sûr de vouloir supprimer ce post ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela
                            supprimera définitivement votre post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => toggleMenu(post.id)}
                          >
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <p className="text-gray-700">{post.description}</p>{" "}
              {post.tag.map((t) => (
                <span
                  key={t.id}
                  className={`badge bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-sm ${
                    post.bookmarked? "text-white" : ""
                  } transition-colors duration-200`}
                >
                  {t.name}
                </span>
              )

              ) }
              <img
                src={post.content} // Image du post
                alt="user-image"
                className="w-full h-90 object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 ${
                    post.liked ? "text-red-500" : "text-gray-500"
                  } transition-colors duration-200`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      post.liked ? "fill-current" : ""
                    } transform transition-transform duration-200 ${
                      post.liked ? "scale-125" : ""
                    }`}
                  />
                  <span>{post.likeCount}</span>
                </button>
                <button
                  onClick={() => setShowCommentModal(true)}
                  className="flex items-center space-x-1 text-gray-500"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{commentCount}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <Share2 className="w-5 h-5" />
                  <span>{shareCount}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleBookmark}
                  className={`${
                    bookmarked ? "text-blue-500" : "text-gray-500"
                  } transition-colors duration-200`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      bookmarked ? "fill-current" : ""
                    } transform transition-transform duration-200 ${
                      bookmarked ? "scale-125" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => setShowRatingModal(true)}
                  className={`${
                    rating > 0 ? "text-yellow-500" : "text-gray-500"
                  } transition-colors duration-200`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      rating > 0 ? "fill-current" : ""
                    } transform transition-transform duration-200 ${
                      rating > 0 ? "scale-125" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showRatingModal && (
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          onRate={handleRating}
        />
      )}
      {showCommentModal && (
        <CommentModal
          postImage="https://avatars.githubusercontent.com/u/100100154?v=4"
          onClose={() => setShowCommentModal(false)}
        />
      )}


{showEditModal && (
  <EditPostModal
    post={currentPost}
    onClose={() => setShowEditModal(false)}
    onSave={handleSavePost}
  />
)}
    </div>
  );
}