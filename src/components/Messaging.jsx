import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialConversations = [
  { id: 1, name: 'Roger Korsgaard', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'Hey, how are you doing?', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Terry Torff', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'The project is coming along nicely!', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Angel Bergson', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'Can we schedule a call for tomorrow?', time: 'Monday', unread: 1 },
  { id: 4, name: 'Zoe Daniels', avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4', lastMessage: 'I\'ve sent you the files you requested.', time: 'Last week', unread: 0 },
];

const ChatMessage = ({ id, content, isSent, time, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    onEdit(id, editedContent);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[70%] p-3 rounded-lg ${isSent ? 'bg-[#CC8C87] text-white' : 'bg-gray-100 text-[#4A4A4A]'} relative group`}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full bg-transparent border-b border-white focus:outline-none"
            />
            <button onClick={handleEdit} className="text-xs mt-1">Save</button>
          </div>
        ) : (
          <p>{content}</p>
        )}
        <span className={`text-xs ${isSent ? 'text-white' : 'text-gray-500'} mt-1 block`}>{time}</span>
        {isSent && (
          <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIsEditing(true)} className="text-white mr-2">
              <Edit2 size={16} />
            </button>
            <button onClick={() => onDelete(id)} className="text-white">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ConversationItem = ({ id, name, avatar, lastMessage, time, unread, isActive, onClick, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    whileHover={{ scale: 1.02 }}
    className={` flex items-center p-3 cursor-pointer transition-colors duration-200 ${isActive ? 'bg-[#CC8C87] bg-opacity-10' : 'hover:bg-gray-100'}`}
  >
    <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-3" />
    <div className="flex-1" onClick={() => onClick(id)}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-[#4A4A4A]">{name}</span>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
    </div>
    {unread > 0 && (
      <span className="bg-[#CC8C87] text-white text-xs font-bold px-2 py-1 rounded-full ml-2">
        {unread}
      </span>
    )}
    <button onClick={() => onDelete(id)} className="ml-2 text-gray-400 hover:text-red-500">
      <Trash2 size={16} />
    </button>
  </motion.div>
);

const MessagingPage = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = { id: Date.now(), content: newMessage, isSent: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      // Update last message in conversation list
      setConversations(conversations.map(conv =>
        conv.id === activeConversation ? { ...conv, lastMessage: newMessage, time: 'Just now' } : conv
      ));
      // Simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, content: "Thanks for your message! I'll get back to you soon.", isSent: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 1000);
    }
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleEditMessage = (id, newContent) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, content: newContent } : msg));
  };

  const handleDeleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (activeConversation === id) {
      setActiveConversation(null);
      setMessages([]);
    }
  };

  const handleAddConversation = () => {
    const newConv = {
      id: Date.now(),
      name: 'New Contact',
      avatar: 'https://avatars.githubusercontent.com/u/100100154?v=4',
      lastMessage: 'Click to start chatting',
      time: 'Now',
      unread: 0
    };
    setConversations([newConv, ...conversations]);
  };

  return (
    <div className="flex h-screen bg-white ">
      {/* Conversations List */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-1/3 border-r border-gray-200 overflow-y-auto mt-20"
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center ">
          <h2 className="text-2xl font-bold text-[#4A4A4A]">Messages</h2>
          <button onClick={handleAddConversation} className="bg-[#CC8C87] text-white p-2 rounded-full">
            <motion.div whileHover={{ rotate: 90 }}>+</motion.div>
          </button>
        </div>
        <AnimatePresence>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              {...conversation}
              isActive={activeConversation === conversation.id}
              onClick={setActiveConversation}
              onDelete={handleDeleteConversation}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col"
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between mt-20">
              <div className="flex items-center">
                <img 
                  src={conversations.find(c => c.id === activeConversation)?.avatar} 
                  alt={conversations.find(c => c.id === activeConversation)?.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold text-lg text-[#4A4A4A]">
                  {conversations.find(c => c.id === activeConversation)?.name}
                </span>
              </div>
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Phone className="text-[#CC8C87] cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Video className="text-[#CC8C87] cursor-pointer" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                  <MoreVertical className="text-[#CC8C87] cursor-pointer" />
                </motion.div>
              </div>
            </div>

            {/* Options Menu */}
            <AnimatePresence>
              {isOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute right-0 mt-16 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Block Contact
                    </button>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Clear Chat History
                    </button>
                    <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                      Delete Conversation
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    {...message}
                    onDelete={handleDeleteMessage}
                    onEdit={handleEditMessage}
                  />
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <motion.form
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              onSubmit={handleSendMessage}
              className="p-4 pl-8 border-t border-gray-200 flex items-center"
            >
              <Paperclip className="text-gray-400 mr-2 cursor-pointer" />
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="ml-2 bg-[#CC8C87] text-white p-2 rounded-full"
              >
                <Send size={20} />
              </motion.button>
            </motion.form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MessagingPage;