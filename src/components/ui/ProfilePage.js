import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { MapPin, Briefcase, GraduationCap, Heart } from 'lucide-react'

const ProfilePage = () => {
  const [ setUserRole] = useState('');
  const connectedUser = JSON.parse(localStorage.getItem('user'));  
  const coverPhoto = 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666';
  const user = {...connectedUser, coverPhoto};

  const handleRoleUpdate = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  const posts = [
    {
      id: 1,
      author: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      date: 'June 1, 2023',
      content: 'Just finished a great photoshoot in Central Park!',
      image: 'https://source.unsplash.com/random/800x600',
      likes: 124,
      comments: 23,
    },
    {
      id: 2,
      author: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      date: 'May 28, 2023',
      content: 'Exploring the streets of NYC. So much inspiration everywhere!',
      likes: 89,
      comments: 15,
    },
  ];

  const photos = [
    'https://source.unsplash.com/random/300x300?1',
    'https://source.unsplash.com/random/300x300?2',
    'https://source.unsplash.com/random/300x300?3',
    'https://source.unsplash.com/random/300x300?4',
    'https://source.unsplash.com/random/300x300?5',
    'https://source.unsplash.com/random/300x300?6',
  ];

  const measurements = {
    height: '5\'8"',
    weight: '130 lbs',
    chest: '34"',
    waist: '28"',
    hips: '36"',
    shoeSize: 'US 8',
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverPhoto})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 flex items-end p-6">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 text-white">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-lg">{user.tagline}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="space-y-6">
              {posts.map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={post.author.profilePicture} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{post.author.name}</CardTitle>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" className="mt-4 rounded-lg" />}
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{user.work}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{user.education}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{user.relationshipStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="photos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Photo${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="measurements">
            <Card>
              <CardHeader>
                <CardTitle>Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
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