import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchAllDriverNames} from './utilities';
import {getDriverData} from './utilities';

getDriverData('hamilton');

async function testFetchAllDriverNames() {
  const results = await fetchAllDriverNames();
  return results;
};

export default function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    testFetchAllDriverNames()
    .then(results => setNames(results)); 
  }, []);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  }
  
  const racerData = [
    formatRow(names[0], null, null, null, null, null),
    formatRow(names[1], null, null, null, null, null),
    formatRow(names[2], null, null, null, null, null),
    formatRow(names[3], null, null, null, null, null),
    formatRow(names[4], null, null, null, null, null),
    formatRow(names[5], null, null, null, null, null),
    formatRow(names[6], null, null, null, null, null),
    formatRow(names[7], null, null, null, null, null),
    formatRow(names[8], null, null, null, null, null),
    formatRow(names[9], null, null, null, null, null),
    formatRow(names[10], null, null, null, null, null),
    formatRow(names[11], null, null, null, null, null),
    formatRow(names[12], null, null, null, null, null),
    formatRow(names[13], null, null, null, null, null),
    formatRow(names[14], null, null, null, null, null),
    formatRow(names[15], null, null, null, null, null),
    formatRow(names[16], null, null, null, null, null),
    formatRow(names[17], null, null, null, null, null),
    formatRow(names[18], null, null, null, null, null),
    formatRow(names[19], null, null, null, null, null),
    formatRow(names[20], null, null, null, null, null),
    formatRow(names[21], null, null, null, null, null),
  ];

  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

