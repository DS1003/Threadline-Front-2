import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical, ChevronLeft, ChevronRight, Image, X, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Alert from './ui/Alert';
import 'react-toastify/dist/ReactToastify.css';

const MessageInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const chats = [
    { id: 1, name: 'Real estate deals', unread: 3, lastMessage: 'New property listing!', time: '11:45 AM' },
    { id: 2, name: 'Kate Johnson', unread: 0, lastMessage: 'Thanks for the update', time: '10:30 AM' },
    { id: 3, name: 'Tamara Shevchenko', unread: 1, lastMessage: 'Meeting at 3 PM?', time: 'Yesterday' },
    { id: 4, name: 'Joshua Clarkson', unread: 0, lastMessage: 'Contract signed!', time: 'Yesterday' },
    { id: 5, name: 'Jeroen Zoet', unread: 2, lastMessage: 'New market analysis', time: 'Monday' },
  ];

  useEffect(() => {
    setSelectedChat(chats[0]);
    setMessages([
      { id: 1, sender: 'Kate Johnson', content: "Hi everyone, let's start the call soon!", time: '11:24 AM', type: 'text' },
      { id: 2, sender: 'Kate Johnson', content: 'Recently I saw properties in a great location that I did not pay attention to before 😊', time: '11:24 AM', type: 'text' },
      { id: 3, sender: 'Evan Scott', content: "Ooo, why don't you say something more", time: '11:34 AM', type: 'text' },
      { id: 4, sender: 'Evan Scott', content: '@Kate ? 😉', time: '11:34 AM', type: 'text' },
      { id: 5, sender: 'You', content: 'She creates an atmosphere of mystery 😄', time: '11:36 AM', type: 'text' },
      { id: 6, sender: 'Evan Scott', content: "Kate, don't be like that and say something more :)", time: '11:44 AM', type: 'text' },
      { id: 7, sender: 'You', content: '/api/placeholder/400/300', time: '11:50 AM', type: 'image' },
      { id: 8, sender: 'Kate Johnson', content: '/api/placeholder/400/300', time: '11:55 AM', type: 'video' },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' || isRecording) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: isRecording ? `Audio message (${recordingDuration}s)` : newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: isRecording ? 'audio' : 'text'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setIsRecording(false);
      setRecordingDuration(0);
      simulateResponse();
    }
  };

  const simulateResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const responseMsg = {
        id: messages.length + 2,
        sender: selectedChat.name,
        content: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: '/api/placeholder/400/300',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: fileType
      };
      setMessages([...messages, newMsg]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'image':
        return <img src={message.content} alt="Shared image" className="rounded-lg max-w-sm" />;
      case 'video':
        return (
          <div className="relative">
            <img src={message.content} alt="Video thumbnail" className="rounded-lg max-w-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-2">
            <Play className="w-8 h-8 text-blue-500" />
            <div className="h-1 bg-blue-500 rounded-full flex-grow"></div>
            <span className="text-sm text-gray-500">{message.content}</span>
          </div>
        );
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-white border-r"
          >
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chats"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                    selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex flex-col">
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4">
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
            <h2 className="text-xl font-semibold">{selectedChat?.name}</h2>
          </div>
          <div className="flex space-x-4">
            <Phone className="w-6 h-6 text-gray-500 cursor-pointer" />
            <Video className="w-6 h-6 text-gray-500 cursor-pointer" />
            <MoreVertical className="w-6 h-6 text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md ${
                  message.sender === 'You'
                    ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg'
                    : 'bg-gray-200 rounded-r-lg rounded-bl-lg'
                } p-3`}
              >
                <p className="font-semibold mb-1">{message.sender}</p>
                {renderMessageContent(message)}
                <p className="text-xs mt-1 text-right">
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 rounded-lg p-3">
                <p className="text-gray-500">Typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-gray-500 hover:text-gray-700"
            >
              <Paperclip />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*,audio/*"
            />
            <button
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Smile />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={isRecording ? handleSendMessage : toggleRecording}
              className={`p-2 rounded-full ${
                isRecording ? 'bg-red-500' : 'bg-blue-500'
              } text-white`}
            >
              {isRecording ? (
                <div className="flex items-center">
                  <Pause className="w-5 h-5" />
                  <span className="ml-2">{recordingDuration}s</span>
                </div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-blue-500 text-white"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-10 right-10"
        >
          <Alert type="success" message="File uploaded successfully!" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
};

export default MessageInterface;