import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import StoryCircles from './Stories';
import CreatePostCard from './CreatePost';
import Post from './ui/PostCard';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MessageButton from './MessageButton';
import Balanced from './Balanced';

export default function MainFeed() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [balance, setBalance] = useState(500);
  const [purchaseHistory, setPurchaseHistory] = useState([
    { date: '2024-10-15', amount: 100 },
    { date: '2024-10-01', amount: 50 },
    { date: '2024-09-15', amount: 200 },
  ]);

  const handleRefresh = async () => {
    // Simuler une mise à jour du solde
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBalance(prevBalance => prevBalance + Math.floor(Math.random() * 50));
  };

  const handlePurchase = () => {
    const amount = 100;
    setBalance(prevBalance => prevBalance + amount);
    setPurchaseHistory(prevHistory => [
      { date: new Date().toISOString(), amount },
      ...prevHistory
    ]);
  };

    return (
        <div className="max-w-8xl mx-auto ml-20 overflow-scroll relative">
            {/* Conteneur Flex pour afficher ProfileInfo à gauche et les Stories à droite */}
            <div className="flex gap-6 mt-20">
                {/* Le profil sur la gauche */}
                <div className="w-1/4 pl-8">
                    <ProfileInfo />
                    <Balanced 
                       balance={balance} 
                       lastPurchaseDate="2024-05-24"
                       purchaseHistory={purchaseHistory}
                       onRefresh={handleRefresh}
                       onPurchase={handlePurchase}
                    />
                    <Sidebar/>
                </div>

                {/* Les Stories et le formulaire de création de post à droite */}
                <div className="middleContent max-w-2xl ">
                    {/* Les Stories */}
                    <div className="mb-6">
                        <StoryCircles />
                    </div>
                    {/* Le formulaire de création de post */}
                    <CreatePostCard />
                    <Post />
                    <Post />
                </div>

                {/* Message button to toggle sidebar */}
                <div className="fixed bottom-6 right-6 z-50">
                    <MessageButton onClick={toggleSidebar} />
                </div>

                {/* RightSidebar */}
                <RightSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            </div>
        </div>
    );
}