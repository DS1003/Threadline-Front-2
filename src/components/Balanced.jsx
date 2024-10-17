import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from './ui/Dialog';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import Label from './ui/Label';
import { RadioGroup, RadioGroupItem } from './ui/Radio-group';
import { RefreshCw, Gift, Wallet, CreditCard, Calendar, Clock } from 'lucide-react';

const PaymentMethodBadge = ({ method }) => {
  const logos = {
    wave: 'https://goamobile.com/logosent/wave@221@-P-2021-06-30_00-18-27wave_logo_2.png',
    orange: 'https://play-lh.googleusercontent.com/T4ZLP7nx1kM6oXacVqAlCqQ5d11xc1NPdC9i3iofouWGIuXXo9QW0FsQJGA01AEblDRo=w240-h480-rw',
    free: 'https://paydunya.com/refont/images/icon_pydu/partners/free.png'
  };

  const colors = {
    wave: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
    free: "bg-green-100 text-green-800"
  };

  const isValidMethod = method && (method in colors);
  const displayMethod = isValidMethod ? method : 'unknown';
  const color = isValidMethod ? colors[method] : "bg-gray-100 text-gray-800";

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${color} text-xs font-medium`}>
      {isValidMethod && <img src={logos[method]} alt={`${method} logo`} className="w-4 h-4 mr-2" />}
      {displayMethod.charAt(0).toUpperCase() + displayMethod.slice(1)}
    </div>
  );
};

const TokenBalanceCard = ({ balance, lastPurchaseDate, purchaseHistory, onRefresh, onPurchase, user }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPurchaseOpen, setPurchaseOpen] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await onRefresh();
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePurchaseStart = () => {
    setPurchaseOpen(true);
    setPurchaseStep(1);
    setAmount('');
    setPaymentMethod('');
    setVerificationCode('');
  };

  const handlePurchaseSubmit = () => {
    onPurchase(parseInt(amount), paymentMethod);
    setPurchaseOpen(false);
  };

  const tokenRate = 0.1;

  return (
    <div className="overflow-hidden bg-gradient-to-br from-[#CC8C87] to-[#ffd9d9] rounded-3xl p-8 text-white shadow-2xl mb-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-6xl font-bold mb-2">{user.credit}</h2>
          <p className="text-lg font-semibold text-[#4A4A4A]">CREDIT</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-full">
          <Gift size={40} className="text-[#4A4A4A]" />
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2 text-[#4A4A4A]">
          <Calendar size={20} />
          <p className="text-sm">Dernier achat : {formatDate(lastPurchaseDate)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading}
          className="hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          <RefreshCw size={20} className={`${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => setIsHistoryOpen(true)}
          className="bg-[#4A4A4A] bg-opacity-50 hover:bg-opacity-20 text-white font-semibold py-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
        >
          <Wallet size={20} className="mr-2" />
          Historique
        </Button>
        <Button
          onClick={handlePurchaseStart}
          className="bg-[#ce7872]  hover:bg-[#CC8C87]  text-white font-semibold py-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
        >
          <CreditCard size={20} className="mr-2" />
          Acheter
        </Button>
      </div>

      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#CC8C87] to-[#ffd9d9] p-6">
            <DialogTitle className="text-3xl font-bold mb-2 text-white">Historique d'achat</DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Vos transactions récentes
            </DialogDescription>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {purchaseHistory.map((purchase, index) => (
                <li key={index} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <CreditCard size={24} className="text-[#4A4A4A]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">+{purchase.amount} jetons</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        <span>{formatDate(purchase.date).split(' à ')[0]}</span>
                        <Clock size={12} className="ml-2 mr-1" />
                        <span>{formatDate(purchase.date).split(' à ')[1]}</span>
                      </div>
                    </div>
                  </div>
                  <PaymentMethodBadge method={purchase.paymentMethod} />
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <Button onClick={() => setIsHistoryOpen(false)} className="w-full bg-[#CC8C87] text-white hover:bg-[#cc8c8791] font-semibold py-2 px-4 rounded-xl transition duration-200 ease-in-out">
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPurchaseOpen} onOpenChange={setPurchaseOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#CC8C87] to-[#ffd9d9] p-6">
            <DialogTitle className="text-3xl font-bold mb-2 text-white">
              {purchaseStep === 1 ? "Achat de jetons" : "Vérification"}
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              {purchaseStep === 1 ? "Choisissez le montant et la méthode de paiement" : "Entrez le code de vérification"}
            </DialogDescription>
          </div>
          <div className="p-6">
            {purchaseStep === 1 ? (
              <>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Montant
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-[#CC8C87] focus:ring-[#CC8C87]"
                      placeholder="Entrez le montant"
                    />
                  </div>
                  {amount && (
                    <p className="text-sm text-[#CC8C87] font-semibold">
                      Vous recevrez {Math.floor(parseInt(amount) / tokenRate)} jetons
                    </p>
                  )}
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Méthode de paiement
                    </Label>
                    <RadioGroup onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">

                      {['wave', 'orange', 'free'].map((method) => (
                        <div key={method}>
                          <RadioGroupItem value={method} id={method} className="peer sr-only" />
                          <Label
                            htmlFor={method}
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-[#CC8C87] peer-data-[state=checked]:border-[#CC8C87] peer-data-[state=checked]:bg-[#cc8c87c0] transition duration-200 ease-in-out cursor-pointer"
                          >
                            <img src="logos{{method}" alt={`${method} logo`} className="w-12 h-6 object-contain mb-2" />
                            {method.charAt(0).toUpperCase() + method.slice(1)}
                          </Label>
                        </div>
                      ))}

                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button onClick={() => setPurchaseStep(2)} disabled={!amount || !paymentMethod}
                    className="w-full bg-[#CC8C87] hover:bg-[#cc8c87b7] text-white font-semibold py-2 rounded-xl transition duration-200 ease-in-out">
                    Suivant
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                      Code de vérification
                    </Label>
                    <Input
                      id="code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-[#CC8C87] focus:ring-[#CC8C87]"
                      placeholder="Entrez le code"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button onClick={handlePurchaseSubmit} disabled={!verificationCode}
                    className="w-full bg-[#CC8C87] hover:bg-[#cc8c87b7] text-white font-semibold py-2 rounded-xl transition duration-200 ease-in-out">
                    Valider l'achat
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenBalanceCard;