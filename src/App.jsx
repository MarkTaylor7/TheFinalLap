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
  const [driverTableData, setDriverTableData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [nextRace, setNextRace] = useState('');
  const [nextRaceHistory, setNextRaceHistory] = useState([]);
  const [nextRaceType, setNextRaceType] = useState('');
  const [nextRaceTypeHistory, setNextRaceTypeHistory] = useState([]);

  

  useEffect(() => {
    testFetchCurrentStandings()
    .then(results => setNames(results)); 
  }, []);

  useEffect(() => {
    testFetchLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)) 
  }, []);
  
  useEffect(() => {
    testFetchEventList()
    .then(results => setEventList(results))
  }, []);

  let nextCircuitId;
  let nextCircuitType;

  const highDownforceCircuitIds = ['albert_park', 'monaco', 'catalunya', 'hungaroring', 'zandvoort', 'marina_bay', 'suzuka', 'losail', 'rodriguez'  ];
  const balancedCircuitIds = ['miami', 'red_bull_ring', 'silverstone', 'americas', 'interlagos' ];
  const powerCircuitIds = ['bahrain', 'jeddah', 'baku', 'villeneuve', 'spa', 'monza', 'vegas' ];
  const circuitTypes = [highDownforceCircuitIds, balancedCircuitIds, powerCircuitIds ];
  console.log(circuitTypes);

  async function getNextCircuitId() {
    const results = await fetchLastFiveRaceResults();
    let lastRound = Number(results[4].round);
    let nextRound = (lastRound += 1);
    for ( let i = 0; i < eventList.length; i++ ) {
      if (Number(eventList[i].round) === nextRound) {
        nextCircuitId = eventList[i].Circuit.circuitId;
      };
    }
    for ( let i = 0; i < circuitTypes.length; i++ ) {
      if (circuitTypes[i].includes(nextCircuitId)) {
        nextCircuitType = circuitTypes[i];
      };
    }
    setNextRace(nextCircuitId);
    console.log(nextCircuitType);
  };

  useEffect (() => {
    getNextCircuitId();
  }, [lastFiveRaceResults]);

  async function fetchNextTrackData(nextRace) {
    console.log(nextRace);
    const url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      
      const nextRaceAllEvents = json.MRData.RaceTable.Races;
      const reverseNextRaceAllEvents = nextRaceAllEvents.reverse();
      const nextRaceLastFiveEventsReverse = reverseNextRaceAllEvents.slice(0, 5);
      const nextRaceLastFiveEvents = nextRaceLastFiveEventsReverse.reverse();
      return nextRaceLastFiveEvents;
    } catch (error) {
      console.log("error", error);
    }
  };

  async function testFetchNextTrackData(nextRace) {
    const results = await fetchNextTrackData(nextRace);
    return results;
  };

  useEffect(() => {
    testFetchNextTrackData(nextRace)
    .then(results => setNextRaceHistory(results))
  }, [nextRace]);

  console.log(nextRace);
  
  console.log(nextRaceHistory);

  const driverData = [];
  
  async function mapNamesAndResultsToDrivers() {
    await fetchLastFiveRaceResults();
    await fetchNextTrackData(nextRace); 
    names.forEach((name, i) => {
      const driver = {
        name: names[i],
        lastName: names[i].substring(names[i].indexOf(' ') + 1),
        lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
      };
        
      for ( let z = 0; z < lastFiveRaceResults.length; z++ ) {

        for ( let i = 0; i < lastFiveRaceResults[0].Results.length; i++ ) {
            
            if (lastFiveRaceResults[z].Results[i].Driver.familyName === driver.lastName) {
                driver.lastFiveRaces[z] = lastFiveRaceResults[z].Results[i].positionText;
            };
        };
      };

      for ( let z = 0; z < nextRaceHistory.length; z++ ) {

        for ( let i = 0; i < nextRaceHistory[0].Results.length; i++ ) {
            
            if (nextRaceHistory[z].Results[i].Driver.familyName === driver.lastName) {
                driver.nextRaceResults[z] = nextRaceHistory[z].Results[i].positionText;
            };
        };
      };
      
      console.log(driver);     
      driverData.push(driver);
      //Should I use map instead?^
    });
    setDriverTableData(...driverTableData, driverData);
  };

  useEffect(() => {
    mapNamesAndResultsToDrivers(); 
  }, [lastFiveRaceResults, nextRaceHistory]);

  //useEffect(() => {
   // console.log(driverTableData); (consider renaming the title of mapNamesAndResultsToDrivers to this)
  //}, [driverTableData]);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5,
      nextRaceType1, nextRaceType2, nextRaceType3, nextRaceType4, nextRaceType5) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5, 
      nextRaceType1, nextRaceType2, nextRaceType3, nextRaceType4, nextRaceType5};
  };
  
  const racerData = driverTableData.map(driver => formatRow(driver.name, driver.lastFiveRaces[0], driver.lastFiveRaces[1], driver.lastFiveRaces[2], driver.lastFiveRaces[3], driver.lastFiveRaces[4],
    driver.nextRaceResults[0], driver.nextRaceResults[1], driver.nextRaceResults[2], driver.nextRaceResults[3], driver.nextRaceResults[4]));
  
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

