import * as React from 'react';
import DenseTable from './DenseTable';
import DriverList from './DriverList';


function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
  return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
}

const racerData = [
  formatRow('Max Verstappen', 1, 1, 1, 1, 1),
  formatRow('Sergio Perez', 6, 3, 2, 4, 2),
  formatRow('Fernando Alonso', 7, 9, 5, 2, 9),
  formatRow('Lewis Hamilton', 3, 4, 4, 6, 6),
  formatRow('Carlos Sainz', 10, 8, 'DNF', 5, 3),
  formatRow('Charles Leclerc', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 7', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 8', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 9', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 10', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 11', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 12', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 13', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 14', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 15', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 16', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 17', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 18', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 19', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 20', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 21', 9, 7, 3, 'DNF', 4),
  formatRow('Driver 22', 9, 7, 3, 'DNF', 4),
];

export default function App() {
  return (
    <>
    
    <DenseTable data={racerData} />
    <DriverList />
    
    </>
  )
}