import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchCurrentStandings} from './utilities';
import {fetchLastFiveRaceResults} from './utilities'
import {fetchEventList} from './utilities'

async function testFetchEventList() {
  const results = await fetchEventList();
  return results;
};

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
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);

  useEffect(() => {
    testFetchLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)) 
  }, []);

  useEffect(() => {
    console.log(lastFiveRaceResults[0]);
  }, [lastFiveRaceResults]);
  
  useEffect(() => {
    testFetchEventList()
    .then(results => setEventList(results))
  }, []);

  let nextCircuitId;

  async function getNextCircuitId() {
    const results = await fetchLastFiveRaceResults();
    let lastRound = Number(results[0].round);
    console.log(lastRound);
    let nextRound = (lastRound += 1);
    console.log(nextRound);
    for ( let i = 0; i < eventList.length; i++ ) {
      if (Number(eventList[i].round) === nextRound) {
        nextCircuitId = eventList[i].Circuit.circuitId;
      };
    }
    console.log(nextCircuitId);
  };

  useEffect (() => {
    getNextCircuitId();
  }, [lastFiveRaceResults]);

  const driverData = [];
  
  function mapNamesAndResultsToDrivers() {
    names.forEach((name, i) => {
      const driver = {
        name: "",
        firstName: "",
        fiveRacesAgo: "N/A",
        fourRacesAgo: "N/A",
        threeRacesAgo: "N/A",
        twoRacesAgo: "N/A",
        oneRaceAgo: "N/A"
      };
      driver.name = names[i];
      const nameParts = driver.name.split(" ");
      driver.firstName = nameParts[0];
      
      for ( let i = 0; i < 20; i++ ) {
        
        if (lastFiveRaceResults[4].Results[i].Driver.givenName === driver.firstName) {
            driver.fiveRacesAgo = lastFiveRaceResults[4].Results[i].positionText};
            
            if (lastFiveRaceResults[3].Results[i].Driver.givenName === driver.firstName) {
              driver.fourRacesAgo = lastFiveRaceResults[3].Results[i].positionText};
              
              if (lastFiveRaceResults[2].Results[i].Driver.givenName === driver.firstName) {
                driver.threeRacesAgo = lastFiveRaceResults[2].Results[i].positionText};
                
                if (lastFiveRaceResults[1].Results[i].Driver.givenName === driver.firstName) {
                  driver.twoRacesAgo = lastFiveRaceResults[1].Results[i].positionText};
                  
                  if (lastFiveRaceResults[0].Results[i].Driver.givenName === driver.firstName) {
                    driver.oneRaceAgo = lastFiveRaceResults[0].Results[i].positionText};            
      };
  
      driverData.push(driver);
      //Should I use map instead?^
 
    });
    
    setDriverResults(...driverResults, driverData);
    //THIS HAS TO BE PUT IN THE END:setDriverResults([...driverResults, //driver]);
  };

  useEffect(() => {
    mapNamesAndResultsToDrivers(); 
  }, [lastFiveRaceResults]);

  useEffect(() => {
    console.log(driverResults);
  }, [driverResults[21]]);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo };
  };
  
  const racerData = driverResults.map(driver => formatRow(driver.name, driver.fiveRacesAgo, driver.fourRacesAgo, driver.threeRacesAgo, driver.twoRacesAgo, driver.oneRaceAgo));
  
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

