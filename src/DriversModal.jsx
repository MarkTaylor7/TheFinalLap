import React from 'react';
import Modal from 'react-modal';

import DriversTable from "./DriversTable";

const DriversModal = ({ isOpen, onClose, content }) => {
  const customStyles = {
    content: {
      backgroundColor: '#000000',
      fontFamily: "Roboto",
      width: '70%',
      minHeight: '90%',
      alignContent: 'center',
      padding: '20px',
      border: '2px solid #87C75F',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflowY: 'auto',
      overflowX: 'auto'
    },
    overlay: {
      zIndex: 1000,
    },

    driversModalHeader: {
      fontSize: '48px',
      color: '#87C75F',
      textAlign: 'center',
      marginBottom: '14px'
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: '16px',
      cursor: 'pointer',
      fontSize: '40px',
      color: '#ffffff',
    },
    notesSection: {
      position: 'absolute',
      fontFamily: 'Roboto, Helvetica',
      fontSize: '16px',
      color: '#ffffff',
      marginTop: '20px',
      padding: '16px',
    },
    modalFooter: {
      position: 'absolute',
      fontFamily: 'Roboto, Helvetica',
      fontSize: '14px',
      color: '#87C75F',
      bottom: '3%',
      right: '16px',
      cursor: 'pointer',
      marginTop: '10%'
    }
  };

  const smallScreenStyles = {
    content: {
      backgroundColor: '#000000',
      fontFamily: 'Roboto, Helvetica',
      width: '85%',
      minHeight: '90%',
      margin: 'auto',
      alignContent: 'center',
      padding: '15px',
      border: '2px solid #87C75F',
      position: 'absolute',
      top: '97.5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflowY: 'auto',
    },

    driversModalHeader: {
      fontSize: '30px',
      color: '#87C75F',
      textAlign: 'center',
      marginBottom: '14px'
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: '10px',
      cursor: 'pointer',
      fontSize: '30px',
      color: '#ffffff',
    },
    notesSection: {
      fontFamily: 'Roboto, Helvetica',
      fontSize: '10px',
      color: '#ffffff',
      marginTop: '20px',
    },
    modalFooter: {
      position: 'absolute',
      fontFamily: 'Roboto, Helvetica',
      fontSize: '10px',
      color: '#87C75F',
      bottom: '2%',
      right: '10px',
      cursor: 'pointer',
      marginTop: '10%'
    }

  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Drivers Modal"
      ariaHideApp={false}
      style={window.innerWidth <= 600 ? { ...customStyles, ...smallScreenStyles } : customStyles}
    >
      <div style={window.innerWidth <= 600 ? { ...customStyles.driversModalHeader, ...smallScreenStyles.driversModalHeader } : customStyles.driversModalHeader}>
        The Grid
      </div>
      <div className="driversTable">
        <DriversTable/>
       <div
          style={window.innerWidth <= 600 ? { ...customStyles.closeButton, ...smallScreenStyles.closeButton } : customStyles.closeButton}
          onClick={onClose}
        >
          &times;
        </div> 
      </div>
      <div style={window.innerWidth <= 600 ? { ...customStyles.notesSection, ...smallScreenStyles.notesSection } : customStyles.notesSection}>
        <li>Teams are listed in order of finishing position in the 2023 season. Max Verstappen and Red Bull Racing have won the last three driver's and constructor's championships.</li><br/>
        <li>This is the first season in F1 history that every team's driver line-up is unchanged from the end of the previous season.</li><br/>
        <li>
          In F1, each car is numbered. Since 2014, drivers have been allowed to choose their number, and they use it for the rest of their career.
          The number 1 is reserved for the World Drivers Champion. Should Max Verstappen fail to defend his title, he will return to his original number 33 next season.
        </li><br/>
        <li>Power units are comprised of an 6-cylinder internal combustion engine and electric motors powered by an Energy Recovery System (ERS).</li><br/>
        <li>
          There are four power unit manufacturers in F1: Ferrari, Mercedes, and Alpine (Renault) produce their own units, and Red Bull does so in collaboration
          with Honda. All of the other "customer" teams purchase their units from one of the manufacturers. The exception is RB F1 Team, who are owned by Red Bull.
        </li><br/><br/>
        <div style={window.innerWidth <= 600 ? { ...customStyles.modalFooter, ...smallScreenStyles.modalFooter } : customStyles.modalFooter}
          onClick={onClose}>
          (Close)
        </div>
      </div>
      
    </Modal>
  );
};

export default DriversModal;