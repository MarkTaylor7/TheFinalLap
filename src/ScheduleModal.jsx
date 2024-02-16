import React from 'react';
import Modal from 'react-modal';

import ScheduleTable from "./ScheduleTable";

const ScheduleModal = ({ isOpen, onClose, content }) => {
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

    scheduleModalHeader: {
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

    scheduleModalHeader: {
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
      contentLabel="Schedule Modal"
      ariaHideApp={false}
      style={window.innerWidth <= 600 ? { ...customStyles, ...smallScreenStyles } : customStyles}
    >
      <div style={window.innerWidth <= 600 ? { ...customStyles.scheduleModalHeader, ...smallScreenStyles.scheduleModalHeader } : customStyles.scheduleModalHeader}>
        Schedule - 2024 F1 Season
      </div>
      <div className="scheduleTable">
        <ScheduleTable/>
       <div
          style={window.innerWidth <= 600 ? { ...customStyles.closeButton, ...smallScreenStyles.closeButton } : customStyles.closeButton}
          onClick={onClose}
        >
          &times;
        </div> 
      </div>
      <div style={window.innerWidth <= 600 ? { ...customStyles.notesSection, ...smallScreenStyles.notesSection } : customStyles.notesSection}>
        <li>
          * indicates that there will be a sprint race the day before the Grand Prix. Sprints are about 1/3rd the length of a Grand Prix, requiring drivers to complete 100 km.
            Points are awarded to the top 8 finishers. On sprint weekends, qualifying for the Grand Prix is held on Friday instead of Saturday.
        </li><br/>
        <li>At 24 races, this will be the longest season in F1 history.</li><br/>
        <div style={window.innerWidth <= 600 ? { ...customStyles.modalFooter, ...smallScreenStyles.modalFooter } : customStyles.modalFooter}
          onClick={onClose}>
          (Close)
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleModal;