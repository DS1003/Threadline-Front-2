import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from './ui/Dialog';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import Label from './ui/Label';
import { RefreshCw, Gift, Wallet, CreditCard, Calendar, Clock } from 'lucide-react';
import { GrTransaction } from "react-icons/gr";
import { BsFillCreditCardFill } from "react-icons/bs";

import apiService from '../services/ApiService';
import Loading from './animations/Loading';
import { toast, ToastContainer } from 'react-toastify';

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

const TokenBalanceCard = ({ balance, updateBalance, lastPurchaseDate, purchaseHistory, onRefresh, onPurchase, user }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPurchaseOpen, setPurchaseOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [recipient, setRecipient] = useState('me'); // Default radio selection
  const [error, setError] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);

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
    setAmount('');
  };

  const handlePurchaseSubmit = () => {
    setPurchaseOpen(false);
  };

  const tokenRate = 0.1;

  const handleAmountClick = (clickedAmount) => {
    setAmount(clickedAmount.toString());
  };

  const amounts = [
    { id: 1, value: 100 },
    { id: 2, value: 300 },
    { id: 3, value: 500 },
    { id: 4, value: 1000 },
    { id: 5, value: 1500 },
    { id: 6, value: 2000 }
  ]

  const handleAmountChange = (e) => {
    setAmount((prevAmount) => prevAmount === e.target.value ? '' : e.target.value);
    setError('');
  }

  const handleSubmitCreditPurchase = async (e) => {
    e.preventDefault();

    if (!amount) {
      setError('Le montant est obligatoire');
      return;
    } else if (parseInt(amount) !== 100 && parseInt(amount) !== 300 && parseInt(amount) !== 500 && parseInt(amount) !== 1000 && parseInt(amount) !== 1500 && parseInt(amount) !== 2000) {
      setError('La valeur du montant de l\'achat doit correspondre aux valeus prédfinies sur les boxes en dessous');
      return;
    }

    setLoadingButton(true);


    try {
      let response = null;
      if (recipient === 'other') {
        console.log(parseInt(amount));
        console.log(email);
        response = await apiService.request('post', '/recharge/create', { amount: parseInt(amount), receiverEmail: email }, user.token);
      } else {
        response = await apiService.request('post', '/recharge/create', { amount: parseInt(amount) }, user.token);
        console.log(response);
        console.log(response.recharge);
      }
      setAmount('');
      setEmail('');
      setPurchaseOpen(false);
      toast.success('Achat de crédit effectué avec succès...');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingButton(false);
    }
  }

  const getCredit = (amount) => {
    switch (amount) {
      case 100:
        return 10;
      case 300:
        return 32;
      case 500:
        return 52;
      case 1000:
        return 104;
      case 1200:
        return 128;
      case 1500:
        return 160;
      case 2000:
        return 210;
      default:
        return 0;
    }
  }

  const [rechargeVisible, setRechargeVisible] = useState(false);
  const [codeRecharge, setCodeRecharge] = useState('');

  // Fonction pour ouvrir/fermer le pop-up
  const togglePopup = () => {
    setRechargeVisible(!rechargeVisible);
  };

  const handleRecharge = async () => {

    try {
      const response = await apiService.request('post', '/recharge/credit-recharge', { code: parseInt(codeRecharge) }, user.token);
      user.credit = response.credit
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Rechargement effectué avec succès...');
      updateBalance(response.credit)
      setCodeRecharge('');
      togglePopup();
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ position: 'absolute', top: 10 }} 
      />

      <div className="overflow-hidden bg-gradient-to-br from-[#CC8C87] to-[#ffd9d9] rounded-3xl p-8 text-white shadow-2xl mb-4 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-6xl font-bold mb-2">{balance} </h2> {/* Il ne met pas à jour le nombre de crédit lorsque je fait une recharge */}
            <p className="text-lg font-semibold text-[#4A4A4A]">CREDIT</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-full cursor-pointer" title='recharger votre crédit' onClick={togglePopup}>
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
            className="bg-[#4A4A4A] bg-opacity-50 hover:bg-opacity-20 text-white flex flex-col items-center gap-2 font-semibold py-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
          >

            <GrTransaction size={20} className="mr-2 " />
            <div>Historique transactions</div>

          </Button>
          <Button
            onClick={handlePurchaseStart}
            className="bg-[#ce7872]  hover:bg-[#CC8C87]  text-white flex flex-col items-center gap-2 font-semibold py-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
          >
            <BsFillCreditCardFill size={20} className="mr-2" />
            Acheter du crédit
          </Button>
        </div>

        <Dialog open={rechargeVisible} onOpenChange={setRechargeVisible}>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-3xl p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-[#CC8C87] to-[#ffd9d9] p-6">
              <DialogTitle className="text-3xl font-bold mb-2 text-white">Recharger votre crédit</DialogTitle>
              <DialogDescription className="text-[#4A4A4A]">
                Ajouter du crédit à votre compte
              </DialogDescription>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <input
                type="text"
                value={codeRecharge}
                onChange={(e) => setCodeRecharge(e.target.value)}
                placeholder="Entrez votre code de recharge"
                className="border p-2 rounded w-full mb-4"
              />
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <Button onClick={handleRecharge} className="w-full bg-[#CC8C87] text-white hover:bg-[#cc8c8791] font-semibold py-2 px-4 rounded-xl transition duration-200 ease-in-out">
                Recharger
              </Button>
            </div>
          </DialogContent>
        </Dialog>


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
                Achat de credits
              </DialogTitle>
              <DialogDescription className="text-[#4A4A4A] text-[15px]">
                Acheter du crédit pour vous ou quelqu'un d'autre
              </DialogDescription>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmitCreditPurchase}>
                <div className="space-y-6">
                  <div>
                    <input type='radio' id="me" name="recipient" value="me" checked={recipient === 'me'} onChange={() => setRecipient('me')} />
                    <label htmlFor="me" className='ml-2' >Pour moi</label>
                    <input type='radio' id='other' name='recipient' value='other' checked={recipient === 'other'} onChange={() => setRecipient('other')} className='ml-4' />
                    <label htmlFor="other" className='ml-2'>Pour un autre</label>
                  </div>
                  {recipient === 'other' && (
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                      </Label>
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border-gray-300 focus:border-[#CC8C87] focus:ring-[#CC8C87]"
                        placeholder="Entrez l'adresse email du bénéficiaire"
                      />

                    </div>
                  )}
                  <div>
                    <Label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Montant
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full rounded-xl border-gray-300 focus:border-[#CC8C87] focus:ring-[#CC8C87]"
                      placeholder="Entrez le montant"
                    />
                    {
                      error && (
                        <p className="text-sm text-[#CC8C87] font-semibold mt-3">
                          {error}
                        </p>
                      )
                    }
                  </div>
                  {amount && (
                    <p className="text-sm text-green-500 font-semibold">
                      Vous recevrez {getCredit(parseInt(amount))} crédits
                    </p>
                  )}
                  <div className='flex flex-row flex-wrap gap-4'>
                    {
                      amounts.map((item) => {
                        return (
                          <div key={item.id} type="button" onClick={() => handleAmountClick(item.value)} className={`bg-[#4A4A4A] cursor-pointer flex justify-center items-center flex-col bg-opacity-50 rounded-xl p-2 text-white w-20 h-20 ${amount === item.value.toString() ? 'bg-opacity-70' : ''}`}>
                            {item.value} <p>CFA</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit" disabled={loadingButton}
                    className={`w-full bg-[#CC8C87] hover:bg-[#cc8c87b7] text-white font-semibold py-2 rounded-xl transition duration-200 ease-in-out ${loadingButton ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loadingButton ? <Loading /> : "Valider l'achat"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>

  );
};

export default TokenBalanceCard;