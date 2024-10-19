import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical, ChevronLeft, ChevronRight, Image, X, Play, Pause, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Card, CardContent } from "./ui/Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Removed import Link from 'next/link';

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
      { id: 7, sender: 'You', content: '/placeholder.svg?height=300&width=400', time: '11:50 AM', type: 'image' },
      { id: 8, sender: 'Kate Johnson', content: '/placeholder.svg?height=300&width=400', time: '11:55 AM', type: 'video' },
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
        content: '/placeholder.svg?height=300&width=400',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: fileType
      };
      setMessages([...messages, newMsg]);
      setShowAlert(true);
      toast.success("File uploaded successfully!");
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
        return <img src={message.content} alt="Shared-image" className="rounded-lg max-w-sm" />;
      case 'video':
        return (
          <div className="relative group cursor-pointer">
            <img src={message.content} alt="Video thumbnail" className="rounded-lg max-w-sm" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="flex items-center space-x-2 bg-[#F0D4D0]/10 rounded-full p-2 cursor-pointer">
            <Play className="w-8 h-8 text-[#F0D4D0]" />
            <div className="h-1 bg-[#F0D4D0] rounded-full flex-grow"></div>
            <span className="text-sm text-[#F0D4D0]">{message.content}</span>
          </div>
        );
      default:
        return <p>{message.content}</p>;
    }
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-white border-r border-gray-200"
          >
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search chats"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F0D4D0]"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                    selectedChat?.id === chat.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${chat.name.charAt(0)}`} />
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="bg-[#F0D4D0] text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
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
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-4 text-gray-600 hover:bg-gray-100" onClick={() => console.log('Navigate to feed')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button variant="ghost" onClick={toggleSidebar} className="mr-4 text-gray-600 hover:bg-gray-100">
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
            <h2 className="text-xl font-semibold text-gray-900">{selectedChat?.name}</h2>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100"><Phone className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100"><Video className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100"><MoreVertical className="w-6 h-6" /></Button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md ${
                  message.sender === 'You'
                    ? 'bg-[#F0D4D0] text-white rounded-l-lg rounded-br-lg'
                    : 'bg-white text-gray-900 rounded-r-lg rounded-bl-lg'
                } p-3 shadow-lg`}
              >
                <p className="font-semibold mb-1">{message.sender}</p>
                {renderMessageContent(message)}
                <p className="text-xs mt-1 text-right opacity-70">
                  {message.time}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-lg p-3 shadow-lg">
                <p className="text-[#F0D4D0]">Typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current.click()} className="text-gray-600 hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*,audio/*"
            />
            <Button variant="ghost" size="icon" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className="text-gray-600 hover:bg-gray-100">
              <Smile className="w-5 h-5" />
            </Button>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow bg-white text-gray-900 border-gray-300 focus:ring-[#F0D4D0]"
            />
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="icon"
              onClick={isRecording ? handleSendMessage : toggleRecording}
              className={isRecording ? "bg-red-500 hover:bg-red-600" :   "bg-[#F0D4D0] hover:bg-[#F0D4D0]/90 text-white"}
            >
              {isRecording ? (
                <div className="flex items-center">
                  <Pause className="w-5 h-5" />
                  <span className="ml-2">{recordingDuration}s</span>
                </div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>
            <Button onClick={handleSendMessage} className="bg-[#F0D4D0] hover:bg-[#F0D4D0]/90 text-white">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MessageInterface;