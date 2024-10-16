import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { Button } from './Button';
import { Edit, Settings, Grid, List, MessageCircle } from 'lucide-react';

const ProfilePage = () => {
  const [userRole, setUserRole] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const coverPhoto = user.coverPhoto || 'https://source.unsplash.com/random/1200x400';

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) setUserRole(savedRole);
  }, []);

  const handleRoleUpdate = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  const posts = [
    {
      id: 1,
      content: 'Just finished a great photoshoot in Central Park!',
      image: 'https://source.unsplash.com/random/800x600',
      likes: 124,
      comments: 23,
    },
    {
      id: 2,
      content: 'Exploring the streets of NYC. So much inspiration everywhere!',
      likes: 89,
      comments: 15,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen">
      <div className="relative h-80">
        <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/2" />
      </div>
      
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="backdrop-blur-md bg-white/30 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.tagline || 'Tailleur'}</p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" /> Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="font-semibold text-gray-800">420</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">123</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-800">13</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
              </div>
              {user.roles && !user.roles.some(role => ['TAILOR', 'SELLER'].includes(role.name)) && (
                <Button onClick={() => handleRoleUpdate('TAILOR')} variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Update Role
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="posts" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <Card>
              <CardContent className="p-6 space-y-6">
                {posts.map(post => (
                  <div key={post.id} className="space-y-4">
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" className="rounded-lg w-full" />}
                    <div className="flex justify-between text-gray-600">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gallery">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <img key={i} src={`https://source.unsplash.com/random/300x300?${i}`} alt={`Gallery ${i}`} className="rounded-lg" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About {user.name}</h3>
                <p className="text-gray-600 mb-4">{user.bio || 'No bio available'}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-gray-600">{user.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Work</h4>
                    <p className="text-gray-600">{user.work || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Education</h4>
                    <p className="text-gray-600">{user.education || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Joined</h4>
                    <p className="text-gray-600">{user.joinDate || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;