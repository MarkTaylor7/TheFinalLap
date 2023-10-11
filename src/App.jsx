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

  function mapNamesAndResultsToDrivers() {
    for (let i = 0; i < 22; i++ ) {
      const driver = [];
      const driverNames = [];
      driverData.push(driver);
      driverData[i].name = names[i];
      driverNames.push(driverData[i].name);
      const nameParts = driverNames[0]?.split(' ');
      driverData[i].firstName = nameParts[0];
    };

    for ( let i = 0; i < 22; i++ ) {
      driverData[i].lastFiveResults = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
    };
      for ( let j = 0; j < 22; j++ ) {
        
      for ( let k = 0; k < 22; k++ ) {
        
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
  //const fiveRacesAgo = driverData.lastFiveResults[4];
  //const fourRacesAgo = driverData.lastFiveeResults[3];
  //const threeRacesAgo = driverData.lastFiveResults[2];
  //const twoRacesAgo = driverData.lastFiveResults[1];
  //const oneRaceAgo = driverData.lastFiveResults[0];

  setTimeout(() => {
  mapNamesAndResultsToDrivers()
  }, 200);
  
  //return [driverData[0].lastFiveResults, driverData[1].lastFiveResults];
  setTimeout(() => {
    console.log(driverData);
  }, 500);

  //Have to find way to link DriverData to setDriverResults

  
  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  };
  
  
  const racerData = driverData.map(driverData => formatRow(driverData.name, null, null, null, null)); 
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

