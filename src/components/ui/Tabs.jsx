import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Pour valider les props (optionnel)

// Composant Tabs principal
const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        // Vérification si l'enfant est un `TabsList` et passer les props nécessaires
        if (child.type.displayName === 'TabsList') {
          return React.cloneElement(child, { activeTab, handleTabClick });
        }
        // Afficher seulement le contenu de l'onglet actif
        if (child.type.displayName === 'TabsContent' && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

Tabs.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Composant pour l'affichage des onglets (boutons)
const TabsList = ({ children, activeTab, handleTabClick }) => {
  return (
    <div className="tabs-list">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          isActive: child.props.value === activeTab,
          onClick: () => handleTabClick(child.props.value),
        });
      })}
    </div>
  );
};

TabsList.propTypes = {
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

// Composant pour chaque onglet (trigger)
const TabsTrigger = ({ value, isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`tabs-trigger ${isActive ? 'active' : ''}`}
    >
      {children}
    </button>
  );
};

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// Composant pour le contenu de chaque onglet
const TabsContent = ({ value, children }) => {
  return (
    <div className="tabs-content">
      {children}
    </div>
  );
};

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Ajout des `displayName` pour la compatibilité avec `React.Children.map`
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
