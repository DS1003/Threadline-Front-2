import React from 'react';
import { Minus, Plus, Trash2, ShoppingCart as CartIcon } from 'lucide-react';
import Navbar from './Navbar';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center space-x-4">
      <img src={`/api/placeholder/80/80`} alt={item.name} className="w-16 h-16 object-cover rounded-full" />
      <div>
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.color}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-gray-700">
          <Minus size={16} />
        </button>
        <span className="mx-2 text-gray-700">{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-gray-700">
          <Plus size={16} />
        </button>
      </div>
      <span className="font-semibold text-gray-800">${item.price.toFixed(2)}</span>
      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const ShoppingCart = () => {
  const [items, setItems] = React.useState([
    { id: 1, name: "Relaxed Fit T-shirt", color: "Blue", quantity: 1, price: 12.99 },
    { id: 2, name: "Nylon Sports Cap", color: "Pink", quantity: 1, price: 14.99 },
    { id: 3, name: "Sneakers", color: "White", quantity: 1, price: 34.99 },
    { id: 4, name: "Slim Fit Suit Vest", color: "Yellow", quantity: 1, price: 17.99 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.2; // 20% discount
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-rose-100">
      {/* Placeholder for NavBar */}
      <div className="bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Header */}
      <div className="bg-gray-800 text-white relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <CartIcon size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Threadline</h1>
              <p className="text-rose-300">Shopping Cart</p>
            </div>
          </div>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-100 transition duration-300">
            Continue Shopping
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-300"></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto mt-8 px-4 flex space-x-8">
        {/* Cart Items */}
        <div className="flex-grow bg-white rounded-lg shadow-lg p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {items.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (20%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-800 pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-rose-400 text-white py-3 rounded-full hover:bg-rose-500 transition duration-300 font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
