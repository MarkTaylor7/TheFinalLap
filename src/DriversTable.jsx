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
    { teamName: 'Red Bull Racing', chassis: 'RB20', powerUnit: 'Honda RBPT', driverNumbers: ['1', '11'], driverNames: ['Max Verstappen', 'Sergio Pérez'], bgColor: '#0d202f', puColor: '#0990ff' },
    { teamName: 'Mercedes-AMG F1 Team', chassis: 'F1 W15', powerUnit: 'Mercedes', driverNumbers: ['44', '63'], driverNames: ['Lewis Hamilton', 'George Russell'], bgColor: '#6CD3BF', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'Scuderia Ferrari', chassis: 'SF-24', powerUnit: 'Ferrari', driverNumbers: ['16', '55'], driverNames: ['Charles Leclerc', 'Carlos Sainz'], bgColor: '#F91536', puColor: '#FF614D' },
    { teamName: 'McLaren F1 Team', chassis: 'MCL38', powerUnit: 'Mercedes', driverNumbers: ['4', '81'], driverNames: ['Lando Norris', 'Oscar Piastri'], bgColor: '#F58020', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'Aston Martin F1 Team', chassis: 'AMR24', powerUnit: 'Mercedes', driverNumbers: ['14', '18'], driverNames: ['Fernando Alonso', 'Lance Stroll'], bgColor: '#358C75', puColor: '#6CD3BF' },
    { teamName: 'Alpine F1 Team', chassis: 'A524', powerUnit: 'Renault', driverNumbers: ['10', '31'], driverNames: ['Pierre Gasly', 'Esteban Ocon'], bgColor: '#f5b6c7', color: '#000000', puColor: 'yellow' },
    { teamName: 'Williams Racing', chassis: 'FW46', powerUnit: 'Mercedes', driverNumbers: ['2', '23'], driverNames: ['Logan Sargeant', 'Alexander Albon'], bgColor: '#37BEDD', color: '#000000', puColor: '#6CD3BF' },
    { teamName: 'RB F1 Team', chassis: 'VCARB 01', powerUnit: 'Honda RBPT', driverNumbers: ['3', '22'], driverNames: ['Daniel Ricciardo', 'Yuki Tsunoda'], bgColor: '#1533cc', puColor: '#0990ff' },
    { teamName: 'Stake F1 Team Kick Sauber', chassis: 'C44', powerUnit: 'Ferrari', driverNumbers: ['24', '77'], driverNames: ['Guanyu Zhou', 'Valterri Bottas'], bgColor: '#53fc18', color: '#000000', puColor: '#FF614D' },
    { teamName: 'Haas F1 Team', chassis: 'VF-24', powerUnit: 'Ferrari', driverNumbers: ['20', '27'], driverNames: ['Kevin Magnussen', ' Nico Hülkenberg'], bgColor: '#B6BABD', color: '#000000', puColor: '#FF614D' },
    // Add more entries as needed
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell colSpan={2}>Drivers</TableCell>
            <TableCell>Chassis</TableCell>
            <TableCell>Power Unit</TableCell>
            {/* Add more header cells as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell style={{ backgroundColor: entry.bgColor, color: entry.color }}>{entry.teamName}</TableCell>
              <TableCell style={{ backgroundColor: entry.bgColor, color: entry.color }}>{entry.driverNumbers[0]}<br/>{entry.driverNumbers[1]}</TableCell>
              <TableCell style={{ backgroundColor: entry.bgColor, color: entry.color }}>{entry.driverNames[0]}<br/>{entry.driverNames[1]}</TableCell>
              <TableCell>{entry.chassis}</TableCell>
              <TableCell style={{ color: entry.puColor }}>{entry.powerUnit}</TableCell>
              
              {/* Add more cells based on your data structure */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DriversTable;