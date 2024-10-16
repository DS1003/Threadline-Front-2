import React, { useState } from 'react';
import { Scissors, ShoppingCart, UserPen } from 'lucide-react'; // Importer l'icône de Lucide
import Swal from 'sweetalert2'; // Toujours utiliser SweetAlert pour les alertes
import apiService from '../../services/ApiService';
// Par exemple, si ApiService est dans un dossier services à la racine.


export default function UpdateRoleUser({ user, setUser }) {

  const [isTaillorClicked, setIsTaillorClicked] = useState(false);
  const [isSellerClicked, setIsSellerClicked] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const handleTailorClick = () => {
    setIsTaillorClicked(true);
    setIsSellerClicked(false);
  }

  const handleSellerClick = () => {
    setIsSellerClicked(true);
    setIsTaillorClicked(false);
  }

  const becomeSeller = async () => {
    const role = { role: 'SELLER', token: user.token }
    updateProfile(role);
  }

  const becomeTailor = async () => {
    const role = { role: 'TAILOR', token: user.token }
    updateProfile(role);
  }

  async function updateProfile(role) {
    try {
      const response = await apiService.request('PUT', 'users/update-profile', role, user.token);
      console.log(response);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Le rôle a été mis à jour avec succès!',
          timer: 3000, // Fermer après 3 secondes
        });
        const updatedUser = response.data;
        console.log(updatedUser);
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
      console.error('Erreur:', error);
    }
  }

  return (
    <>
      {!isProfileUpdated &&
        (
          <div className="bg-gradient-to-br font-bold from-white to-[#FFF5F4] rounded-xl border-2  shadow-lg p-8 mb-6 max-w-md mx-auto">
            <h2 className="text-[20px] mb-6 text-[#4A4A4A] border-b-2 border-[#CC8C87] pb-2 text-center flex items-center justify-center">
              <div className="bg-[#CC8C87] p-3 rounded-full mr-4"><UserPen className='text-white w-6 h-6' /></div>
              Mettre à jour votre profile
            </h2>
            <div className='flex justify-between items-center'>
              <button className='flex items-center bg-[#838282] hover:bg-[#949494d2] text-white p-4 rounded-lg' onClick={handleTailorClick}>
                <Scissors /> <span className='pl-2'>Devenir Tailleur</span>
              </button>
              <button className='flex items-center bg-[#838282] hover:bg-[#949494d2] text-white p-4 rounded-lg' onClick={handleSellerClick}>
                <ShoppingCart /> <span className='pl-2'>Devenir Vendeur</span>
              </button>
            </div>
            {
              isTaillorClicked && (
                <div className="mt-4">
                  <p className='text-justify'>Lorsque vous devenez Tailleur, vous pourrez ajouter des modèles de couture sur une file d'actualité. Ces modèles seront vues par des visiteurs qui pourront les acheter, les partager ...</p>
                  <p className='mt-2 text-justify'>NB: Ce rôle ne peut pas être mis à jour et vous ne pourrez plus devenir vendeur. Mais vous avez la possiblité de créer un autre compte pour devenir vendeur</p>
                  <div className='mt-3 flex justify-between items-center'>
                    <button className='bg-black text-white p-4 rounded-lg' onClick={() => setIsTaillorClicked(false)}>Annuler</button>
                    <button className='bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white p-4 rounded-lg' onClick={becomeTailor}>Confirmer</button>
                  </div>
                </div>
              )
            }
            {
              isSellerClicked && (
                <div className="mt-4">
                  <p className='text-justify'>Lorsque vous devenez Vendeur, vous aurez la possibilité de vendre des tissus, des fils, tous les accessoires possibles pour la couture.</p>
                  <p className='mt-2 text-justify'>NB: Ce rôle ne peut pas être mis à jour et vous ne pourrez plus devenir tailleur. Mais vous avez la possiblité de créer un autre compte pour devenir tailleur</p>
                  <div className='mt-3 flex justify-between items-center'>
                    <button className='bg-black text-white p-4 rounded-lg' onClick={() => setIsSellerClicked(false)}>Annuler</button>
                    <button className='bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white p-4 rounded-lg' onClick={becomeSeller}>Confirmer</button>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </>
  );
}
