import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';


export const ScheduleTable = () => {

  const isSmallScreen = useMediaQuery('(max-width:480px)');

  const flagSize = isSmallScreen ? 16 : 24;

  const eventsData = [
    { eventName: 'Bahrain Grand Prix', date: 'March 2', eventFlag: `https://flagsapi.com/BH/flat/${flagSize}.png`, roundNumber: 1, eventCircuit: 'Sakhir', bgColor: '#0d202f', puColor: '#0990ff' },
    { eventName: 'Saudi Arabian Grand Prix', date: 'March 9',  eventFlag: `https://flagsapi.com/SA/flat/${flagSize}.png`, roundNumber: 2, eventCircuit: 'Jeddah', bgColor: '#6CD3BF', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Australian Grand Prix', date: 'March 24',  eventFlag: `https://flagsapi.com/AU/flat/${flagSize}.png`, roundNumber: 3, eventCircuit: 'Albert Park', bgColor: '#F91536', puColor: '#FF614D' },
    { eventName: 'Japanese Grand Prix', date: 'April 7',  eventFlag: `https://flagsapi.com/JP/flat/${flagSize}.png`, roundNumber: 4, eventCircuit: 'Suzuka', bgColor: '#F58020', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Chinese Grand Prix*', date: 'April 21',  eventFlag: `https://flagsapi.com/CN/flat/${flagSize}.png`, roundNumber: 5, eventCircuit: 'Shanghai', bgColor: '#358C75', puColor: '#6CD3BF' },
    { eventName: 'Miami Grand Prix*', date: 'May 5', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 6, eventCircuit: 'Miami', bgColor: '#f5b6c7', color: '#000000', puColor: 'yellow' },
    { eventName: 'Emilia Romagna Grand Prix', date: 'May 19', eventFlag: `https://flagsapi.com/IT/flat/${flagSize}.png`, roundNumber: 7, eventCircuit: 'Imola', bgColor: '#37BEDD', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Monaco Grand Prix', date: 'May 26', eventFlag: `https://flagsapi.com/MC/flat/${flagSize}.png`, roundNumber: 8, eventCircuit: 'Monaco', bgColor: '#1533cc', puColor: '#0990ff' },
    { eventName: 'Canadian Grand Prix', date: 'June 9', eventFlag: `https://flagsapi.com/CA/flat/${flagSize}.png`, roundNumber: 9, eventCircuit: 'Montreal', bgColor: '#53fc18', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Spanish Grand Prix', date: 'June 23', eventFlag: `https://flagsapi.com/ES/flat/${flagSize}.png`, roundNumber: 10, eventCircuit: 'Barcelona', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Austrian Grand Prix*', date: 'June 30', eventFlag: `https://flagsapi.com/AT/flat/${flagSize}.png`, roundNumber: 11, eventCircuit: 'Red Bull Ring', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'British Grand Prix', date: 'July 7', eventFlag: `https://flagsapi.com/GB/flat/${flagSize}.png`, roundNumber: 12, eventCircuit: 'Silverstone', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Hungarian Grand Prix', date: 'July 21', eventFlag: `https://flagsapi.com/HU/flat/${flagSize}.png`, roundNumber: 13, eventCircuit: 'Hungaroring', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Belgian Grand Prix', date: 'July 28', eventFlag: `https://flagsapi.com/BE/flat/${flagSize}.png`, roundNumber: 14, eventCircuit: 'Spa-Francorchamps', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Dutch Grand Prix', date: 'August 25', eventFlag: `https://flagsapi.com/NL/flat/${flagSize}.png`, roundNumber: 15, eventCircuit: 'Zandvoort', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Italian Grand Prix', date: 'September 1', eventFlag: `https://flagsapi.com/IT/flat/${flagSize}.png`, roundNumber: 16, eventCircuit: 'Monza', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Azerbaijan Grand Prix', date: 'September 15', eventFlag: `https://flagsapi.com/AZ/flat/${flagSize}.png`, roundNumber: 17, eventCircuit: 'Baku', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Singapore Grand Prix', date: 'September 22', eventFlag: `https://flagsapi.com/SG/flat/${flagSize}.png`, roundNumber: 18, eventCircuit: 'Marina Bay', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'United States Grand Prix*', date: 'October 20', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 19, eventCircuit: 'Circuit of the Americas', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Mexico City Grand Prix', date: 'October 27', eventFlag: `https://flagsapi.com/MX/flat/${flagSize}.png`, roundNumber: 20, eventCircuit: 'Mexico City', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'São Paulo Grand Prix*', date: 'November 3', eventFlag: `https://flagsapi.com/BR/flat/${flagSize}.png`, roundNumber: 21, eventCircuit: 'Interlagos', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Las Vegas Grand Prix', date: 'November 23', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 22, eventCircuit: 'Las Vegas', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Qatar Grand Prix*', date: 'December 1', eventFlag: `https://flagsapi.com/QA/flat/${flagSize}.png`, roundNumber: 23, eventCircuit: 'Losail', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Abu Dhabi Grand Prix', date: 'December 8', eventFlag: `https://flagsapi.com/AE/flat/${flagSize}.png`, roundNumber: 24, eventCircuit: 'Yas Marina', bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px', fontFamily: 'Bai Jamjuree, Helvetica' }}>ROUND</TableCell>
            <TableCell align='center' colSpan={2} style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px' }}>EVENT</TableCell>
            <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px' }}>CIRCUIT</TableCell>
            <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px', lineHeight: isSmallScreen ? '10px' : '30px' }}>RACE DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          {eventsData.map((event, index) => (
            <TableRow key={index} >
              <TableCell align='right' style={{ padding: isSmallScreen ? '5px' : null, paddingTop: '5px', paddingBottom: '5px', backgroundColor: event.bgColor, borderRight: 'none' }}>{event.roundNumber}</TableCell>
              <TableCell align='left' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', fontFamily: 'Bai Jamjuree, Helvetica', paddingTop: '5px', paddingBottom: '5px', backgroundColor: event.bgColor, color: event.color, borderLeft: 'none' }}><img src={event.eventFlag}></img></TableCell>
              <TableCell align='right' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', borderRight: 'none', lineHeight: isSmallScreen ? '15px' : '30px' }}>{event.eventName}</TableCell>
              <TableCell align='left' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', width: isSmallScreen ? '26%' : '18%', paddingRight: 0, borderLeft: 'none', borderRight: 'none', lineHeight: isSmallScreen ? '15px' : '30px' }}>{event.eventCircuit}</TableCell>
              <TableCell align='left' style={{ padding: isSmallScreen ? '5px' : null, paddingTop: '5px', paddingBottom: '5px', paddingLeft: 0, borderLeft: 'none', lineHeight: isSmallScreen ? '10px' : '20px' }}>{event.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ScheduleTable;