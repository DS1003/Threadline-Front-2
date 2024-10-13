import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import StoryCircles from './Stories';
import CreatePostCard from './CreatePost';
import Post from './ui/PostCard';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MessageButton from './MessageButton';
import Balanced from './Balanced';
import Navbar from './Navbar';

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
        <div className="flex h-screen overflow-hidden">
            <Navbar />

            {/* Left sidebar - fixed */}
            <div className="w-1/4 p-8 overflow-y-auto fixed left-[10%] top-14 bottom-0">
                <ProfileInfo />
                <Balanced 
                    balance={balance} 
                    lastPurchaseDate="2024-05-24"
                    purchaseHistory={purchaseHistory}
                    onRefresh={handleRefresh}
                    onPurchase={handlePurchase}
                />
                <Sidebar />
            </div>

            {/* Middle content - scrollable */}
            <div className="custom-scrollbar flex-1 overflow-y-auto  ml-[calc(25%+10%)] mr-[25%] mt-[3.5%] p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Stories */}
                    <div className="mb-6">
                        <StoryCircles />
                    </div>
                    {/* Create post form */}
                    <CreatePostCard />
                    <Post />
                    <Post />
                    {/* Add more posts as needed */}
                </div>
            </div>

            {/* Right sidebar - if needed */}
            <div className="w-1/4 fixed right-0 top-20 bottom-0 overflow-y-auto">
                {/* Add content for the right sidebar if needed */}
            </div>

            {/* Message button to toggle sidebar */}
            <div className="fixed bottom-6 right-6 z-50">
                <MessageButton onClick={toggleSidebar} />
            </div>

            {/* RightSidebar */}
            <RightSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
}
// 
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);