import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchCurrentStandings} from './utilities';
import {fetchLastRaceResults} from './utilities';
import {fetchLastFiveRaceResults} from './utilities'

fetchLastFiveRaceResults();

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


  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, lastRaceResult) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, lastRaceResult };
  }
  
  const racerData = [
    formatRow(names[0], null, null, null, null, lastRaceResults[0]),
    formatRow(names[1], null, null, null, null, lastRaceResults[1]),
    formatRow(names[2], null, null, null, null, lastRaceResults[2]),
    formatRow(names[3], null, null, null, null, lastRaceResults[3]),
    formatRow(names[4], null, null, null, null, lastRaceResults[4]),
    formatRow(names[5], null, null, null, null, lastRaceResults[5]),
    formatRow(names[6], null, null, null, null, lastRaceResults[6]),
    formatRow(names[7], null, null, null, null, lastRaceResults[7]),
    formatRow(names[8], null, null, null, null, lastRaceResults[8]),
    formatRow(names[9], null, null, null, null, lastRaceResults[9]),
    formatRow(names[10], null, null, null, null, lastRaceResults[10]),
    formatRow(names[11], null, null, null, null, lastRaceResults[11]),
    formatRow(names[12], null, null, null, null, lastRaceResults[12]),
    formatRow(names[13], null, null, null, null, lastRaceResults[13]),
    formatRow(names[14], null, null, null, null, lastRaceResults[14]),
    formatRow(names[15], null, null, null, null, lastRaceResults[15]),
    formatRow(names[16], null, null, null, null, lastRaceResults[16]),
    formatRow(names[17], null, null, null, null, lastRaceResults[17]),
    formatRow(names[18], null, null, null, null, lastRaceResults[18]),
    formatRow(names[19], null, null, null, null, lastRaceResults[19]),
    formatRow(names[20], null, null, null, null, lastRaceResults[20]),
    formatRow(names[21], null, null, null, null, lastRaceResults[21]),
  ];

  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

