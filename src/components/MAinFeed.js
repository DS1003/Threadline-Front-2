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
import UserSuggestions from './UserSuggestions';

const MainFeed = (props) => {
    const user = props.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRightElementsOpen, setIsRightElementsOpen] = useState(false);
    const [balance, setBalance] = useState(user?.credit);
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


    const handlePostCreationAnUpdateBalance = (deduction) => {
        setBalance(prevBalance => prevBalance - deduction);
    }

    
    const isTailor = user.roles.some(role => role.name === 'TAILOR');

    return (
        <div className="flex h-screen overflow-hidden">
            <Navbar user={user} />

            {/* Left sidebar */}
            <div className="hidden-scrollbar overflow-hidden w-1/4 p-8 fixed left-[5%] top-14 bottom-0 hidden lg:block">
                <div className="h-full overflow-y-auto">
                    <ProfileInfo user={user} />
                    {isTailor && (
                        <Balanced
                            balance={balance}
                            updateBalance={setBalance}
                            lastPurchaseDate="2024-05-24"
                            purchaseHistory={purchaseHistory}
                            user={user}
                        />
                    )}
                    <Sidebar />
                </div>
            </div>

            {/* Middle content - scrollable */}
            <div className="hidden-scrollbar flex-1 overflow-y-auto lg:ml-[calc(25%+5%)] lg:mr-[27%] mt-[3.5%] p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <StoryCircles />
                    </div>
                    <CreatePostCard user={props.user} onPostCreate={handlePostCreationAnUpdateBalance}/>
                    <Post user={user}/>
                    {/* Add more posts as needed */}
                </div>
            </div>

            {/* Right sidebar with UserSuggestions */}
            <div className="w-1/5 fixed right-28 top-24 bottom-4 overflow-hidden shadow-lg bg-white rounded-lg hidden lg:block">
                <div className="h-full overflow-y-auto hidden-scrollbar p-4">
                    <UserSuggestions />
                </div>
            </div>

            {/* Mobile-only elements */}
            <div className="lg:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out"
                 style={{ transform: isRightElementsOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="p-4 h-full overflow-y-auto hidden-scrollbar">
                    <button onClick={toggleRightElements} className="mb-4">Close</button>
                    <ProfileInfo user={user} />
                    {isTailor && (
                        <Balanced
                            balance={balance}
                            lastPurchaseDate="2024-05-24"
                            purchaseHistory={purchaseHistory}
                            user={user}
                        />
                    )}
                    <Sidebar />
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
  .hidden-scrollbar {
    scrollbar-width: none;  /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */
  }

  .hidden-scrollbar::-webkit-scrollbar {
    display: none;  /* For Chrome, Safari, and Opera */
  }

  @media (max-width: 1023px) {
    .hidden-scrollbar {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);