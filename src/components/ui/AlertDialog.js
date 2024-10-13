import React, { createContext, useContext } from 'react';

const AlertDialogContext = createContext();

export const AlertDialog = ({ children, open, onOpenChange }) => {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {children}
          </div>
        </div>
      )}
    </AlertDialogContext.Provider>
  );
};

export const AlertDialogContent = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export const AlertDialogHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const AlertDialogTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold mb-2">{children}</h2>;
};

export const AlertDialogDescription = ({ children }) => {
  return <p className="text-gray-600">{children}</p>;
};

export const AlertDialogCancel = ({ children }) => {
  const { onOpenChange } = useContext(AlertDialogContext);
  return (
    <button
      className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </button>
  );
};