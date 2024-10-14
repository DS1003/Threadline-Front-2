import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import ProfilePage from './components/ui/ProfilePage';
import PageLoader from './components/PageLoader';



// Lazy load the Dashboard component en ajoutant le page loader lors du chargement 
const Dashboard = lazy(() => import('./components/Dashboard'));
// Lazy load the MainFeed component en ajoutant le page loader lors du chargement
const MainFeed = lazy(() => import('./components/MAinFeed'));



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
      </Routes>
    </Suspense>
  );
};


/* 
const MainFead = lazy(() => import('./components/MAinFeed'));

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
      </Routes>
    </Suspense>
  );
};
 */
export default AppRoutes;

