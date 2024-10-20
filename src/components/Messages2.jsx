import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical, ChevronLeft, ChevronRight, Image, X, Play, Pause, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Card, CardContent } from "./ui/Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', content: 'Bonjour !', time: '10:30 AM' },
    { id: 2, sender: 'You', content: 'Salut John, comment ça va ?', time: '10:31 AM' },
    { id: 3, sender: 'John Doe', content: 'Ça va bien, merci ! Et toi ?', time: '10:32 AM' },
    { id: 4, sender: 'You', content: 'Très bien aussi, merci !', time: '10:33 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Très bien aussi, merci !', time: '10:33 AM', unread: 0 },
    { id: 2, name: 'Jane Smith', lastMessage: 'On se voit demain ?', time: '11:45 AM', unread: 2 },
    { id: 3, name: 'Alice Johnson', lastMessage: 'N\'oublie pas la réunion', time: '12:15 PM', unread: 1 },
  ];

  useEffect(() => {
    // Sélectionner le premier chat par défaut
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleFileUpload = (event) => {
    console.log('File uploaded:', event.target.files[0]);
    toast.info('Fichier téléchargé avec succès !');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingDuration(0);
      // Logique de démarrage d'enregistrement ici
    } else {
      // Logique d'arrêt d'enregistrement et d'envoi de message audio ici
      toast.info('Enregistrement audio envoyé !');
    }
  };

  const renderMessageContent = (message) => {
    // Pour l'instant, nous affichons simplement le contenu texte
    return <p>{message.content}</p>;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-white text-[#4A4A4A]">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-white border-r border-gray-200 shadow-md"
          >
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" />
                <Input
                  type="text"
                  placeholder="Rechercher des conversations"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CC8C87] text-[#4A4A4A]"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
                    selectedChat?.id === chat.id ? 'bg-[#CC8C87]/10' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={`/api/placeholder/48/48?text=${chat.name.charAt(0)}`} />
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-[#4A4A4A]">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{chat.time}</p>
                    {chat.unread > 0 && (
                      <span className="bg-[#CC8C87] text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
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
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-4 text-[#4A4A4A] hover:bg-[#CC8C87]/10" onClick={() => console.log('Navigate to feed')}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button variant="ghost" onClick={toggleSidebar} className="mr-4 text-[#4A4A4A] hover:bg-[#CC8C87]/10">
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
            <h2 className="text-xl font-semibold text-[#4A4A4A]">{selectedChat?.name}</h2>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-[#CC8C87] hover:bg-[#CC8C87]/10"><Phone className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="text-[#CC8C87] hover:bg-[#CC8C87]/10"><Video className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="text-[#CC8C87] hover:bg-[#CC8C87]/10"><MoreVertical className="w-6 h-6" /></Button>
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
                    ? 'bg-[#CC8C87] text-white rounded-l-lg rounded-br-lg'
                    : 'bg-white text-[#4A4A4A] rounded-r-lg rounded-bl-lg border border-gray-200'
                } p-3 shadow-md`}
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
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <p className="text-[#CC8C87]">En train d'écrire...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 p-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current.click()} className="text-[#CC8C87] hover:bg-[#CC8C87]/10">
              <Paperclip className="w-5 h-5" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*,audio/*"
            />
            <Button variant="ghost" size="icon" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className="text-[#CC8C87] hover:bg-[#CC8C87]/10">
              <Smile className="w-5 h-5" />
            </Button>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez un message"
              className="flex-grow bg-white text-[#4A4A4A] border-gray-300 focus:ring-[#CC8C87] focus:border-[#CC8C87]"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant={isRecording ? "destructive" : "secondary"}
              size="icon"
              onClick={isRecording ? handleSendMessage : toggleRecording}
              className={isRecording ? "bg-red-500 hover:bg-red-600" : "bg-[#CC8C87] hover:bg-[#CC8C87]/90 text-white"}
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
            <Button onClick={handleSendMessage} className="bg-[#CC8C87] hover:bg-[#CC8C87]/90 text-white">
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