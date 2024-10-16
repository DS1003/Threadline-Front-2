import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppRoutes from './routes'; // Import the routes
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <ErrorBoundary>
        <AppRoutes /> {/* Use the centralized routes */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
