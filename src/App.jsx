import { useEffect, useState } from "react";
import DenseTable from "./DenseTable";
import {
  fetchCurrentSeasonRaceResults,
  fetchCurrentStandings,
  fetchEventList,
  fetchNextTrackData,
  fetchPreviousSeasonRaceResults,
} from "./utilities";

import { circuitTypes } from "./consts";

export default function App() {
  const [names, setNames] = useState([]);
  const [previousSeasonRaceResults, setPreviousSeasonRaceResults] = useState([]);
  const [currentSeasonRaceResults, setCurrentSeasonRaceResults] = useState([]);
  const [lastFiveRaceResults, setLastFiveRaceResults] = useState([]);
  const [driverTableData, setDriverTableData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [nextRace, setNextRace] = useState("");
  const [nextRaceHistory, setNextRaceHistory] = useState([]);
  const [nextRaceType, setNextRaceType] = useState("");
  const [nextRaceTypeHistory, setNextRaceTypeHistory] = useState([]);
  const [racerData, setRacerData] = useState([]);

  // Getting driver names, current season results and events list
  useEffect(() => {
    fetchCurrentStandings().then((results) => setNames(results));

    fetchCurrentSeasonRaceResults().then((results) =>
      setCurrentSeasonRaceResults(results)
    );

    fetchEventList().then((results) => setEventList(results));
  }, []);

  // Update last five race results
  useEffect(() => {
    const lastFiveRaceResults = currentSeasonRaceResults
      //making copy for reverse
      .slice()
      .reverse()
      .slice(
      0,
      5
    ).reverse()
    setLastFiveRaceResults(lastFiveRaceResults);
  }, [currentSeasonRaceResults]);

  // Set next race data
  useEffect(() => {
    if (lastFiveRaceResults.length === 5) {
      let nextCircuitId;
      let nextCircuitType;
      let lastRound = Number(lastFiveRaceResults[4]?.round);
      let nextRound = (lastRound += 1);
      for (let i = 0; i < eventList.length; i++) {
        if (Number(eventList[i].round) === nextRound) {
          nextCircuitId = eventList[i].Circuit.circuitId;
        }
      }
      for (let i = 0; i < circuitTypes.length; i++) {
        if (circuitTypes[i].circuitIds.includes(nextCircuitId)) {
          nextCircuitType = circuitTypes[i].circuitType;
        }
      }
      setNextRace(nextCircuitId);
      setNextRaceType(nextCircuitType);
    }
  }, [eventList, lastFiveRaceResults]);
  

  // Update next race history
  useEffect(() => {
    fetchNextTrackData(nextRace).then((results) => setNextRaceHistory(results));
  }, [nextRace]);

  useEffect(() => {
    if (nextRaceType != "" && currentSeasonRaceResults.length != 0) {
      /**
       * This function returns full race results for the last 5 races that have a circuit type which matches the next race's circuit type. (I.e. If the next race is a power circuit, it will get the last 5 race results from power circuits)
       */
      const getNextTrackType = (nextRaceType) => {
        const typeMatch = circuitTypes.find(
          (type) => type.circuitType === nextRaceType
        );
        const circuitTypeMatches = typeMatch ? typeMatch.circuitIds : [];

        const circuitTypeMatchesMostRecent = currentSeasonRaceResults.filter(
          (result) => circuitTypeMatches.includes(result.Circuit.circuitId)
        );

        if (circuitTypeMatchesMostRecent.length > 5) {
          return circuitTypeMatchesMostRecent.slice(-5).reverse();
        }

        //else if (circuitTypeMatchesMostRecent.length < 5) {
          //setTimeout(function, 1000);
        //}

        // Todo: Add 'else if' statements for cases where circuitTypeMatchesMostRecent.length <= 5
      };
    };
    const nextTrackType = getNextTrackType(nextRaceType);

    setNextRaceTypeHistory(nextTrackType);
  }, [currentSeasonRaceResults, nextRaceType]);

  useEffect(() => {
    console.log(nextRaceTypeHistory);
  }, [nextRaceTypeHistory]);

  //Todo: Something wonky in this function.
  // useEffect(() => {
  //   const driverData = [];

  //   /**
  //    * This function creates a variable called driver - each driver has props that are updated based on three metrics:
  //    * 1. Results from the last five races.
  //    * 2. Results from the next five races held at the next circuit.
  //    * 3. Results from the last five races held circuits that have the same circuit type as the next circuit.
  //    * If a driver didn't participate in a particular race, "N/A" will populate.
  //    * The lastName prop is used to match individual race finishing positions with each driver. (I.e. The driver who
  //    * finished 3rd in the last race has the last name "Hamilton", so Lewis Hamilton finished 3rd in the last race.)
  //    * After each driver's props are fully updated, the driver object is pushed to an empty array called "driverData".
  //    * The driverData array is used to set the state of driverTableData.
  //    */
  //   async function mapNamesAndResultsToDrivers() {
  //     names.forEach((name, i) => {
  //       const driver = {
  //         name: names[i],
  //         lastName: names[i].substring(names[i].indexOf(" ") + 1),
  //         lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
  //         nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
  //         nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
  //       };

  //       for (let z = 0; z < lastFiveRaceResults.length; z++) {
  //         for (let i = 0; i < lastFiveRaceResults[0].Results.length; i++) {
  //           if (
  //             lastFiveRaceResults[z].Results[i].Driver.familyName ===
  //             driver.lastName
  //           ) {
  //             driver.lastFiveRaces[z] =
  //               lastFiveRaceResults[z].Results[i].positionText;
  //           }
  //         }
  //       }

  //       for (let z = 0; z < nextRaceHistory.length; z++) {
  //         for (let i = 0; i < nextRaceHistory[0].Results.length; i++) {
  //           if (
  //             nextRaceHistory[z].Results[i]?.Driver.familyName ===
  //             driver.lastName
  //           ) {
  //             driver.nextRaceResults[z] =
  //               nextRaceHistory[z].Results[i].positionText;
  //           }
  //         }
  //       }

  //       for (let z = 0; z < nextRaceTypeHistory?.length; z++) {
  //         for (let i = 0; i < nextRaceTypeHistory[0].Results.length; i++) {
  //           if (
  //             nextRaceTypeHistory[z].Results[i].Driver.familyName ===
  //             driver.lastName
  //           ) {
  //             driver.nextRaceTypeResults[z] =
  //               nextRaceTypeHistory[z].Results[i].positionText;
  //           }
  //         }
  //       }

  //       driverData.push(driver);
  //     });

  //     setDriverTableData([...driverTableData, driverData]);
  //   }

  //   mapNamesAndResultsToDrivers();
  // }, [
  //   driverTableData,
  //   lastFiveRaceResults,
  //   names,
  //   nextRaceHistory,
  //   nextRaceTypeHistory,
  // ]);

  //console.log(currentSeasonRaceResults);
  //console.log(eventList);
  //console.log(names);
  //console.log(lastFiveRaceResults);
  //console.log(nextRace);
  //console.log(nextRaceType);
  //console.log(nextRaceHistory);
  //console.log(nextRaceTypeHistory);

  function formatRow(
    name,
    fiveRacesAgo,
    fourRacesAgo,
    threeRacesAgo,
    twoRacesAgo,
    oneRaceAgo,
    nextRace1,
    nextRace2,
    nextRace3,
    nextRace4,
    nextRace5,
    nextRaceType1,
    nextRaceType2,
    nextRaceType3,
    nextRaceType4,
    nextRaceType5
  ) {
    return {
      name,
      fiveRacesAgo,
      fourRacesAgo,
      threeRacesAgo,
      twoRacesAgo,
      oneRaceAgo,
      nextRace1,
      nextRace2,
      nextRace3,
      nextRace4,
      nextRace5,
      nextRaceType1,
      nextRaceType2,
      nextRaceType3,
      nextRaceType4,
      nextRaceType5,
    };
  }

  useEffect(() => {
    setRacerData(
      driverTableData.map((driver) =>
        formatRow(
          driver.name,
          driver.lastFiveRaces[0],
          driver.lastFiveRaces[1],
          driver.lastFiveRaces[2],
          driver.lastFiveRaces[3],
          driver.lastFiveRaces[4],
          driver.nextRaceResults[0],
          driver.nextRaceResults[1],
          driver.nextRaceResults[2],
          driver.nextRaceResults[3],
          driver.nextRaceResults[4],
          driver.nextRaceTypeResults[0],
          driver.nextRaceTypeResults[1],
          driver.nextRaceTypeResults[2],
          driver.nextRaceTypeResults[3],
          driver.nextRaceTypeResults[4]
        )
      )
    );
  }, [driverTableData]);

  return (
    <>
      <DenseTable data={racerData} />
    </>
  );
}
