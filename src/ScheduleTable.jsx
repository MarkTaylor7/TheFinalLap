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
    { eventName: 'Bahrain Grand Prix', date: isSmallScreen ? 'MAR 2' : 'March 2', eventFlag: `https://flagsapi.com/BH/flat/${flagSize}.png`, roundNumber: 1, eventCircuit: 'Sakhir', bgColor: '#ffffff1c', puColor: '#0990ff' },
    { eventName: 'Saudi Arabian Grand Prix', date: isSmallScreen ? 'MAR 9' : 'March 9',  eventFlag: `https://flagsapi.com/SA/flat/${flagSize}.png`, roundNumber: 2, eventCircuit: 'Jeddah', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Australian Grand Prix', date: isSmallScreen ? 'MAR 24' : 'March 24',  eventFlag: `https://flagsapi.com/AU/flat/${flagSize}.png`, roundNumber: 3, eventCircuit: 'Albert Park', bgColor: '#ffffff1c', puColor: '#FF614D' },
    { eventName: 'Japanese Grand Prix', date: isSmallScreen ? 'APR 7' : 'April 7',  eventFlag: `https://flagsapi.com/JP/flat/${flagSize}.png`, roundNumber: 4, eventCircuit: 'Suzuka', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Chinese Grand Prix*', date: isSmallScreen ? 'APR 21' : 'April 21',  eventFlag: `https://flagsapi.com/CN/flat/${flagSize}.png`, roundNumber: 5, eventCircuit: 'Shanghai', bgColor: '#ffffff1c', puColor: '#6CD3BF' },
    { eventName: 'Miami Grand Prix*', date: isSmallScreen ? 'MAY 5' : 'May 5', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 6, eventCircuit: 'Miami', color: '#000000', puColor: 'yellow' },
    { eventName: 'Emilia Romagna Grand Prix', date: isSmallScreen ? 'MAY 9' : 'May 19', eventFlag: `https://flagsapi.com/IT/flat/${flagSize}.png`, roundNumber: 7, eventCircuit: 'Imola', bgColor: '#ffffff1c', color: '#000000', puColor: '#6CD3BF' },
    { eventName: 'Monaco Grand Prix', date: isSmallScreen ? 'MAY 26' : 'May 26', eventFlag: `https://flagsapi.com/MC/flat/${flagSize}.png`, roundNumber: 8, eventCircuit: 'Monaco', puColor: '#0990ff' },
    { eventName: 'Canadian Grand Prix', date: isSmallScreen ? 'JUN 9' : 'June 9', eventFlag: `https://flagsapi.com/CA/flat/${flagSize}.png`, roundNumber: 9, eventCircuit: 'Montreal', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Spanish Grand Prix', date: isSmallScreen ? 'JUN 23' : 'June 23', eventFlag: `https://flagsapi.com/ES/flat/${flagSize}.png`, roundNumber: 10, eventCircuit: 'Barcelona', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Austrian Grand Prix*', date: isSmallScreen ? 'JUN 30' : 'June 30', eventFlag: `https://flagsapi.com/AT/flat/${flagSize}.png`, roundNumber: 11, eventCircuit: 'Red Bull Ring', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'British Grand Prix', date: isSmallScreen ? 'JUL 7' : 'July 7', eventFlag: `https://flagsapi.com/GB/flat/${flagSize}.png`, roundNumber: 12, eventCircuit: 'Silverstone', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Hungarian Grand Prix', date: isSmallScreen ? 'JUL 21' : 'July 21', eventFlag: `https://flagsapi.com/HU/flat/${flagSize}.png`, roundNumber: 13, eventCircuit: 'Hungaroring', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Belgian Grand Prix', date: isSmallScreen ? 'JUL 28' : 'July 28', eventFlag: `https://flagsapi.com/BE/flat/${flagSize}.png`, roundNumber: 14, eventCircuit: isSmallScreen ? 'Spa' : 'Spa-Francorchamps', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Dutch Grand Prix', date: isSmallScreen ? 'AUG 25' : 'August 25', eventFlag: `https://flagsapi.com/NL/flat/${flagSize}.png`, roundNumber: 15, eventCircuit: 'Zandvoort', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Italian Grand Prix', date: isSmallScreen ? 'SEP 1' : 'September 1', eventFlag: `https://flagsapi.com/IT/flat/${flagSize}.png`, roundNumber: 16, eventCircuit: 'Monza', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Azerbaijan Grand Prix', date: isSmallScreen ? 'SEP 15' : 'September 15', eventFlag: `https://flagsapi.com/AZ/flat/${flagSize}.png`, roundNumber: 17, eventCircuit: 'Baku', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Singapore Grand Prix', date: isSmallScreen ? 'SEP 22' : 'September 22', eventFlag: `https://flagsapi.com/SG/flat/${flagSize}.png`, roundNumber: 18, eventCircuit: 'Marina Bay', color: '#000000', puColor: '#FF614D' },
    { eventName: 'United States Grand Prix*', date: isSmallScreen ? 'OCT 20' : 'October 20', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 19, eventCircuit: isSmallScreen ? 'COTA' : 'Circuit of the Americas', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Mexico City Grand Prix', date: isSmallScreen ? 'OCT 27' : 'October 27', eventFlag: `https://flagsapi.com/MX/flat/${flagSize}.png`, roundNumber: 20, eventCircuit: 'Mexico City', color: '#000000', puColor: '#FF614D' },
    { eventName: 'São Paulo Grand Prix*', date: isSmallScreen ? 'NOV 3' : 'November 3', eventFlag: `https://flagsapi.com/BR/flat/${flagSize}.png`, roundNumber: 21, eventCircuit: 'Interlagos', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Las Vegas Grand Prix', date: isSmallScreen ? 'NOV 23' : 'November 23', eventFlag: `https://flagsapi.com/US/flat/${flagSize}.png`, roundNumber: 22, eventCircuit: 'Las Vegas', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Qatar Grand Prix*', date: isSmallScreen ? 'DEC 1' : 'December 1', eventFlag: `https://flagsapi.com/QA/flat/${flagSize}.png`, roundNumber: 23, eventCircuit: 'Losail', bgColor: '#ffffff1c', color: '#000000', puColor: '#FF614D' },
    { eventName: 'Abu Dhabi Grand Prix', date: isSmallScreen ? 'DEC 8' : 'December 8', eventFlag: `https://flagsapi.com/AE/flat/${flagSize}.png`, roundNumber: 24, eventCircuit: 'Yas Marina', color: '#000000', puColor: '#FF614D' },
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ padding: isSmallScreen ? '2px' : null, fontSize: isSmallScreen ? '10px' : '16px', width: isSmallScreen ? '10%' : null }}>{isSmallScreen ? 'RD.' : 'ROUND'}</TableCell>
            <TableCell align='center' colSpan={2} style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px'}}>EVENT</TableCell>
            <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px' }}>CIRCUIT</TableCell>
            <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '10px' : '16px', lineHeight: isSmallScreen ? '10px' : '30px' }}>RACE DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          {eventsData.map((event, index) => (
            <TableRow key={index} >
              <TableCell align='center' style={{ padding: isSmallScreen ? '2px' : null, fontSize: isSmallScreen ? '12px' : '16px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: event.bgColor, width: isSmallScreen ? '12%' : null, }}>{event.roundNumber}</TableCell>
              <TableCell align='right' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', borderRight: 'none', backgroundColor: event.bgColor, color: event.color, width: isSmallScreen ? '8%' : null, }}><img src={event.eventFlag}></img></TableCell>
              <TableCell align='left' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', borderLeft: 'none', backgroundColor: event.bgColor, width: isSmallScreen ? '26%' : '26%', lineHeight: isSmallScreen ? '15px' : '30px' }}>{event.eventName}</TableCell>
              <TableCell align={isSmallScreen ? 'left' : 'center'} style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', backgroundColor: event.bgColor, width: isSmallScreen ? '10%' : '28%', paddingRight: 0, borderLeft: 'none', lineHeight: isSmallScreen ? '15px' : '30px' }}>{event.eventCircuit}</TableCell>
              <TableCell align='center' style={{ padding: isSmallScreen ? '5px' : null, fontSize: isSmallScreen ? '9px' : '16px', paddingTop: '5px', paddingBottom: '5px', paddingLeft: 0, backgroundColor: event.bgColor, lineHeight: isSmallScreen ? '10px' : '20px', width: isSmallScreen ? '12%' : '16%', }}>{event.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ScheduleTable;