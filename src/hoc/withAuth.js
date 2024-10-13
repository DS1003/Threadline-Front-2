import React from 'react';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log("Auth status:", isAuthenticated);

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-100">
              {/* Icône de cadenas stylisée avec CSS */}
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Accès Restreint
              </h2>

              <p className="text-gray-600 text-center mb-6">
                Veuillez vous connecter pour accéder à cette page.
              </p>

              <div className="flex justify-center">
                <a
                  href="/login"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <span>Connexion</span>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export default withAuth;