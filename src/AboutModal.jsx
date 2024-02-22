import React from 'react';
import Modal from 'react-modal';

const AboutModal = ({ isOpen, onClose, content }) => {
  const customStyles = {
    content: {
      backgroundColor: '#17181a',
      fontFamily: "Roboto",
      width: '90%',
      height: '90%',
      margin: 'auto',
      alignContent: 'center',
      padding: '20px',
      border: '2px solid #87C75F',
      borderRadius: '8px',
      position: 'absolute',
      top: '90%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflowY: 'auto',
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

  const smallScreenStyles = {
    content: {
      backgroundColor: '#17181a',
      left: '5%',
      width: '80%',
      border: '2px solid #87C75F',
      borderRadius: '6px',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="About Modal"
      ariaHideApp={false}
      style={window.innerWidth <= 600 ? { ...customStyles, ...smallScreenStyles } : customStyles}
    >
      <div className="aboutTable">
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