import React from 'react';
import PropTypes from 'prop-types'; // Pour la validation des props

// Composant principal Card
const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Composant pour le contenu de la carte
const CardContent = ({ children, className }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

// Composant CardTitle 
const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Composant pour l'en-tête de la carte
const CardHeader = ({ title, className, children }) => {
  return (
    <div className={`card-header ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

// Ajout des `displayName` pour la compatibilité avec `React.Children.map`
Card.displayName = 'Card';
CardContent.displayName = 'CardContent';
CardHeader.displayName = 'CardHeader';

export { Card, CardContent, CardHeader, CardTitle };
