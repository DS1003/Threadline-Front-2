import React from 'react';
import ProfileHeader from './ProfileHeader';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import InstagramStyleFavorites from './InstagramStyleFavorites';
import UserMeasurements from './UserMeasurements';

const ProfilePage = () => {
  const user = {
    name: 'Jane Doe',
    tagline: 'Photographer | Traveler | Coffee Lover',
    coverPhoto: 'https://maishabeautyproducts.com/cdn/shop/files/Aesthetic_Minimal_Brand_Photo_Collage_Grid_Instagram_Post_3.png?v=1724042666',
    profilePicture: 'https://avatars.githubusercontent.com/u/100100154?v=4',
    location: 'New York, NY',
    work: 'Freelance Photographer',
    education: 'Bachelor of Fine Arts, NYU',
    relationshipStatus: 'Single',
  };

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
    <div className="bg-gray-100  min-h-screen ">
      <ProfileHeader user={user} />
      <div className="container mt-14   mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserInfo user={user} />
            <UserMeasurements measurements={measurements} />
            <InstagramStyleFavorites posts={posts} />

          </div>
          <div className="md:col-span-2">
            <UserPosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;