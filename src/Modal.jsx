import React from 'react';
import Modal from 'react-modal';

const AboutModal = ({ isOpen, onClose, content }) => {
  const customStyles = {
    content: {
      backgroundColor: '#17181a', // Set your desired background color
      fontFamily: "Roboto",
      maxWidth: '1000px', // Adjust as needed
      margin: 'auto',
      padding: '20px',
      border: '2px solid #87C75F',
      borderRadius: '8px',
    },
    overlay: {
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="About Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <div>
        {content}
        <button onClick={onClose}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default AboutModal;