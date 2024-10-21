import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import PageLoader from './components/PageLoader';
import MessageInterface from './components/Messages2';

// Lazy loading the Dashboard & MainFeed component
const Dashboard = lazy(() => import('./components/Dashboard'));
const MainFeed = lazy(() => import('./components/MAinFeed'));
const Login = lazy(() => import('./components/Login'));
const ProfilePage = lazy(() => import('./components/ui/ProfilePage'));
const ProfilePageBis = lazy(() => import('./components/ui/ProfilePageBis'));
const Register = lazy(() => import('./components/Register'));
const Messages = lazy(() => import('./components/Messages2'));
const ProfilePage2 = lazy(() => import('./components/ProfilePage2'));
const VendeurProfile = lazy(() => import('./components/VendeurProfile'));
const ShoppingCart = lazy(() => import('./components/ShoppingCart'));

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
        <Route path="/profileBis/:userId" element={<ProfilePageBis />} />
        <Route path="/messages" element={<MessageInterface />} />
        <Route path="/messages2" element={<Messages />} />
        <Route path="/profile2" element={<ProfilePage2 />} />
        <Route path="/vendeurProfile" element={<VendeurProfile />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

