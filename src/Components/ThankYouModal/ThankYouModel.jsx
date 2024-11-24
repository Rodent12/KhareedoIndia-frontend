import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './ThankYouModal.css';

const ThankYouModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate();
  const redir = () => {navigate('/login')}
  const token = localStorage.getItem('auth-token');
  let isLoggedIn = 0;
  if(token){
    isLoggedIn = 1;
  }

  

  return (
    <div className="modal-container">
      <button onClick={isLoggedIn ? openModal : redir} className="purchase-button">
        Complete Purchase
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p className="modal-message">Thanks for shopping with us! 🎉</p>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThankYouModal;