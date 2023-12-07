import { useEffect, useState } from "react";
import DenseTable from "./DenseTable";
import {
  fetchCurrentSeasonRaceResults,
  fetchCurrentStandings,
  fetchEventList,
  fetchNextTrackData,
  fetchPreviousSeasonRaceResults,
  getDriverAverages
} from "./utilities";

import { circuitTypes, raceTitles, allCareerData } from "./consts";
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

  useEffect(() => {
    console.log(lastFiveRaceResults)
  }, [lastFiveRaceResults]);

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
    function matchAveragesWithTableResults() {
      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
          for (let z = 0; z < lastFiveRaceResults.length; z++) {
            if (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4 ) {
              if (driverTableData[x].careerData.raceResultsBySeason[y].season == lastFiveRaceResults[z].season) {
                driverTableData[x].tableAverages.lastFiveRaces[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
              };
            }
          };
        };
      };

      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
          for (let z = 0; z < nextRaceHistory.length; z++) {
            if (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4) {
              if (driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceHistory[z].season) {
                  driverTableData[x].tableAverages.nextRaceResults[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
              };
            };
          };
        };
      };

      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
          for (let z = 0; z < nextRaceTypeHistory.length; z++) {
            while (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4) {
              if (driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceTypeHistory[z].season) {
                driverTableData[x].tableAverages.nextRaceTypeResults[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
              };
            };
          };
        };
      };
    };
    matchAveragesWithTableResults();
  }, [driverTableData]);

  useEffect (() => {
    function rateTableResults() {
      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].lastFiveRaces.length; y++) {
          
          const excellentResult = driverTableData[x].tableAverages.lastFiveRaces[y] - 5;
          const greatResult = driverTableData[x].tableAverages.lastFiveRaces[y] - 2.5;
          const aboveAverageResult = driverTableData[x].tableAverages.lastFiveRaces[y] - 1.5;
          const belowAverageResult = driverTableData[x].tableAverages.lastFiveRaces[y] + 1.5;
          const badResult = driverTableData[x].tableAverages.lastFiveRaces[y] + 2.5;
          const veryBadResult = driverTableData[x].tableAverages.lastFiveRaces[y] + 5;


          if (driverTableData[x].lastFiveRaces[y].positionText == "D" ||
              driverTableData[x].lastFiveRaces[y].positionText == "R" ||
              driverTableData[x].lastFiveRaces[y].positionText == "W") {
                driverTableData[x].tableAverages.lastFiveRaces[y] = "no finish";
              } else if (driverTableData[x].lastFiveRaces[y].positionText == "N/A") {
                driverTableData[x].tableAverages.lastFiveRaces[y] = "N/A";
                } else if (driverTableData[x].lastFiveRaces[y].positionText == "1") {
                  driverTableData[x].tableAverages.lastFiveRaces[y] = "win";
                  } else if (driverTableData[x].lastFiveRaces[y].positionText <= excellentResult) {
                      driverTableData[x].tableAverages.lastFiveRaces[y] = "excellent";
                    } else if (driverTableData[x].lastFiveRaces[y].positionText <= greatResult) {
                        driverTableData[x].tableAverages.lastFiveRaces[y] = "great";
                      } else if (driverTableData[x].lastFiveRaces[y].positionText <= aboveAverageResult) {
                          driverTableData[x].tableAverages.lastFiveRaces[y] = "above-avg";
                        } else if (driverTableData[x].lastFiveRaces[y].positionText >= veryBadResult) {
                            driverTableData[x].tableAverages.lastFiveRaces[y] = "very bad";
                          } else if (driverTableData[x].lastFiveRaces[y].positionText >= badResult) {
                              driverTableData[x].tableAverages.lastFiveRaces[y] = "bad";
                            } else if (driverTableData[x].lastFiveRaces[y].positionText >= belowAverageResult) {
                              driverTableData[x].tableAverages.lastFiveRaces[y] = "below-avg";
                              } else if (driverTableData[x].lastFiveRaces[y].positionText != "N/A") {
                                driverTableData[x].tableAverages.lastFiveRaces[y] = "average";
                                };
          };
      };

      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].nextRaceResults.length; y++) {
          
          let excellentResult = driverTableData[x].tableAverages.nextRaceResults[y] - 5;
          let greatResult = driverTableData[x].tableAverages.nextRaceResults[y] - 2.5;
          let aboveAverageResult = driverTableData[x].tableAverages.nextRaceResults[y] - 1.5;
          let belowAverageResult = driverTableData[x].tableAverages.nextRaceResults[y] + 1.5;
          let badResult = driverTableData[x].tableAverages.nextRaceResults[y] + 2.5;
          let veryBadResult = driverTableData[x].tableAverages.nextRaceResults[y] + 5;


          if (driverTableData[x].nextRaceResults[y].positionText == "D" ||
              driverTableData[x].nextRaceResults[y].positionText == "R" ||
              driverTableData[x].nextRaceResults[y].positionText == "W") {
                driverTableData[x].tableAverages.nextRaceResults[y] = "no finish";
              } else if (driverTableData[x].nextRaceResults[y].positionText == "N/A") {
                  driverTableData[x].tableAverages.nextRaceResults[y] = "N/A";
                } else if (driverTableData[x].nextRaceResults[y].positionText <= excellentResult) {
                    driverTableData[x].tableAverages.nextRaceResults[y] = "excellent";
                  } else if (driverTableData[x].nextRaceResults[y].positionText <= greatResult) {
                        driverTableData[x].tableAverages.nextRaceResults[y] = "great";
                      } else if (driverTableData[x].nextRaceResults[y].positionText <= aboveAverageResult) {
                          driverTableData[x].tableAverages.nextRaceResults[y] = "above-avg";
                        } else if (driverTableData[x].nextRaceResults[y].positionText >= veryBadResult) {
                            driverTableData[x].tableAverages.nextRaceResults[y] = "very bad";
                          } else if (driverTableData[x].nextRaceResults[y].positionText >= badResult) {
                              driverTableData[x].tableAverages.nextRaceResults[y] = "bad";
                            } else if (driverTableData[x].nextRaceResults[y].positionText >= belowAverageResult) {
                              driverTableData[x].tableAverages.nextRaceResults[y] = "below-avg";
                              } else if (driverTableData[x].nextRaceResults[y].positionText != "N/A") {
                                driverTableData[x].tableAverages.nextRaceResults[y] = "average";
                                };
                                
          };
      };
      for (let x = 0; x < driverTableData.length; x++) {
        for (let y = 0; y < driverTableData[x].nextRaceTypeResults.length; y++) {
          
          let excellentResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 5;
          let greatResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 2.5;
          let aboveAverageResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 1.5;
          let belowAverageResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 1.5;
          let badResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 2.5;
          let veryBadResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 5;


          if (driverTableData[x].nextRaceTypeResults[y].positionText == "D" ||
              driverTableData[x].nextRaceTypeResults[y].positionText == "R" ||
              driverTableData[x].nextRaceTypeResults[y].positionText == "W") {
                driverTableData[x].tableAverages.nextRaceTypeResults[y] = "no finish";
              } else if (driverTableData[x].nextRaceTypeResults[y].positionText == "1") {
                  driverTableData[x].tableAverages.nextRaceTypeResults[y] = "win";
                } else if (driverTableData[x].nextRaceTypeResults[y].positionText <= excellentResult) {
                    driverTableData[x].tableAverages.nextRaceTypeResults[y] = "excellent";
                  } else if (driverTableData[x].nextRaceTypeResults[y].positionText <= greatResult) {
                      driverTableData[x].tableAverages.nextRaceTypeResults[y] = "great";
                    } else if (driverTableData[x].nextRaceTypeResults[y].positionText <= aboveAverageResult) {
                        driverTableData[x].tableAverages.nextRaceTypeResults[y] = "above-avg";
                      } else if (driverTableData[x].nextRaceTypeResults[y].positionText >= veryBadResult) {
                          driverTableData[x].tableAverages.nextRaceTypeResults[y] = "very bad";
                        } else if (driverTableData[x].nextRaceTypeResults[y].positionText >= badResult) {
                            driverTableData[x].tableAverages.nextRaceTypeResults[y] = "bad";
                          } else if (driverTableData[x].nextRaceTypeResults[y].positionText >= belowAverageResult) {
                            driverTableData[x].tableAverages.nextRaceTypeResults[y] = "below-avg";
                            } else if (driverTableData[x].nextRaceTypeResults[y].positionText != "N/A") {
                              driverTableData[x].tableAverages.nextRaceTypeResults[y] = "average";
                              } else {driverTableData[x].tableAverages.nextRaceTypeResults[y] = "N/A";
                                };
          };
      };
    };
    rateTableResults();
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
        )
      )
    );
    
  }, [driverTableData]);

  return (
    <>
      <DenseTable data1={flagHeadings} data2={tableHeadings} data3={racerData}
      boolean1={lastFiveRacesDataFetched} boolean2={nextRaceDataFetched} boolean3={nextRaceTypeDataFetched}/>
    </>
  );
}
