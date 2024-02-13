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
    { teamName: 'Red Bull Racing', chassis: 'RB20', powerUnit: 'Honda RBPT', driverNumbers: ['1', '11'], driverNames: ['Max Verstappen', 'Sergio Pérez'] },
    { teamName: 'Mercedes-AMG F1 Team', chassis: 'F1 W15', powerUnit: 'Mercedes', driverNumbers: ['44', '63'], driverNames: ['Lewis Hamilton', 'George Russell'] },
    { teamName: 'Scuderia Ferrari', chassis: 'SF-24', powerUnit: 'Ferrari', driverNumbers: ['16', '55'], driverNames: ['Charles Leclerc', 'Carlos Sainz'] },
    { teamName: 'McLaren F1 Team', chassis: 'MCL38', powerUnit: 'Mercedes', driverNumbers: ['4', '81'], driverNames: ['Lando Norris', 'Oscar Piastri'] },
    { teamName: 'Aston Martin F1 Team', chassis: 'AMR24', powerUnit: 'Mercedes', driverNumbers: ['14', '18'], driverNames: ['Fernando Alonso', 'Lance Stroll'] },
    { teamName: 'Alpine F1 Team', chassis: 'A524', powerUnit: 'Renault', driverNumbers: ['10', '31'], driverNames: ['Pierre Gasly', 'Esteban Ocon'] },
    { teamName: 'Williams Racing', chassis: 'FW46', powerUnit: 'Mercedes', driverNumbers: ['2', '23'], driverNames: ['Logan Sargeant', 'Alexander Albon'] },
    { teamName: 'RB F1 Team', chassis: 'VCARB 01', powerUnit: 'Honda RBPT', driverNumbers: ['3', '22'], driverNames: ['Daniel Ricciardo', 'Yuki Tsunoda'] },
    { teamName: 'Stake F1 Team Kick Sauber', chassis: 'C44', powerUnit: 'Ferrari', driverNumbers: ['24', '77'], driverNames: ['Guanyu Zhou', 'Valterri Bottas'] },
    { teamName: 'Haas F1 Team', chassis: 'VF-24', powerUnit: 'Ferrari', driverNumbers: ['20', '27'], driverNames: ['Kevin Magnussen', ' Nico Hülkenberg'] },
    // Add more entries as needed
  ];

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell>Chassis</TableCell>
            <TableCell>Power Unit</TableCell>
            <TableCell colSpan={2}>Drivers
              <TableCell>#</TableCell>
              <TableCell>Driver name</TableCell>
            </TableCell>
            {/* Add more header cells as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {entriesData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.teamName}</TableCell>
              <TableCell>{entry.chassis}</TableCell>
              <TableCell>{entry.powerUnit}</TableCell>
              <TableCell>{entry.driverNumbers[0]}<br/>{entry.driverNumbers[1]}</TableCell>
              <TableCell>{entry.driverNames[0]}<br/>{entry.driverNames[1]}</TableCell>
              {/* Add more cells based on your data structure */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DriversTable;