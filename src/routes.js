import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import PageLoader from './components/PageLoader';

// Lazy loading the Dashboard & MainFeed component
const Dashboard = lazy(() => import('./components/Dashboard'));
const MainFeed = lazy(() => import('./components/MAinFeed'));
const Login = lazy(() => import('./components/Login'));
const ProfilePage = lazy(() => import('./components/ui/ProfilePage'));
const MessagingPage = lazy(() => import('./components/Messaging'));
const Register = lazy(() => import('./components/Register'));
const Messages = lazy(() => import('./components/Messages2'));

const AppRoutes = () => {
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loader" element={<PageLoader />} />
        <Route path="/feed" element={<MainFeed />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/messages2" element={<Messages />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

