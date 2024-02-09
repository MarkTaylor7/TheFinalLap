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
      position: 'relative',
    },
    overlay: {
      zIndex: 1000,
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: '16px',
      cursor: 'pointer',
      fontSize: '40px',
      color: '#ffffff',
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
       <div
          style={customStyles.closeButton}
          onClick={onClose}
        >
          &times;
        </div> 
        {content}
        
      </div>
    </Modal>
  );
};

export default AboutModal;