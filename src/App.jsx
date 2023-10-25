import {useEffect, useState} from 'react';
import DenseTable from './DenseTable';
import {fetchCurrentStandings} from './utilities';
import {fetchCurrentSeasonRaceResults} from './utilities'
import {fetchEventList} from './utilities'

async function testFetchEventList() {
  const results = await fetchEventList();
  return results;
};

async function testFetchCurrentStandings() {
  const results = await fetchCurrentStandings();
  return results;
};

async function testFetchCurrentSeasonRaceResults() {
  const results = await fetchCurrentSeasonRaceResults();
  return results;
};



export default function App() {
  const [names, setNames] = useState([]);
  const [currentSeasonRaceResults, setCurrentSeasonRaceResults] = useState([]);
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
    testFetchCurrentSeasonRaceResults()
    .then(results => setCurrentSeasonRaceResults(results)) 
  }, []);

  async function getLastFiveRaceResults() {
    await testFetchCurrentSeasonRaceResults();
    console.log(currentSeasonRaceResults);
    const reverseCurrentSeasonRaceResults = currentSeasonRaceResults
      .slice()
      .reverse()
      .map(element => {
        return element;
      });
    const lastFiveRaceResultsReversed = reverseCurrentSeasonRaceResults.slice(0, 5);
    const lastFiveRaceResults = lastFiveRaceResultsReversed.reverse();
    console.log(lastFiveRaceResults)
    return lastFiveRaceResults;
  };

  async function testGetLastFiveRaceResults() {
    const results = await getLastFiveRaceResults();
    return results;
  };

  useEffect(() => {
    testGetLastFiveRaceResults()
    .then(results => setLastFiveRaceResults(results)) 
  }, [currentSeasonRaceResults]);
  
  useEffect(() => {
    testFetchEventList()
    .then(results => setEventList(results))
  }, []);

  let nextCircuitId;
  let nextCircuitType;

  const highDownforceCircuits = {
    circuitType: 'High Downforce',
    circuitIds: ['albert_park', 'monaco', 'catalunya', 'hungaroring', 'zandvoort', 'marina_bay', 'suzuka', 'losail', 'rodriguez']
  };
  const balancedCircuits = {
    circuitType: 'Balanced',
    circuitIds: ['miami', 'red_bull_ring', 'silverstone', 'americas', 'interlagos' ]
  };
  const powerCircuits = {
    circuitType: 'Power',
    circuitIds: ['bahrain', 'jeddah', 'baku', 'villeneuve', 'spa', 'monza', 'vegas' ]
  };
  const circuitTypes = [highDownforceCircuits, balancedCircuits, powerCircuits];
  console.log(circuitTypes);

  async function getNextCircuitIdAndType() {
    const results = await getLastFiveRaceResults();
    let lastRound = Number(results[4].round);
    console.log(lastRound);
    let nextRound = (lastRound += 1);
    console.log(nextRound);
    for ( let i = 0; i < eventList.length; i++ ) {
      if (Number(eventList[i].round) === nextRound) {
        nextCircuitId = eventList[i].Circuit.circuitId;
      };
    }
    for ( let i = 0; i < circuitTypes.length; i++ ) {
      if (circuitTypes[i].circuitIds.includes(nextCircuitId)) {
       nextCircuitType = circuitTypes[i].circuitType;
      };
    }
    setNextRace(nextCircuitId);
    setNextRaceType(nextCircuitType);
  };

  useEffect (() => {
    getNextCircuitIdAndType();
  }, [lastFiveRaceResults]);

  async function fetchNextTrackData(nextRace) {
    console.log(nextRace);
    console.log(nextRaceType);
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

  async function fetchNextTrackTypeData(nextRaceType) {
    let circuitTypeMatches;
    let circuitTypeMatchesMostRecent = [];
    console.log(currentSeasonRaceResults);
    for ( let i = 0; i < circuitTypes.length; i++ ) {
      if (circuitTypes[i].circuitType === nextRaceType) {
        circuitTypeMatches = circuitTypes[i].circuitIds;
      //}
      }
    };
    console.log(circuitTypeMatches);
      for ( let x = 0; x < currentSeasonRaceResults.length; x++ ) {
        for ( let z = 0; z < circuitTypeMatches.length; z++ ) {
          if (currentSeasonRaceResults[x].Circuit.circuitId === circuitTypeMatches[z]) {
            circuitTypeMatchesMostRecent.push(currentSeasonRaceResults[x]);
          }
        };
      };  
      console.log(circuitTypeMatchesMostRecent);
        if (circuitTypeMatchesMostRecent.length > 5) {
          const reverseCircuitTypeMatchesMostRecent = circuitTypeMatchesMostRecent.reverse();
          const reverseLastFiveCircuitTypeMatches = reverseCircuitTypeMatchesMostRecent.slice(0, 5);
          const lastFiveCircuitTypeMatches = reverseLastFiveCircuitTypeMatches.reverse();
          console.log(lastFiveCircuitTypeMatches);
          return lastFiveCircuitTypeMatches;
        }
        ////Must add 'else if' statements to handle when circuitTypeMatchesMostRecent.length is = or < 5
  };

  async function testFetchNextTrackTypeData(nextRaceType) {
    const results = await fetchNextTrackTypeData(nextRaceType);
    return results;
  };

  useEffect(() => {
    testFetchNextTrackTypeData(nextRaceType)
    .then(results => setNextRaceTypeHistory(results))
  }, [nextRaceType]);

  console.log(nextRace);
  
  console.log(nextRaceHistory);

  console.log(nextRaceTypeHistory)

  const driverData = [];
  
  async function mapNamesAndResultsToDrivers() {
    await fetchCurrentSeasonRaceResults();
    await testFetchNextTrackData(nextRace);
    await testFetchNextTrackTypeData(nextRaceType);
    await getNextCircuitIdAndType();
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

          for ( let z = 0; z < nextRaceTypeHistory.length; z++ ) {

            for ( let i = 0; i < nextRaceTypeHistory[0].Results.length; i++ ) {
                if (nextRaceTypeHistory[z].Results[i].Driver.familyName === driver.lastName) {
                    driver.nextRaceTypeResults[z] = nextRaceTypeHistory[z].Results[i].positionText;
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
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  //useEffect(() => {
   // console.log(driverTableData); (consider renaming the title of mapNamesAndResultsToDrivers to this)
  //}, [driverTableData]);

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5,
      nextRaceType1, nextRaceType2, nextRaceType3, nextRaceType4, nextRaceType5) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, oneRaceAgo, nextRace1, nextRace2, nextRace3, nextRace4, nextRace5, 
      nextRaceType1, nextRaceType2, nextRaceType3, nextRaceType4, nextRaceType5};
  };
  
  const racerData = driverTableData.map(driver => formatRow(driver.name, driver.lastFiveRaces[0], driver.lastFiveRaces[1], driver.lastFiveRaces[2], driver.lastFiveRaces[3], driver.lastFiveRaces[4],
    driver.nextRaceResults[0], driver.nextRaceResults[1], driver.nextRaceResults[2], driver.nextRaceResults[3], driver.nextRaceResults[4],
    driver.nextRaceTypeResults[0], driver.nextRaceTypeResults[1], driver.nextRaceTypeResults[2], driver.nextRaceTypeResults[3], driver.nextRaceTypeResults[4]));
  
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

