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
  const [driverTableData, setDriverResults] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [nextRace, setNextRace] = useState([]);

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);

  useEffect(() => {
    testFetchLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)) 
  }, []);

  //useEffect(() => {
    //console.log(lastFiveRaceResults[0]);
  //}, [lastFiveRaceResults]);
  
  useEffect(() => {
    testFetchEventList()
    .then(results => setEventList(results))
  }, []);

  let nextCircuitId;

  async function getNextCircuitId() {
    const results = await fetchLastFiveRaceResults();
    let lastRound = Number(results[0].round);
    let nextRound = (lastRound += 1);
    for ( let i = 0; i < eventList.length; i++ ) {
      if (Number(eventList[i].round) === nextRound) {
        nextCircuitId = eventList[i].Circuit.circuitId;
      };
    }
    setNextRace(nextCircuitId);
  };

  useEffect (() => {
    getNextCircuitId();
  }, [lastFiveRaceResults]);

  //async function fetchNextTrackData() {
  //  console.log(nextRace);
  //};

  //fetchNextTrackData();

  const driverData = [];
  
  async function mapNamesAndResultsToDrivers() {
    const results = await fetchLastFiveRaceResults();
    names.forEach((name, i) => {
      const driver = {
        name: names[i],
        firstName: names[i].split(" ")[0],
        lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
      };
        
      for ( let z = 0; z < lastFiveRaceResults.length; z++ ) {

        for ( let i = 0; i < lastFiveRaceResults[0].Results.length; i++ ) {
            
            if (lastFiveRaceResults[z].Results[i].Driver.givenName === driver.firstName) {
                driver.lastFiveRaces[z] = lastFiveRaceResults[z].Results[i].positionText;
            };
        };
      };
            
      driverData.push(driver);
      //Should I use map instead?^
    });
    setDriverResults(...driverTableData, driverData);
  };

  useEffect(() => {
    mapNamesAndResultsToDrivers(); 
  }, [lastFiveRaceResults]);

  //useEffect(() => {
   // console.log(driverTableData);
  //}, [driverTableData]);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5 };
  };
  
  const racerData = driverTableData.map(driver => formatRow(driver.name, driver.lastFiveRaces[0], driver.lastFiveRaces[1], driver.lastFiveRaces[2], driver.lastFiveRaces[3], driver.lastFiveRaces[4],
    driver.nextRaceResults[0], driver.nextRaceResults[1], driver.nextRaceResults[2], driver.nextRaceResults[3], driver.nextRaceResults[4]));
  
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

