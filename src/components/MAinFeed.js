import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import ProfileInfo from './ProfileInfo';
import StoryCircles from './Stories';
import CreatePostCard from './CreatePost';
import Post from './ui/PostCard';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MessageButton from './MessageButton';
import Balanced from './Balanced';
import Navbar from './Navbar';
import withAuth from '../hoc/withAuth';

const MainFeed = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightElementsOpen, setIsRightElementsOpen] = useState(false);
    const [balance, setBalance] = useState(500);
    const [purchaseHistory, setPurchaseHistory] = useState([
        { date: '2024-10-15', amount: 100 },
        { date: '2024-10-01', amount: 50 },
        { date: '2024-09-15', amount: 200 },
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleRightElements = () => {
        setIsRightElementsOpen(!isRightElementsOpen);
    };

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

    const user = props.user;
    const isTailor = user.roles.some(role => role.name === 'TAILOR');

    return (
        <div className="flex h-screen overflow-hidden">
            <Navbar user={user} />

            {/* Left sidebar */}
            <div className="custom-scrollbar overflow-hidden w-1/4 p-8 fixed left-[10%] top-14 bottom-0 hidden lg:block">
                <ProfileInfo user={user} />
                {isTailor && (
                    <Balanced
                        balance={balance}
                        lastPurchaseDate="2024-05-24"
                        purchaseHistory={purchaseHistory}
                        onRefresh={handleRefresh}
                        onPurchase={handlePurchase}
                        user={user}
                    />
                )}
                <Sidebar />
            </div>

            {/* Middle content - scrollable */}
            <div className="custom-scrollbar flex-1 overflow-y-auto lg:ml-[calc(25%+10%)] lg:mr-[25%] mt-[3.5%] p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <StoryCircles />
                    </div>
                    <CreatePostCard user={props.user} />
                    <Post />
                </div>
            </div>

            {/* Right sidebar */}
            <div className="w-1/4 fixed right-0 top-20 bottom-0 overflow-y-auto hidden lg:block">
                {/* Add content for the right sidebar if needed */}
            </div>

            {/* Mobile-only elements */}
            <div className="lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out"
                 style={{ transform: isRightElementsOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="p-4 h-full overflow-y-auto">
                    <button onClick={toggleRightElements} className="mb-4">Close</button>
                    <ProfileInfo user={user} />
                    {isTailor && (
                        <Balanced
                            balance={balance}
                            lastPurchaseDate="2024-05-24"
                            purchaseHistory={purchaseHistory}
                            onRefresh={handleRefresh}
                            onPurchase={handlePurchase}
                            user={user}
                        />
                    )}
                    <Sidebar />
                    {/* Add any other elements you want to show in the mobile slide-out menu */}
                </div>
            </div>

            {/* Mobile toggle buttons */}
            <div className="fixed bottom-6 right-6 z-50">
                <MessageButton onClick={toggleSidebar} />
                <button
                    onClick={toggleRightElements}
                    className="bg-[#CC8C87] text-white p-3 rounded-full shadow-lg mt-4 lg:hidden"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* RightSidebar */}
            <RightSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>
    );
};

export default withAuth(MainFeed);

// Styles
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

  @media (max-width: 1023px) {
    .custom-scrollbar {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);