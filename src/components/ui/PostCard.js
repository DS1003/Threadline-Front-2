import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  MoreVertical,
  Trash2,
  Edit,
  Flag,
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
import ReportModal from "../../components/modal/ReportModal";
import { format } from "date-fns";

import Swal from "sweetalert2";
import Loader from "./Loader";


export default function PostCard({user,post}) {
  const navigate = useNavigate();
  const handleProfileClick = (userId) => {
    navigate(`/profileBis/${userId}`);
  };
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  const [shareCount, setShareCount] = useState(5);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reload, setReload] = useState(false); // Variable pour contrôler le rechargement des données

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  //const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.request(
          "GET",
          "/posts/getAllPost",
          null,
          user.token
        );

        if (!response || !response.posts) {
          throw new Error("Aucun post n'a été récupéré");
        }

        const data = response.posts.map((post) => {
          const rating = post.rates.length|| 0;
          let starColor;

          if (rating >= 4) {
            starColor = 'text-yellow-500';
          } else if (rating >= 2) {
            starColor = 'text-gray-500'; 
          } else {
            starColor = 'text-red-500'; 
          }
          return {
            ...post,
            liked: post.postLikes.some((like) => like.userId === user.id),
            likeCount: post.postLikes.length,
            commentCount: post.comments.length,
            bookmarked: post.favorites.some((favorite) => favorite.userId === user.id),
            favoriteCount: post._count?.favorites || post.favorites.length || 0,
            starColor,
            rating,
            
          };
        });

        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [reload]);
  // Fonction pour forcer le rechargement des posts
  const triggerReload = () => {
    console.log("Dans la fonction trigger reload");
    console.log(reload);
    setReload((prevReload) => !prevReload); // Alterne entre true et false pour déclencher l'effet
  };

  const handleImageClick = async (postId, content) => {
    setSelectedImage(content);

    try {
      const response = await apiService.request(
        "POST",
        `/views/${postId}`,
        null,
        user?.token
      );
      const updatedPost = response.post;
      console.log(updatedPost);
      // Mise à jour de l'état local avec le nouveau nombre de vues
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, views: updatedPost.views } : post
        )
      );
      triggerReload(); // Recharger les posts après mise à jour
    } catch (error) {
      console.error("Erreur lors de l'incrémentation des vues:", error);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null); // Ferme la modal
  };

  const handleLike = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Envoyer la requête API pour mettre à jour le like
      const response = await apiService.request(
        "POST",
        `/post/like`,
        { postId },
        user.token
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked
                ? post.likeCount - 1
                : post.likeCount + 1,
            }
            : post
        )
      );
      console.log(response.message);
    } catch (error) {
      console.error("Erreur lors de l'actualisation du like:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de reagir à ce poste",
      });
    }
  };


  const handleBookmark = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await apiService.request(
        "POST",
        `/favorites/add-to-favorites/${postId}`,
        null,
        user.token
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
              ...post,
              bookmarked: !post.bookmarked, // Inverser l'état des favoris
              favoriteCount: post.bookmarked
                ? post.favoriteCount - 1
                : post.favoriteCount + 1, // Ajuster le comptage des favoris
            }
            : post
        )
      );

      Swal.fire({
        icon: response.status === 201 ? "success" : "info",
        title: response.message,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout/suppression du favori:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de marquer ce poste en favori",
      });
    }
  };


  const handleRating= async (postId, stars, description) => {
    
    try {
      console.log(`Post ID: ${postId}, Rating: ${rating}, Description: ${description}`);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await apiService.request(
        "POST",
        `/rates/create-rate/${postId}`,
        { stars, description },
        user.token
      );
  
      // Mise à jour du post dans l'état local après l'évaluation réussie
      if (response) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, stars: response.newRating } : post
          )
        );
        Swal.fire({
          icon: "success",
          title: "Évaluation réussie",
          text: "Votre évaluation a été soumise.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: ` ${
          error.response ? error.response.data.message : error.message
        }`,
      });
    }
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
      
      const response = await apiService.request(
        "DELETE",
        `/posts/delete/${postId}`,
        null,
        user.token
      );

      // Si la suppression est réussie
      if (response) {
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
        text: ` ${
          error.response ? error.response.data.message : error.message
        }`,

      });
      console.error("Erreur lors de la suppression du post:", error);
    }
  };


  const handleEditPost = (post) => {

    const user = JSON.parse(localStorage.getItem('user')); 
    if (!user || user.id !== post.author.id) { 
        Swal.fire({
            icon: 'error',
            title: 'Accès refusé',
            text: 'Vous n\'êtes pas autorisé à modifier ce post.',
        });
        return; 
    }

    setCurrentPost(post);
    setShowEditModal(true);
  };

  const handleSavePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setShowEditModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCommentAdded = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post
      )
    );
  };

  const handleReportPost = (post) => {
    setCurrentPost(post);
    setShowReportModal(true);
  };
  
  const handleSubmitReport = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Vous devez être connecté pour signaler un post.",
        });
        return;
      }

      const response = await apiService.request(
        "POST",
        `/post/report`, 
        {
          postId: currentPost.id,  
          reason: reportReason     
        },
        user.token 
      );

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Le post a été signalé avec succès.",
        });
        setShowReportModal(false); 
        setReportReason('');       
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: ` ${
          error.response ? error.response.data.message : error.message
        }`,
      });
    }
  };


  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="max-w-2xl mt-3  bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex  items-center justify-between mb-4">
              {post.author && (
                <div className="flex items-center space-x-2">
                  <img
                    src={post.author.photoUrl}
                    alt={post.author.firstname}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => handleProfileClick(post.author.id)}
                  />
                  <div>
                    <p className="font-semibold">{post.author.firstname}</p>{" "}
                    <p className="text-sm text-gray-500">
                      {format(new Date(post.publishedAt), "dd/MM/yyyy HH:mm")}
                    </p>{" "}
                  </div>
                </div>
              )}
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
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleReportPost(post)}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Signaler le post
                    </button>
                    <ReportModal
                      show={showReportModal}
                      onClose={() => setShowReportModal(false)} 
                      onSubmitReport={handleSubmitReport}
                      reportReason={reportReason}
                      setReportReason={setReportReason}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 space-y-2">
              <p className="text-gray-700">{post.description}</p>{" "}
              {post.tag.map((t) => (
                <span
                  key={t.id}
                  className={`badge bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-sm ${post.bookmarked ? "text-white" : ""
                    } transition-colors duration-200`}
                >
                  {t.name}
                </span>
              ))}
              {post.content ? (
                /\.(jpg|jpeg|png|gif)$/i.test(post.content) ? (
                  <img
                    src={post.content}
                    alt="Story"
                    className="w-full h-[600px] object-cover rounded-lg"
                    onClick={() => handleImageClick(post.id, post.content)}
                  />
                ) : /\.(mp4|webm|ogg)$/i.test(post.content) ? (
                  <video
                    src={post.content}
                    controls
                    className="w-full h-90 object-cover rounded-lg"
                  >
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                ) : (
                  <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                    <p className="text-3xl font-bold text-white text-center px-6">
                      {post.content}
                    </p>
                  </div>
                )
              ) : null}
              <p className="text-sm text-gray-500">Vues : {post.views}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 ${post.liked ? "text-red-500" : "text-gray-500"
                    } transition-colors duration-200`}
                >
                  <Heart
                    className={`w-5 h-5 ${post.liked ? "fill-current" : ""
                      } transform transition-transform duration-200 ${post.liked ? "scale-125" : ""
                      }`}
                  />
                  <span>{post.likeCount}</span>
                </button>
                <button
                  onClick={() => { setCurrentPost(post); setShowCommentModal(true); }}
                  className="flex items-center space-x-1 text-gray-500"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.commentCount}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <Share2 className="w-5 h-5" />
                  <span>{shareCount}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBookmark(post.id)}
                  className={`${post.bookmarked ? "text-blue-500" : "text-gray-500"
                    } transition-colors duration-200`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${post.bookmarked ? "fill-current" : ""
                      } transform transition-transform duration-200 ${post.bookmarked ? "scale-125" : ""
                      }`}
                  />
                </button>
                    <span></span>
                    <button
                      onClick={() => {setCurrentPost(post); setShowRatingModal(true)}}
                      className={`${
                        post.rating > 0 ? "text-yellow-500" : "text-gray-500"
                      } transition-colors duration-200`}
                    >
                      <div className="flex items-center">
                        <Star
                          className={`w-5 h-5 ${
                            post.rating > 0 ? "fill-current" : ""
                          } transform transition-transform duration-200 ${
                            post.rating > 0 ? "scale-125" : ""
                          }`}
                        />
                        {/* Affichage du nombre d'étoiles à côté de l'icône */}
                        {post.rating > 0 && (
                          <span className="ml-1 text-sm font-medium">
                            {post.rating.toFixed(1)} {/* Nombre d'étoiles affiché avec une décimale */}
                          </span>
                        )}
                      </div>
                    </button>

                <span></span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showRatingModal && currentPost &&(
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          onRate={(stars, description) => handleRating(currentPost.id, stars, description)}
        />
      )}
      {showCommentModal && (
        <CommentModal
          post={currentPost}
          user={user}
          onClose={() => setShowCommentModal(false)}
          onCommentAdded={handleCommentAdded}
        />
      )}

      {showEditModal && (
        <EditPostModal
          post={currentPost}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleSavePost}
        />
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeImageModal}
        >
          <div className="relative ">
            <img
              src={selectedImage}
              alt="Agrandie"
              className="max-w-full max-h-full h-[900px] rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeImageModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
