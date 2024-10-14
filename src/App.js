import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppRoutes from './routes'; // Import the routes

function App() {
  return (
    <div>
      <ErrorBoundary>
        <AppRoutes /> {/* Use the centralized routes */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
