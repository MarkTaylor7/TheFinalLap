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
    };
  };

  setTimeout(() => {
    mapNamesToDrivers();
  }, 200);
  
  function mapResultsToDriver() {
    for (let i = 0; i < 22; i++ ) {
      driverData[i].lastFiveResults = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
    };
      for (let j = 0; j < 22; j++ ) {
        
      for (let k = 0; k < 22; k++) {
        
        if (lastFiveRaceResults[4].Results[j].Driver.givenName === driverData[k].firstName) {
          driverData[k].lastFiveResults.splice(0, 1, lastFiveRaceResults[4].Results[j].positionText)};
          

          if (lastFiveRaceResults[3].Results[j].Driver.givenName === driverData[k].firstName) {
            driverData[k].lastFiveResults.splice(1, 1, lastFiveRaceResults[3].Results[j].positionText)};
            

            if (lastFiveRaceResults[2].Results[j].Driver.givenName === driverData[k].firstName) {
              driverData[k].lastFiveResults.splice(2, 1, lastFiveRaceResults[2].Results[j].positionText)};
              

              if (lastFiveRaceResults[1].Results[j].Driver.givenName === driverData[k].firstName) {
                driverData[k].lastFiveResults.splice(3, 1, lastFiveRaceResults[1].Results[j].positionText)};
                

                if (lastFiveRaceResults[0].Results[j].Driver.givenName === driverData[k].firstName) {
                  driverData[k].lastFiveResults.splice(4, 1, lastFiveRaceResults[0].Results[j].positionText)};
                       
      }
    }
  };
  
  //const fiveRacesAgo = lastFiveRaceResults[4];
    //const fourRacesAgo = lastFiveRaceResults[3];
    //const threeRacesAgo = lastFiveRaceResults[2];
    //const twoRacesAgo = lastFiveRaceResults[1];
    //const oneRaceAgo = lastFiveRaceResults[0];

  setTimeout(() => { 
    mapResultsToDriver();
  }, 500);

  setTimeout(() => {
    console.log(driverData);
  }, 1000);


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

