import React, { useState } from 'react';
import './ThankYouModal.css';

const ThankYouModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="modal-container">
      <button onClick={openModal} className="purchase-button">
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