import React, { useEffect, useState } from 'react';
import apiService from '../services/ApiService';

function withAuth(Component) {
  return function AuthenticatedComponent(props) {

    const user = JSON.parse(localStorage.getItem('user'));
    const [isValidToken, setIsValidToken] = useState(true);

    useEffect(() => {
      validateToken();
    }, []);

    const validateToken = async () => {
      if (user && user.token) {
        try {
          const response = await apiService.request('POST', '/users/verify', { token: user.token });
          console.log("La réponse est :", response);
          setIsValidToken(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          setIsValidToken(false);
        }
      } else {
        setIsValidToken(false);
      }
    }

    if (isValidToken === false) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-100">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#CC8C87]"
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
                  className="inline-flex items-center px-6 py-3 bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
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

    return <Component user={user} />;
  };
}

export default withAuth;