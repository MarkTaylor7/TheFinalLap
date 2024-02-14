import React from 'react';
import Modal from 'react-modal';

import DriversTable from "./DriversTable";

const DriversModal = ({ isOpen, onClose, content }) => {
  const customStyles = {
    content: {
      backgroundColor: '#000000', // Set your desired background color
      fontFamily: "Roboto",
      width: '70%', // Adjust as needed
      height: '100%',
      margin: 'auto',
      alignContent: 'center',
      padding: '20px',
      border: '2px solid #87C75F',
      
      position: 'absolute',
      top: '95%',
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
      width: '80%', // Adjust for smaller screens
      border: '2px solid #87C75F',
      borderRadius: '6px',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Drivers Modal"
      ariaHideApp={false}
      style={window.innerWidth <= 600 ? { ...customStyles, ...smallScreenStyles } : customStyles}
    >
      <div className="driversTable">
        <DriversTable/>
       <div
          style={customStyles.closeButton}
          onClick={onClose}
        >
          &times;
        </div> 
        
        
      </div>
    </Modal>
  );
};

export default DriversModal;