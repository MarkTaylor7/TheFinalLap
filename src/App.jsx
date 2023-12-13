import { useEffect, useState } from "react";
import DenseTable from "./DenseTable";
import {
  fetchCurrentSeasonRaceResults,
  fetchCurrentStandings,
  fetchEventList,
  fetchNextTrackData,
  fetchPreviousSeasonRaceResults,
  getDriverAverages,
  matchAveragesWithTableResults,
  rateTableResults,
  createSeasonResultsProps
} from "./utilities";

import { circuitTypes, raceTitles, allCareerData, allSeasonsArray } from "./consts";
import { flags } from "./Flags";


export default function App() {
  const [standings, setStandings] = useState([]);
  const [names, setNames] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
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
  const [raceRatings, setRaceRatings] = useState([]);
  const [lastFiveRacesDataFetched, setLastFiveRacesDataFetched] = useState(false);
  const [nextRaceDataFetched, setNextRaceDataFetched] = useState(false);
  const [nextRaceTypeDataFetched, setNextRaceTypeDataFetched] = useState(false);
  
  // Getting driver names, current season results and events list
  useEffect(() => {
    fetchCurrentStandings().then((results) => setStandings(results));

    fetchCurrentSeasonRaceResults().then((results) =>
      setCurrentSeasonRaceResults(results)
    );

    fetchEventList().then((results) => setEventList(results));
  }, []);

  useEffect (() => {
    const fullNames = standings.map(function (element) {
      return `${element.Driver.givenName} ${element.Driver.familyName}`;
    });
    setNames(fullNames);

    const driverIds = standings.map(function (element) {
      return `${element.Driver.driverId}`;
    });
    setDriverIds(driverIds);
  }, [standings]);

  // Update last five race results
  useEffect(() => {
    const lastFiveRaceResults = currentSeasonRaceResults
      //making copy for reverse
      .slice()
      .reverse()
      .slice(0, 5)
      .reverse();
    setLastFiveRaceResults(lastFiveRaceResults);
    setLastFiveRacesDataFetched(true);
  }, [currentSeasonRaceResults]);

  // Set next race data
  useEffect(() => {
    /*May need to add an if statement to handle situations when lastFiveRaceResults.length <5. See state setter
    function for nextRaceTypeHistory*/
    if (lastFiveRaceResults.length === 5) {
      let nextCircuitId = "bahrain";
      let nextCircuitType;
      /*Code below is temporarily commented out until the API updates its current season as "2024". Once update
       occurs, enable code below and remove "= "bahrain"" from let nextCircuitId. This will re-activate automated 
       selection of nextCircuitId.
      let lastRound = Number(lastFiveRaceResults[4]?.round);
      let nextRound = (lastRound += 1);
      for (let i = 0; i < eventList.length; i++) {
        if (Number(eventList[i].round) === nextRound) {
          nextCircuitId = eventList[i].Circuit.circuitId;
        }
      }
      */
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
    setNextRaceDataFetched(true);
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
          setNextRaceTypeDataFetched(true);
    }
  }, [currentSeasonCircuitTypeMatches]); 
  
  useEffect(() => {
    console.log(lastFiveRaceResults), 
    console.log(nextRaceHistory),
    console.log(nextRaceTypeHistory)
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

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
          lastFiveRacesReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResultsReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResultsReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
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

        for (let i = 0; i < tableHeading.lastFiveRacesReports.length; i++) {
          const season = lastFiveRaceResults[i].season;
          const rawRaceName = lastFiveRaceResults[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.lastFiveRacesReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };

        for (let i = 0; i < tableHeading.nextRaceResultsReports.length; i++) {
          const season = nextRaceHistory[i].season;
          const rawRaceName = nextRaceHistory[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.nextRaceResultsReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };

        for (let i = 0; i < tableHeading.nextRaceTypeResultsReports.length; i++) {
          const season = nextRaceTypeHistory[i].season;
          const rawRaceName = nextRaceTypeHistory[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.nextRaceTypeResultsReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };


        console.log(tableHeading.lastFiveRacesReports)
        raceNames.push(tableHeading);
        setTableHeadingsContent(raceNames);
      }
      
      mapRaceNamesToHeadings();
    };
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
     
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
            driverId: driverIds[i],
            lastFiveRaces: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            nextRaceResults: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            nextRaceTypeResults: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            tableAverages: {
              lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
              nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"], 
              nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"]
            },
            allRaceResults: [],
            careerData: {
              raceResultsBySeason: [
                {season: 2005,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2006,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2015,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2016,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2017,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2018,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2019,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2020,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2021,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2022,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2023,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                }
              ]
            }
          };

          for (let z = 0; z < lastFiveRaceResults.length; z++) {
            for (let i = 0; i < lastFiveRaceResults[0].Results.length; i++) {
              if (
                lastFiveRaceResults[z].Results[i].Driver.driverId ===
                driver.driverId
              ) {
                driver.lastFiveRaces[z] =
                  lastFiveRaceResults[z].Results[i];
              }
            }
          }

          for (let z = 0; z < nextRaceHistory.length; z++) {
            for (let i = 0; i < nextRaceHistory[0].Results.length; i++) {
              if (
                nextRaceHistory[z].Results[i]?.Driver.driverId ===
                driver.driverId
              ) {
                driver.nextRaceResults[z] =
                  nextRaceHistory[z].Results[i];
              }
            }
          }

          for (let z = 0; z < nextRaceTypeHistory?.length; z++) {
            for (let i = 0; i < nextRaceTypeHistory[0].Results.length; i++) {
              if (
                nextRaceTypeHistory[z].Results[i].Driver.driverId ===
                driver.driverId
              ) {
                driver.nextRaceTypeResults[z] =
                  nextRaceTypeHistory[z].Results[i];
              }
            }
          }
          driverData.push(driver);
        });

        setDriverTableData(driverData);
      }
      mapNamesAndResultsToDrivers();
    };

    
  }, [lastFiveRaceResults, names, nextRaceHistory, nextRaceTypeHistory]);

  useEffect (() => {
    getDriverAverages(driverTableData, allCareerData)
  }, [driverTableData]);

  useEffect (() => {
    matchAveragesWithTableResults(driverTableData, lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory)
  }, [driverTableData, lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect (() => {
    rateTableResults(driverTableData)
  }, [driverTableData]);

  useEffect (() => {
    console.log(driverTableData);
  }, [driverTableData])

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
    nextRaceType5,
    fiveRacesAgoReport,
    fourRacesAgoReport,
    threeRacesAgoReport,
    twoRacesAgoReport,
    oneRaceAgoReport,
    nextRace1Report,
    nextRace2Report,
    nextRace3Report,
    nextRace4Report,
    nextRace5Report,
    nextRaceType1Report,
    nextRaceType2Report,
    nextRaceType3Report,
    nextRaceType4Report,
    nextRaceType5Report
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
      fiveRacesAgoReport,
      fourRacesAgoReport,
      threeRacesAgoReport,
      twoRacesAgoReport,
      oneRaceAgoReport,
      nextRace1Report,
      nextRace2Report,
      nextRace3Report,
      nextRace4Report,
      nextRace5Report,
      nextRaceType1Report,
      nextRaceType2Report,
      nextRaceType3Report,
      nextRaceType4Report,
      nextRaceType5Report
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
          tableHeading.nextRaceTypeResults[4],
          tableHeading.lastFiveRacesReports[0],
          tableHeading.lastFiveRacesReports[1],
          tableHeading.lastFiveRacesReports[2],
          tableHeading.lastFiveRacesReports[3],
          tableHeading.lastFiveRacesReports[4],
          tableHeading.nextRaceResultsReports[0],
          tableHeading.nextRaceResultsReports[1],
          tableHeading.nextRaceResultsReports[2],
          tableHeading.nextRaceResultsReports[3],
          tableHeading.nextRaceResultsReports[4],
          tableHeading.nextRaceTypeResultsReports[0],
          tableHeading.nextRaceTypeResultsReports[1],
          tableHeading.nextRaceTypeResultsReports[2],
          tableHeading.nextRaceTypeResultsReports[3],
          tableHeading.nextRaceTypeResultsReports[4]
        )
      )
    );
  }, [tableHeadingsContent]);

  function formatDataRow(
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
    fiveRacesAgoRating,
    fourRacesAgoRating,
    threeRacesAgoRating,
    twoRacesAgoRating,
    oneRaceAgoRating,
    nextRace1Rating,
    nextRace2Rating,
    nextRace3Rating,
    nextRace4Rating,
    nextRace5Rating,
    nextRaceType1Rating,
    nextRaceType2Rating,
    nextRaceType3Rating,
    nextRaceType4Rating,
    nextRaceType5Rating
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
      fiveRacesAgoRating,
      fourRacesAgoRating,
      threeRacesAgoRating,
      twoRacesAgoRating,
      oneRaceAgoRating,
      nextRace1Rating,
      nextRace2Rating,
      nextRace3Rating,
      nextRace4Rating,
      nextRace5Rating,
      nextRaceType1Rating,
      nextRaceType2Rating,
      nextRaceType3Rating,
      nextRaceType4Rating,
      nextRaceType5Rating,
    };
  }

  useEffect(() => {
    setRacerData(
      driverTableData.map((driver) =>
        formatDataRow(
          driver.name,
          driver.lastFiveRaces[0].positionText,
          driver.lastFiveRaces[1].positionText,
          driver.lastFiveRaces[2].positionText,
          driver.lastFiveRaces[3].positionText,
          driver.lastFiveRaces[4].positionText,
          driver.nextRaceResults[0].positionText,
          driver.nextRaceResults[1].positionText,
          driver.nextRaceResults[2].positionText,
          driver.nextRaceResults[3].positionText,
          driver.nextRaceResults[4].positionText,
          driver.nextRaceTypeResults[0].positionText,
          driver.nextRaceTypeResults[1].positionText,
          driver.nextRaceTypeResults[2].positionText,
          driver.nextRaceTypeResults[3].positionText,
          driver.nextRaceTypeResults[4].positionText,
          driver.tableAverages.lastFiveRaces[0],
          driver.tableAverages.lastFiveRaces[1],
          driver.tableAverages.lastFiveRaces[2],
          driver.tableAverages.lastFiveRaces[3],
          driver.tableAverages.lastFiveRaces[4],
          driver.tableAverages.nextRaceResults[0],
          driver.tableAverages.nextRaceResults[1],
          driver.tableAverages.nextRaceResults[2],
          driver.tableAverages.nextRaceResults[3],
          driver.tableAverages.nextRaceResults[4],
          driver.tableAverages.nextRaceTypeResults[0],
          driver.tableAverages.nextRaceTypeResults[1],
          driver.tableAverages.nextRaceTypeResults[2],
          driver.tableAverages.nextRaceTypeResults[3],
          driver.tableAverages.nextRaceTypeResults[4]
        )
      ),
    );
    
  }, [driverTableData]);

  useEffect(() => {
    console.log(racerData)
  }, [racerData])

  return (
    <>
      <DenseTable data1={flagHeadings} data2={tableHeadings} data3={racerData} data4={[lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]}
      boolean1={lastFiveRacesDataFetched} boolean2={nextRaceDataFetched} boolean3={nextRaceTypeDataFetched}/>
    </>
  );
}
