import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'; // Importer l'icône de Lucide
import Swal from 'sweetalert2'; // Toujours utiliser SweetAlert pour les alertes
import apiService from '../../services/ApiService';
// Par exemple, si ApiService est dans un dossier services à la racine.


export default function UpdateRoleUser({ onRoleUpdate }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");

  const handleUpdateRole = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérer le token
      console.log(token);
      const response = await apiService.request('PUT', 'users/update-profile', { role }, token);
console.log(response);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Le rôle a été mis à jour avec succès!',
          timer: 3000, // Fermer après 3 secondes
        });
        setOpen(false);
        if (onRoleUpdate) onRoleUpdate(role);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Erreur lors de la mise à jour du rôle',
      });
      console.error('Erreur:', error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="mt-4 w-full bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white flex items-center justify-center"
      >
        <CheckCircle className="mr-2" /> Mettre à jour le rôle
      </button>

      {open && (
        <div className="mt-4 border p-4">
          <h3>Choisir un nouveau rôle</h3>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 p-2 border"
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="SELLER">SELLER</option>
            <option value="TAILOR">TAILOR</option>
          </select>
          <button 
            onClick={handleUpdateRole} 
            className="mt-4 w-full bg-[#CC8C87] hover:bg-[#cc8c87d2] text-white"
          >
            Confirmer
          </button>
        
        </div>
      )}
    
    </>
  );
}
