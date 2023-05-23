import React from 'react';
import './Loader.css'; 

export const Loader = () => {
  return (
    <div className="loader-container">
      <iframe src="https://giphy.com/embed/z8OcWLLk4SrpS" width="480" height="480"  className="giphy-embed" allowFullScreen></iframe>
      <div className="loading-text">CARGANDO</div>
    </div>
  );
};

