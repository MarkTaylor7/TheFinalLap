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


  const driver1 = [];
  const driver2 = [];
  const driver3 = [];
  const driver4 = [];
  const driver5 = [];
  const driver6 = [];
  const driver7 = [];
  const driver8 = [];
  const driver9 = [];
  const driver10 = [];
  const driver11 = [];
  const driver12 = [];
  const driver13 = [];
  const driver14 = [];
  const driver15 = [];
  const driver16 = [];
  const driver17 = [];
  const driver18 = [];
  const driver19 = [];
  const driver20 = [];
  const driver21 = [];
  const driver22 = [];

  const driverData = [driver1, driver2, driver3, driver4, driver5, driver6,
     driver7, driver8, driver9, driver10, driver11, driver12,
      driver13, driver14, driver15, driver16, driver17, driver18, driver19, driver20, driver21, driver22];

  

  function mapNamesToDrivers() {
    driver1.name = names[0]
    driver2.name = names[1]
    driver3.name = names[2]
    driver4.name = names[3]
    driver5.name = names[4]
    driver6.name = names[5]
    driver7.name = names[6]
    driver8.name = names[7]
    driver9.name = names[8]
    driver10.name = names[9]
    driver11.name = names[10]
    driver12.name = names[11]
    driver13.name = names[12]
    driver14.name = names[13]
    driver15.name = names[14]
    driver16.name = names[15]
    driver17.name = names[16]
    driver18.name = names[17]
    driver19.name = names[18]
    driver20.name = names[19]
    driver21.name = names[20]
    driver22.name = names[21]
  };

  mapNamesToDrivers();

  
  console.log(driver15);
    

function mapResultsToDriver() {
  const fiveRacesAgo = lastFiveRaceResults[4];
  const fourRacesAgo = lastFiveRaceResults[3];
  const threeRacesAgo = lastFiveRaceResults[2];
  const twoRacesAgo = lastFiveRaceResults[1];
  const oneRaceAgo = lastFiveRaceResults[0];
  if (oneRaceAgo.Results[0].Driver.givenName === "Max") {
    driver1.push(oneRaceAgo.Results[0].positionText)};
};

setTimeout(() => { 
  mapResultsToDriver();
}, 200);

console.log(driver1);
console.log(driverData);

//Have to find way to link DriverData to setDriverResults
const x = driverData[0];

  function formatRow(name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, x) {
    return { name, fiveRacesAgo, fourRacesAgo, threeRacesAgo, twoRacesAgo, x };
  }
  

  const racerData = driverData.map(driverData => formatRow(driverData.name, null, null, null, null, x)); 
  
  return (
    <>
      <DenseTable data={racerData} />
    </>
  )
}

