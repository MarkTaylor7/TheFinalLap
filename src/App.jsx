import { useEffect, useState } from "react";
import DenseTable from "./DenseTable";
import {
  fetchCurrentSeasonRaceResults,
  fetchCurrentStandings,
  fetchEventList,
  fetchNextTrackData,
  fetchPreviousSeasonRaceResults,
} from "./utilities";

import { circuitTypes, raceTitles } from "./consts";

export default function App() {
  const [names, setNames] = useState([]);
  const [previousSeasonRaceResults, setPreviousSeasonRaceResults] = useState([]);
  const [currentSeasonRaceResults, setCurrentSeasonRaceResults] = useState([]);
  const [lastFiveRaceResults, setLastFiveRaceResults] = useState([]);
  const [flagHeadingsContent, setFlagHeadingsContent] = useState([]);
  const [tableHeadingsContent, setTableHeadingsContent] = useState([]);
  const [driverTableData, setDriverTableData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [nextRace, setNextRace] = useState("");
  const [nextRaceHistory, setNextRaceHistory] = useState([]);
  const [nextRaceType, setNextRaceType] = useState("");
  const [currentSeasonCircuitTypeMatches, setCurrentSeasonCircuitTypeMatches] = useState([]);
  const [nextRaceTypeHistory, setNextRaceTypeHistory] = useState([]);
  const [flagHeadings, setFlagHeadings] = useState([]);
  const [tableHeadings, setTableHeadings] = useState([]);
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
      .slice(0, 5)
      .reverse();
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
      function getCurrentSeasonTypeMatches(nextRaceType) {
        const typeMatch = circuitTypes.find(
          (type) => type.circuitType === nextRaceType
        );
        const circuitTypeMatches = typeMatch ? typeMatch.circuitIds : [];

        const circuitTypeMatchesMostRecent = currentSeasonRaceResults.filter(
          (result) => circuitTypeMatches.includes(result.Circuit.circuitId)
        );

        setCurrentSeasonCircuitTypeMatches(circuitTypeMatchesMostRecent);
      };
      getCurrentSeasonTypeMatches(nextRaceType);
    };
  }, [currentSeasonRaceResults, nextRaceType]);
  
  useEffect(() => {
    if (currentSeasonCircuitTypeMatches.length >= 5) {
      const results = currentSeasonCircuitTypeMatches.slice(-5);
      setNextRaceTypeHistory(results);
    } else if (currentSeasonCircuitTypeMatches.length < 5) {
        function getLastSeasonRaceResults() {
          fetchPreviousSeasonRaceResults().then((results) =>
            setPreviousSeasonRaceResults(results)
          );
        }
        setTimeout(getLastSeasonRaceResults(), 1000);

        const previousSeasonTypeMatch = circuitTypes.find(
          (type) => type.circuitType === nextRaceType
        );
        const previousSeasonsCircuitTypeMatches = previousSeasonTypeMatch
          ? previousSeasonTypeMatch.circuitIds
          : [];
        const previousSeasonsCircuitTypeMatchesMostRecent =
          previousSeasonRaceResults.filter((result) =>
            previousSeasonsCircuitTypeMatches.includes(
              result.Circuit.circuitId
            )
          );
        const bothSeasonsCircuitTypeMatchesMostRecent =
            previousSeasonsCircuitTypeMatchesMostRecent.concat(
              currentSeasonCircuitTypeMatches
            );
          const results = bothSeasonsCircuitTypeMatchesMostRecent.slice(-5);
          setNextRaceTypeHistory(results);
    }
  }, [currentSeasonCircuitTypeMatches]); 
  
  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
      const raceFlags = [];
      
      async function mapFlagsToHeadings() {

        const flagHeading = {
          name: "Driver",
          lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        };

        const flags = [
          {raceName: "70th Anniversary Grand Prix", flagImage: <img id="greatBritainFlag" src="https://flagsapi.com/GB/flat/32.png" alt="British flag"></img>},
          {raceName: "Abu Dhabi Grand Prix", flagImage: <img id="UAEFlag" src="https://flagsapi.com/AE/flat/32.png" alt="United Arab Emirates flag"></img>},
          {raceName: "Australian Grand Prix", flagImage: <img id="australianFlag" src="https://flagsapi.com/AU/flat/32.png" alt="Australian flag"></img>},
          {raceName: "Austrian Grand Prix", flagImage: <img id="austrianFlag" src="https://flagsapi.com/AT/flat/32.png" alt="Austrian flag"></img>},
          {raceName: "Azerbaijan Grand Prix", flagImage: <img id="azerbaijanFlag" src="https://flagsapi.com/AZ/flat/32.png" alt="Azerbaijan flag"></img>},
          {raceName: "Bahrain Grand Prix", flagImage: <img id="bahrainFlag" src="https://flagsapi.com/BH/flat/32.png" alt="Flag of Bahrain"></img>},
          {raceName: "Belgian Grand Prix", flagImage: <img id="belgianFlag" src="https://flagsapi.com/BE/flat/32.png" alt="Belgian flag"></img>},
          {raceName: "Brazilian Grand Prix", flagImage: <img id="brazilianFlag" src="https://flagsapi.com/BR/flat/32.png" alt="Brazilian flag"></img>},
          {raceName: "Canadian Grand Prix", flagImage: <img id="canadianFlag" src="https://flagsapi.com/CA/flat/32.png" alt="Canadian flag"></img>},
          {raceName: "Chinese Grand Prix", flagImage: <img id="chineseFlag" src="https://flagsapi.com/CN/flat/32.png" alt="Chinese flag"></img>},
          {raceName: "Emilia Romagna Grand Prix", flagImage: <img id="italianFlag" src="https://flagsapi.com/IT/flat/32.png" alt="Italian flag"></img>},
          {raceName: "Spanish Grand Prix", flagImage: <img id="spanishFlag" src="https://flagsapi.com/ES/flat/32.png" alt="Spanish flag"></img>},
          
          //flags api doesn't have EU flag. Using AZE flag for now, but need to look elsewhere if EUR header is needed
          {raceName: "European Grand Prix", flagImage: <img id="azerbaijanFlag" src="https://flagsapi.com/AZ/flat/32.png" alt="Azerbaijan flag"></img>},
          
          {raceName: "British Grand Prix", flagImage: <img id="greatBritainFlag" src="https://flagsapi.com/GB/flat/32.png" alt="British flag"></img>},
          {raceName: "Hungarian Grand Prix", flagImage: <img id="hungarianFlag" src="https://flagsapi.com/HU/flat/32.png" alt="Hungarian flag"></img>},
          {raceName: "Italian Grand Prix", flagImage: <img id="italianFlag" src="https://flagsapi.com/IT/flat/32.png" alt="Italian flag"></img>},
          {raceName: "Japanese Grand Prix", flagImage: <img id="japaneseFlag" src="https://flagsapi.com/JP/flat/32.png" alt="Japanese flag"></img>},
          {raceName: "Las Vegas Grand Prix", flagImage: <img id="USAFlag" src="https://flagsapi.com/US/flat/32.png" alt="American flag"></img>},
          {raceName: "Mexican Grand Prix", flagImage: <img id="mexicanFlag" src="https://flagsapi.com/MX/flat/32.png" alt="Mexican flag"></img>},
          {raceName: "Mexico City Grand Prix", flagImage: <img id="mexicanFlag" src="https://flagsapi.com/MX/flat/32.png" alt="Mexican flag"></img>},
          {raceName: "Miami Grand Prix", flagImage: <img id="USAFlag" src="https://flagsapi.com/US/flat/32.png" alt="American flag"></img>},
          {raceName: "Monaco Grand Prix", flagImage: <img id="monacoFlag" src="https://flagsapi.com/MC/flat/32.png" alt="Flag of Monaco"></img>},
          {raceName: "Dutch Grand Prix", flagImage: <img id="dutchFlag" src="https://flagsapi.com/NL/flat/32.png" alt="Dutch flag"></img>},
          {raceName: "Qatar Grand Prix", flagImage: <img id="qatarFlag" src="https://flagsapi.com/QA/flat/32.png" alt="Flag of Qatar"></img>},
          {raceName: "Saudi Arabian Grand Prix", flagImage: <img id="saudiArabianFlag" src="https://flagsapi.com/SA/flat/32.png" alt="Saudi Arabian flag"></img>},
          {raceName: "Singapore Grand Prix", flagImage: <img id="singaporeFlag" src="https://flagsapi.com/SG/flat/32.png" alt="Flag of Singapore"></img>},
          {raceName: "Sakhir Grand Prix", flagImage: <img id="bahrainFlag" src="https://flagsapi.com/BH/flat/32.png" alt="Flag of Bahrain"></img>},
          {raceName: "San Marino Grand Prix", flagImage: <img id="sanMarinoFlag" src="https://flagsapi.com/SM/flat/32.png" alt="Flag of San Marino"></img>},
          {raceName: "São Paulo Grand Prix", flagImage: <img id="brazilianFlag" src="https://flagsapi.com/BR/flat/32.png" alt="Brazilian flag"></img>},
          {raceName: "Styrian Grand Prix", flagImage: <img id="austrianFlag" src="https://flagsapi.com/AT/flat/32.png" alt="Austrian flag"></img>},
          {raceName: "United States Grand Prix", flagImage: <img id="USAFlag" src="https://flagsapi.com/US/flat/32.png" alt="American flag"></img>},
        ];

        for (let i = 0; i < flagHeading.lastFiveRaces.length; i++) {
          flagHeading.lastFiveRaces[i] = lastFiveRaceResults[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.lastFiveRaces[i] == flags[z].raceName) {
              flagHeading.lastFiveRaces[i] = flags[z].flagImage
            }
          }
        }

        for (let i = 0; i < flagHeading.nextRaceResults.length; i++) {
          flagHeading.nextRaceResults[i] = nextRaceHistory[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.nextRaceResults[i] == flags[z].raceName) {
              flagHeading.nextRaceResults[i] = flags[z].flagImage
            }
          }
        }

        for (let i = 0; i < flagHeading.nextRaceTypeResults.length; i++) {
          flagHeading.nextRaceTypeResults[i] = nextRaceTypeHistory[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.nextRaceTypeResults[i] == flags[z].raceName) {
              flagHeading.nextRaceTypeResults[i] = flags[z].flagImage
            }
          }
        }

        raceFlags.push(flagHeading);
        console.log(flagHeading);
        setFlagHeadingsContent(raceFlags);
      }
      
      mapFlagsToHeadings();
    };
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
      const raceNames = [];
      
      async function mapRaceNamesToHeadings() {

        const tableHeading = {
          name: "Driver",
          lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        };

        for (let i = 0; i < tableHeading.lastFiveRaces.length; i++) {
          tableHeading.lastFiveRaces[i] = lastFiveRaceResults[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.lastFiveRaces[i] == raceTitles[z].raceName) {
              tableHeading.lastFiveRaces[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.lastFiveRaces[i] = tableHeading.lastFiveRaces[i].concat(" ", lastFiveRaceResults[i].season)
        }

        for (let i = 0; i < tableHeading.nextRaceResults.length; i++) {
          tableHeading.nextRaceResults[i] = nextRaceHistory[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.nextRaceResults[i] == raceTitles[z].raceName) {
              tableHeading.nextRaceResults[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.nextRaceResults[i] = tableHeading.nextRaceResults[i].concat(" ", nextRaceHistory[i].season)
        }

        for (let i = 0; i < tableHeading.nextRaceTypeResults.length; i++) {
          tableHeading.nextRaceTypeResults[i] = nextRaceTypeHistory[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.nextRaceTypeResults[i] == raceTitles[z].raceName) {
              tableHeading.nextRaceTypeResults[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.nextRaceTypeResults[i] = tableHeading.nextRaceTypeResults[i].concat(" ", nextRaceTypeHistory[i].season)
        }

        raceNames.push(tableHeading);
        console.log(tableHeading);
        setTableHeadingsContent(raceNames);
      }
      
      mapRaceNamesToHeadings();
    };
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect(() => {
    console.log(lastFiveRaceResults);
    console.log(nextRaceHistory);
    console.log(nextRaceTypeHistory);
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory])

  useEffect(() => {
    const driverData = [];
    /**
     * This function creates a variable called driver - each driver has props that are updated based on three metrics:
     * 1. Results from the last five races.
     * 2. Results from the next five races held at the next circuit.
     * 3. Results from the last five races held circuits that have the same circuit type as the next circuit.
     * If a driver didn't participate in a particular race, "N/A" will populate.
     * The lastName prop is used to match individual race finishing positions with each driver. (I.e. The driver who
     * finished 3rd in the last race has the last name "Hamilton", so Lewis Hamilton finished 3rd in the last race.)
     * After each driver's props are fully updated, the driver object is pushed to an empty array called "driverData".
     * The driverData array is used to set the state of driverTableData.
     */
    async function mapNamesAndResultsToDrivers() {
      names.forEach((name, i) => {
        const driver = {
          name: names[i],
          lastName: names[i].substring(names[i].indexOf(" ") + 1),
          lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        };

        for (let z = 0; z < lastFiveRaceResults.length; z++) {
          for (let i = 0; i < lastFiveRaceResults[0].Results.length; i++) {
            if (
              lastFiveRaceResults[z].Results[i].Driver.familyName ===
              driver.lastName
            ) {
              driver.lastFiveRaces[z] =
                lastFiveRaceResults[z].Results[i].positionText;
            }
          }
        }

        for (let z = 0; z < nextRaceHistory.length; z++) {
          for (let i = 0; i < nextRaceHistory[0].Results.length; i++) {
            if (
              nextRaceHistory[z].Results[i]?.Driver.familyName ===
              driver.lastName
            ) {
              driver.nextRaceResults[z] =
                nextRaceHistory[z].Results[i].positionText;
            }
          }
        }

        for (let z = 0; z < nextRaceTypeHistory?.length; z++) {
          for (let i = 0; i < nextRaceTypeHistory[0].Results.length; i++) {
            if (
              nextRaceTypeHistory[z].Results[i].Driver.familyName ===
              driver.lastName
            ) {
              driver.nextRaceTypeResults[z] =
                nextRaceTypeHistory[z].Results[i].positionText;
            }
          }
        }

        driverData.push(driver);
      });

      setDriverTableData(driverData);
    }

    mapNamesAndResultsToDrivers();
  }, [lastFiveRaceResults, names, nextRaceHistory, nextRaceTypeHistory]);

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
    setFlagHeadings(
      flagHeadingsContent.map((flagHeading) =>
        formatRow(
          flagHeading.name,
          flagHeading.lastFiveRaces[0],
          flagHeading.lastFiveRaces[1],
          flagHeading.lastFiveRaces[2],
          flagHeading.lastFiveRaces[3],
          flagHeading.lastFiveRaces[4],
          flagHeading.nextRaceResults[0],
          flagHeading.nextRaceResults[1],
          flagHeading.nextRaceResults[2],
          flagHeading.nextRaceResults[3],
          flagHeading.nextRaceResults[4],
          flagHeading.nextRaceTypeResults[0],
          flagHeading.nextRaceTypeResults[1],
          flagHeading.nextRaceTypeResults[2],
          flagHeading.nextRaceTypeResults[3],
          flagHeading.nextRaceTypeResults[4]
        )
      )
    );
  }, [flagHeadingsContent]);

  useEffect(() => {
    setTableHeadings(
      tableHeadingsContent.map((tableHeading) =>
        formatRow(
          tableHeading.name,
          tableHeading.lastFiveRaces[0],
          tableHeading.lastFiveRaces[1],
          tableHeading.lastFiveRaces[2],
          tableHeading.lastFiveRaces[3],
          tableHeading.lastFiveRaces[4],
          tableHeading.nextRaceResults[0],
          tableHeading.nextRaceResults[1],
          tableHeading.nextRaceResults[2],
          tableHeading.nextRaceResults[3],
          tableHeading.nextRaceResults[4],
          tableHeading.nextRaceTypeResults[0],
          tableHeading.nextRaceTypeResults[1],
          tableHeading.nextRaceTypeResults[2],
          tableHeading.nextRaceTypeResults[3],
          tableHeading.nextRaceTypeResults[4]
        )
      )
    );
  }, [tableHeadingsContent]);

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
      <DenseTable data1={flagHeadings} data2={tableHeadings} data3={racerData}/>
    </>
  );
}
