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
  const [driverResults, setDriverResults] = useState([]);

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);

  useEffect(() => {
    testFetchLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)); 
  }, []);

  const driverData = [];

  function mapNamesToDrivers() {
    for (let i = 0; i < 22; i++ ) {
      const driver = [];
      const driverNames = [];
      driverData.push(driver);
      driverData[i].name = names[i];
      driverNames.push(driverData[i].name);
      const nameParts = driverNames[0]?.split(' ');
      driverData[i].firstName = nameParts[0];
      driverData[i].lastFiveResults = [];
    };
  };

  setTimeout(() => {
    mapNamesToDrivers();
  }, 200);
  
  setTimeout(() => {
    console.log(driverData);
  }, 2000);
  

  function mapResultsToDriver() {
    const fiveRacesAgo = lastFiveRaceResults[4];
    const fourRacesAgo = lastFiveRaceResults[3];
    const threeRacesAgo = lastFiveRaceResults[2];
    const twoRacesAgo = lastFiveRaceResults[1];
    const oneRaceAgo = lastFiveRaceResults[0];
      if (oneRaceAgo.Results[0].Driver.givenName === driverData[0].firstName) {
        driverData[0].lastFiveResults.push(oneRaceAgo.Results[0].positionText)};
  };

  setTimeout(() => { 
    mapResultsToDriver();
  }, 500);


  //Have to find way to link DriverData to setDriverResults

  
  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  };
  
  
  const racerData = driverData.map(driverData => formatRow(driverData.name, null, null, null, null, driverData.lastFiveResults[0])); 
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

