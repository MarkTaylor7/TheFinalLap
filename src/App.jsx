import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchCurrentStandings} from './utilities';
import {fetchLastRaceResults} from './utilities';
import {fetchLastFiveRaceResults} from './utilities'

async function testFetchCurrentStandings() {
  const results = await fetchCurrentStandings();
  return results;
};

async function testFetchLastRaceResults() {
  const results = await fetchLastRaceResults();
  return results;
};

async function testFetchLastFiveRaceResults() {
  const results = await fetchLastFiveRaceResults();
  return results;
};

export default function App() {
  const [names, setNames] = useState([]);
  const [lastRaceResults, setLastRaceResults] = useState([]);
  const [lastFiveRaceResults, setLastFiveRaceResults] = useState([]);

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);
    
  useEffect(() => {
    testFetchLastRaceResults()
    .then(results => setLastRaceResults(results)); 
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
  
  const racerData = [
    formatRow(names[0], fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo),
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

