import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchCurrentStandings} from './utilities';
import {fetchLastFiveRaceResults} from './utilities'

async function testFetchCurrentStandings() {
  const results = await fetchCurrentStandings();
  return results;
};

async function testFetchLastFiveRaceResults() {
  const results = await fetchLastFiveRaceResults();
  return results;
};

export default function App() {
  const [names, setNames] = useState([]);
  const [lastFiveRaceResults, setLastFiveRaceResults] = useState([]);

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);
    
  useEffect(() => {
    testFetchLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)); 
  }, []);

  const fiveRacesAgo = lastFiveRaceResults[4];
  const fourRacesAgo = lastFiveRaceResults[3];
  const threeRacesAgo = lastFiveRaceResults[2];
  const twoRacesAgo = lastFiveRaceResults[1];
  const oneRaceAgo = lastFiveRaceResults[0];

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  }
  

  const racerData = names.map(driver => formatRow(driver, null, null, null, null, null)); 
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

