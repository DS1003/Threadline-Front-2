import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from './ui/AlertDialog';
import { ChevronRight, RefreshCw } from 'lucide-react';

const Balanced = ({ balance, lastPurchaseDate, purchaseHistory, onRefresh, onPurchase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await onRefresh();
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className=" overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white shadow-lg mb-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold">{balance}</h2>
          <p className="text-sm opacity-80">JETONS</p>
        </div>
        <img className='w-[100px] ' src="https://res.cloudinary.com/dgro5x4h8/image/upload/v1728787069/argent_53876-25502-removebg-preview_gfplhe.png" alt="" />
        {/* <Gift size={36} className="text-pink-200" /> */}
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm">Dernier achat : {formatDate(lastPurchaseDate)}</p>
        <button 
          onClick={handleRefresh}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-1 bg-white text-purple-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
        >
          Historique <ChevronRight size={16} className="ml-1" />
        </button>
        <button 
          onClick={onPurchase}
          className="flex-1 bg-pink-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition-colors"
        >
          Acheter des jetons
        </button>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold mb-4">Historique d'achat</AlertDialogTitle>
            <AlertDialogDescription>
              <ul className="mt-2 space-y-3">
                {purchaseHistory.map((purchase, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-gray-600">{formatDate(purchase.date)}</span>
                    <span className="font-semibold text-purple-600">+{purchase.amount} jetons</span>
                  </li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel className="mt-4">Fermer</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; export default Balanced;

// Exemple d'utilisation
/* export default () => {
  const [balance, setBalance] = useState(500);
  const [purchaseHistory, setPurchaseHistory] = useState([
    { date: '2024-10-15', amount: 100 },
    { date: '2024-10-01', amount: 50 },
    { date: '2024-09-15', amount: 200 },
  ]);

  const handleRefresh = async () => {
    // Simuler une mise à jour du solde
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBalance(prevBalance => prevBalance + Math.floor(Math.random() * 50));
  };

  const handlePurchase = () => {
    const amount = 100;
    setBalance(prevBalance => prevBalance + amount);
    setPurchaseHistory(prevHistory => [
      { date: new Date().toISOString(), amount },
      ...prevHistory
    ]);
  };

  return (
    <TokenBalanceCard 
      balance={balance} 
      lastPurchaseDate="2024-05-24"
      purchaseHistory={purchaseHistory}
      onRefresh={handleRefresh}
      onPurchase={handlePurchase}
    />
  );
}; */