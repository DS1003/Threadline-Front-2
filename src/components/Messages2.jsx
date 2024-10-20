import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, ChevronLeft, ChevronRight, Mic, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Avatar, AvatarImage } from "./ui/Avatar";
import apiService from '../services/ApiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageInterface = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const connectedUserId = userInfo?.id || null;
  const token = userInfo?.token || null;

  useEffect(() => {
    if (connectedUserId && token) {
      fetchUsers();
    }
  }, [connectedUserId, token]);

  useEffect(() => {
    if (selectedChat && token) {
      fetchMessages();
    }
  }, [selectedChat, token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const response = await apiService.request('GET', '/users/getAll', null, token);
      if (Array.isArray(response.users)) {
        const filteredUsers = response.users.filter(user => user.id !== connectedUserId);
        setUsers(filteredUsers);
        if (filteredUsers.length > 0) {
          setSelectedChat(filteredUsers[0]);
        }
      } else {
        console.error('Expected an array of users, but received:', response);
        toast.error('Error loading users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    
    try {
      const response = await apiService.request('GET', `/messages/connected-user?receiverId=${selectedChat.id}`, null, token);
      if (Array.isArray(response.messages)) {
        const formattedMessages = response.messages.map(msg => ({
          id: msg.id,
          sender: msg.senderId === connectedUserId ? 'You' : 'Other',
          content: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        }));
        setMessages(formattedMessages);
      } else {
        console.error('Expected an array of messages, but received:', response);
        toast.error('Error loading messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' && selectedChat && token) {
      try {
        const response = await apiService.request('POST', '/messages/new', { 
          content: newMessage, 
          receiverId: selectedChat.id 
        }, token);
        
        if (response.status) {
          const newMsg = {
            id: response.message.id,
            sender: 'You',
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text',
          };
          setMessages(prevMessages => [...prevMessages, newMsg]);
          setNewMessage('');
        } else {
          throw new Error(response.msg || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setIsRecording(false);
        
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('receiverId', selectedChat.id);
        
        apiService.request('POST', '/messages/audio', formData, token)
          .then(() => {
            toast.success('Audio message sent');
            fetchMessages();
          })
          .catch(error => {
            toast.error('Failed to send audio message');
          });
      });
    });
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
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
                  placeholder="Search chats"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-80px)]">
              {users.map(user => (
                <div
                  key={user.id}
                  className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                    selectedChat?.id === user.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedChat(user)}
                >
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={user.photoUrl} alt={`${user.firstname} ${user.lastname}`} />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.firstname} {user.lastname}</h3>
                    <p className="text-sm text-gray-500">Last message...</p>
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
            <Button variant="ghost" onClick={toggleSidebar} className="mr-4 text-[#4A4A4A] hover:bg-[#CC8C87]/10">
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <p className="text-sm">{message.sender}</p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-400">{message.time}</p>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-4"
            />
            <Button onClick={handleSendMessage} className="text-[#CC8C87]">
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInterface;
