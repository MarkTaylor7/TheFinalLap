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
    names.forEach((name, i) => {
      const driver = {
        name: "",
        firstName: "",
        lastFiveResults: ['N/A', 'N/A', 'N/A', 'N/A', 'N/A']
      };
      driver.name = names[i];
      const nameParts = driver.name.split(" ");
      driver.firstName = nameParts[0];
      
      for ( let i = 0; i < 20; i++ ) {
        
        if (lastFiveRaceResults[4].Results[i].Driver.givenName === driver.firstName) {
            driver.lastFiveResults.splice(0, 1, lastFiveRaceResults[4].Results[i].positionText)};
            
            if (lastFiveRaceResults[3].Results[i].Driver.givenName === driver.firstName) {
              driver.lastFiveResults.splice(1, 1, lastFiveRaceResults[3].Results[i].positionText)};
              
              if (lastFiveRaceResults[2].Results[i].Driver.givenName === driver.firstName) {
                driver.lastFiveResults.splice(2, 1, lastFiveRaceResults[2].Results[i].positionText)};
                
                if (lastFiveRaceResults[1].Results[i].Driver.givenName === driver.firstName) {
                  driver.lastFiveResults.splice(3, 1, lastFiveRaceResults[1].Results[i].positionText)};
                  
                  if (lastFiveRaceResults[0].Results[i].Driver.givenName === driver.firstName) {
                    driver.lastFiveResults.splice(4, 1, lastFiveRaceResults[0].Results[i].positionText)};            
      };
  
      driverData.push(driver);
      //Should I use map instead?^

      //Create a new list, replace the old list with a new list
      //Todo: Populate the driver object with actual data
      //driver.name = names[i] 
    });
    
    setDriverResults([...driverResults, driverData]);
    //THIS HAS TO BE PUT IN THE END:setDriverResults([...driverResults, //driver]);
  };


  //const fiveRacesAgo = driverData.lastFiveResults[4];
  //const fourRacesAgo = driverData.lastFiveeResults[3];
  //const threeRacesAgo = driverData.lastFiveResults[2];
  //const twoRacesAgo = driverData.lastFiveResults[1];
  //const oneRaceAgo = driverData.lastFiveResults[0];

  useEffect(() => {
    mapNamesAndResultsToDrivers(); 
  }, [lastFiveRaceResults]);

  useEffect(() => {
    console.log(driverResults);
  }, [driverResults]);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  };
  
  
  const racerData = names.map(driver => formatRow(driver, null, null, null, null, null));
  
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

