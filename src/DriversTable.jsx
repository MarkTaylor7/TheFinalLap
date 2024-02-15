import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const DriversTable = () => {
  // Sample data structure (replace with your actual data)
  const entriesData = [
    { teamName: 'Red Bull Racing', chassis: 'RB20', powerUnit: 'Honda RBPT', teamFlag: "https://flagsapi.com/AT/flat/24.png", driverNumbers: ['1', '11'], driverNames: ['Max Verstappen', 'Sergio Pérez'], driverFlags: ["https://flagsapi.com/NL/flat/24.png", "https://flagsapi.com/MX/flat/24.png"], bgColor: '#0d202f', puColor: '#0990ff' },
    { teamName: 'Mercedes-AMG F1 Team', chassis: 'F1 W15', powerUnit: 'Mercedes', teamFlag: "https://flagsapi.com/DE/flat/24.png", driverNumbers: ['44', '63'], driverNames: ['Lewis Hamilton', 'George Russell'], driverFlags: ["https://flagsapi.com/GB/flat/24.png", "https://flagsapi.com/GB/flat/24.png"], bgColor: '#6CD3BF', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'Scuderia Ferrari', chassis: 'SF-24', powerUnit: 'Ferrari', teamFlag: "https://flagsapi.com/IT/flat/24.png", driverNumbers: ['16', '55'], driverNames: ['Charles Leclerc', 'Carlos Sainz'], driverFlags: ["https://flagsapi.com/MC/flat/24.png", "https://flagsapi.com/ES/flat/24.png"], bgColor: '#F91536', puColor: '#FF614D' },
    { teamName: 'McLaren F1 Team', chassis: 'MCL38', powerUnit: 'Mercedes', teamFlag: "https://flagsapi.com/GB/flat/24.png", driverNumbers: ['4', '81'], driverNames: ['Lando Norris', 'Oscar Piastri'], driverFlags: ["https://flagsapi.com/GB/flat/24.png", "https://flagsapi.com/AU/flat/24.png"], bgColor: '#F58020', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'Aston Martin F1 Team', chassis: 'AMR24', powerUnit: 'Mercedes', teamFlag: "https://flagsapi.com/GB/flat/24.png", driverNumbers: ['14', '18'], driverNames: ['Fernando Alonso', 'Lance Stroll'], driverFlags: ["https://flagsapi.com/ES/flat/24.png", "https://flagsapi.com/CA/flat/24.png"], bgColor: '#358C75', puColor: '#6CD3BF' },
    { teamName: 'Alpine F1 Team', chassis: 'A524', powerUnit: 'Renault', teamFlag: "https://flagsapi.com/FR/flat/24.png", driverNumbers: ['10', '31'], driverNames: ['Pierre Gasly', 'Esteban Ocon'], driverFlags: ["https://flagsapi.com/FR/flat/24.png", "https://flagsapi.com/FR/flat/24.png"], bgColor: '#f5b6c7', color: '#000000', puColor: 'yellow' },
    { teamName: 'Williams Racing', chassis: 'FW46', powerUnit: 'Mercedes', teamFlag: "https://flagsapi.com/GB/flat/24.png", driverNumbers: ['2', '23'], driverNames: ['Logan Sargeant', 'Alexander Albon'], driverFlags: ["https://flagsapi.com/US/flat/24.png", "https://flagsapi.com/TH/flat/24.png"], bgColor: '#37BEDD', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'RB F1 Team', chassis: 'VCARB 01', powerUnit: 'Honda RBPT', teamFlag: "https://flagsapi.com/IT/flat/24.png", driverNumbers: ['3', '22'], driverNames: ['Daniel Ricciardo', 'Yuki Tsunoda'], driverFlags: ["https://flagsapi.com/AU/flat/24.png", "https://flagsapi.com/JP/flat/24.png"], bgColor: '#1533cc', puColor: '#0990ff' },
    { teamName: 'Stake F1 Team Kick Sauber', chassis: 'C44', powerUnit: 'Ferrari', teamFlag: "https://flagsapi.com/CH/flat/24.png", driverNumbers: ['24', '77'], driverNames: ['Guanyu Zhou', 'Valterri Bottas'], driverFlags: ["https://flagsapi.com/CN/flat/24.png", "https://flagsapi.com/FI/flat/24.png"], bgColor: '#53fc18', color: '#000000', puColor: '#FF614D' },
    { teamName: 'Haas F1 Team', chassis: 'VF-24', powerUnit: 'Ferrari', teamFlag: "https://flagsapi.com/US/flat/24.png", driverNumbers: ['20', '27'], driverNames: ['Kevin Magnussen', ' Nico Hülkenberg'], driverFlags: ["https://flagsapi.com/DK/flat/24.png", "https://flagsapi.com/DE/flat/24.png"], bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    // Add more entries as needed
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={2} style={{ fontFamily: 'Bai Jamjuree, Helvetica' }}>TEAM</TableCell>
            <TableCell align='center' colSpan={3}>DRIVERS</TableCell>
            <TableCell align='center'>CHASSIS</TableCell>
            <TableCell align='center'>POWER UNIT</TableCell>
            {/* Add more header cells as needed */}
          </TableRow>
        </TableHead>
        <TableBody style={{ paddingTop: 0, paddingBottom: 0 }}>
          {entriesData.map((entry, index) => (
            <TableRow key={index} >
              <TableCell align='right' style={{ paddingTop: '5px', paddingBottom: '5px', backgroundColor: entry.bgColor, borderRight: 'none' }}><img src={entry.teamFlag} /></TableCell>
              <TableCell align='left' style={{ fontFamily: 'Bai Jamjuree, Helvetica', paddingTop: '5px', paddingBottom: '5px', backgroundColor: entry.bgColor, color: entry.color, borderLeft: 'none'}}>{entry.teamName}</TableCell>
              <TableCell align='right' style={{ paddingTop: '5px', paddingBottom: '5px', borderRight: 'none', lineHeight: '30px' }}>{entry.driverNumbers[0]}<br/>{entry.driverNumbers[1]}</TableCell>
              <TableCell align='left' style={{ paddingTop: '5px', paddingBottom: '5px', width: '18%', paddingRight: 0, borderLeft: 'none', borderRight: 'none', lineHeight: '30px' }}>{entry.driverNames[0]}<br/>{entry.driverNames[1]}</TableCell>
              <TableCell align='left' style={{ paddingTop: '5px', paddingBottom: '5px', paddingLeft: 0, borderLeft: 'none', lineHeight: '20px' }}><img src={entry.driverFlags[0]} /> <br/> <img src={entry.driverFlags[1]} /></TableCell>
              <TableCell align='center' style={{ paddingTop: '5px', paddingBottom: '5px' }}>{entry.chassis}</TableCell>
              <TableCell align='center' style={{ paddingTop: '5px', paddingBottom: '5px', color: entry.puColor }}>{entry.powerUnit}</TableCell>
              
              {/* Add more cells based on your data structure */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DriversTable;