import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppRoutes from './routes'; // Import the routes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Initialize the QueryClient

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppRoutes /> {/* Use the centralized routes */}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
