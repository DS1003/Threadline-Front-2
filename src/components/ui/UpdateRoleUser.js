import React, { useState } from 'react';
import { Scissors, ShoppingCart, UserPen } from 'lucide-react';
import Swal from 'sweetalert2';
import apiService from '../../services/ApiService';

export default function UpdateRoleUser({ user, setUser }) {
  const [isTaillorClicked, setIsTaillorClicked] = useState(false);
  const [isSellerClicked, setIsSellerClicked] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const handleTailorClick = () => {
    setIsTaillorClicked(true);
    setIsSellerClicked(false);
  };

  const handleSellerClick = () => {
    setIsSellerClicked(true);
    setIsTaillorClicked(false);
  };

  const becomeSeller = async () => {
    const role = { role: 'SELLER', token: user.token };
    updateProfile(role);
  };

  const becomeTailor = async () => {
    const role = { role: 'TAILOR', token: user.token };
    updateProfile(role);
  };

  async function updateProfile(role) {
    try {
      const response = await apiService.request('PUT', 'users/update-profile', role, user.token);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Le rôle a été mis à jour avec succès!',
          timer: 3000,
        });
        const updatedUser = response.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsProfileUpdated(true);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Erreur lors de la mise à jour du rôle',
      });
    }
  }

  return (
    <>
      {!isProfileUpdated && (
        <div className="bg-white shadow-lg rounded-xl border-2 border-gray-200 p-8 mb-6 max-w-lg mx-auto transition-transform hover:scale-105 transform-gpu">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-4 text-center flex items-center justify-center">
            <div className="bg-pink-600 p-3 rounded-full mr-4">
              <UserPen className="text-white w-6 h-6" />
            </div>
            Mettre à jour votre profil
          </h2>
          <div className="flex justify-around items-center mb-6">
            <button
              className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleTailorClick}
            >
              <Scissors className="w-5 h-5 mr-2" /> Devenir Tailleur
            </button>
            <button
              className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleSellerClick}
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> Devenir Vendeur
            </button>
          </div>

          {isTaillorClicked && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <p className="text-gray-600">
                En tant que tailleur, vous pourrez ajouter des modèles de couture sur le fil d'actualité pour que les visiteurs puissent les voir, les partager, et les acheter.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                NB : Ce rôle est définitif. Vous ne pourrez pas devenir vendeur avec ce compte, mais vous pouvez créer un autre compte pour ce rôle.
              </p>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
                  onClick={() => setIsTaillorClicked(false)}
                >
                  Annuler
                </button>
                <button
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all"
                  onClick={becomeTailor}
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}

          {isSellerClicked && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <p className="text-gray-600">
                En tant que vendeur, vous pourrez vendre des tissus, des fils, et d'autres accessoires nécessaires pour la couture.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                NB : Ce rôle est définitif. Vous ne pourrez pas devenir tailleur avec ce compte, mais vous pouvez créer un autre compte pour ce rôle.
              </p>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all"
                  onClick={() => setIsSellerClicked(false)}
                >
                  Annuler
                </button>
                <button
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-all"
                  onClick={becomeSeller}
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
