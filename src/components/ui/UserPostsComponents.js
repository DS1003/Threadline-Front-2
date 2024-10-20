import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { format } from "date-fns";
import apiService from "../../services/ApiService";
import Loader from "./Loader";

export default function UserPostsComponents({ user }) {
  const { userId } = useParams(); // Get userId from URL if provided
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (userId) {
          // Fetch posts for a specific user
          response = await apiService.request(
            "GET",
            `posts/get-post/${userId}`,
            null,
            user.token
          );
        } else {
          // Fetch posts for the authenticated user
          response = await apiService.request(
            "GET",
            "posts/get-post",
            null,
            user.token
          );
        }

        if (!response || !response.posts) {
          throw new Error("No posts were retrieved");
        }

        const data = response.posts.map((post) => ({
          ...post,
        }));

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
  }, [userId, user]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="max-w-2xl mt-3 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              {post.author && (
                <div className="flex items-center space-x-2">
                  <img
                    src={post.author.photoUrl}
                    alt={post.author.firstname}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{post.author.firstname}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(post.publishedAt), "dd/MM/yyyy HH:mm")}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4 space-y-2">
              {post.content && (
                <img
                  src={post.content}
                  alt="Post content"
                  className="w-full h-[600px] object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
