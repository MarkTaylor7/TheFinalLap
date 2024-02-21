import { allSeasonsArray, emptyRaceObject } from "./consts";

export async function getDriverData(driverName) {
  const url = `https://ergast.com/api/f1/2023/drivers/${driverName}.json`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const rawDriverData = json.MRData.DriverTable.Drivers[0];
    return rawDriverData;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchAllDriverNames() {
  const url = "https://ergast.com/api/f1/2023/drivers.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const rawDriverList = json.MRData.DriverTable.Drivers;
    const results = rawDriverList.map(function (element) {
      return `${element.givenName} ${element.familyName}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchCurrentStandings() {
  const url = "https://ergast.com/api/f1/current/driverStandings.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const results = json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchLastRaceResults() {
  const url = "https://ergast.com/api/f1/current/last/results.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const raceResults = json.MRData.RaceTable.Races[0].Results;
    const results = raceResults.map(function (element) {
      return `${element.positionText}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchCurrentSeasonRaceResults() {
  const url = "https://ergast.com/api/f1/current/results.json?limit=500";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const allRaces = json.MRData.RaceTable.Races;
    return allRaces;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}


//Will need to replace "2022" with "2023" when 2024 season starts
export async function fetchPreviousSeasonRaceResults() {
  const url = "https://ergast.com/api/f1/2022/results.json?limit=500";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const allRaces = json.MRData.RaceTable.Races;
    return allRaces;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchEventList() {
  const url = "https://ergast.com/api/f1/current.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const results = json.MRData.RaceTable.Races;
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

/**
     * This function fetches the full race results for the last 5 events held at the next race circuit
     * (typically the last 5 years, with some exceptions due to COVID)
     */
export async function fetchNextTrackData(nextRace) {
  let url;
  
  switch (nextRace) {
    case "monaco":
    case "monza":
    case "silverstone": 
    case "spa":
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000&offset=1000`;
      break;
    case "hungaroring":
    case "interlagos":
    case "red_bull_ring":
    case "villeneuve":
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000&offset=600`;
      break;
    default:
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000`;
  };

  try {
    const response = await fetch(url);
    const json = await response.json();
    const nextRaceAllEvents = json.MRData.RaceTable.Races;
    if (nextRaceAllEvents.length > 4) {
      const reverseNextRaceAllEvents = nextRaceAllEvents.reverse();
      const nextRaceLastFiveEventsReverse = reverseNextRaceAllEvents.slice(0, 5);
      const nextRaceLastFiveEvents = nextRaceLastFiveEventsReverse.reverse();
      return nextRaceLastFiveEvents;
      } else {
        const reverseNextRaceAllEvents = nextRaceAllEvents.reverse();
        if (reverseNextRaceAllEvents.length < 5) {
        reverseNextRaceAllEvents.push(emptyRaceObject, emptyRaceObject, emptyRaceObject, emptyRaceObject);
          if (reverseNextRaceAllEvents.length > 5) {
            reverseNextRaceAllEvents.length = 5;
            const completeNextRaceAllEvents = reverseNextRaceAllEvents.reverse();
            const nextRaceLastFiveEvents = completeNextRaceAllEvents;
            return nextRaceLastFiveEvents;
              } else {
                const completeNextRaceAllEvents = reverseNextRaceAllEvents.reverse();
                const nextRaceLastFiveEvents = completeNextRaceAllEvents;
                return nextRaceLastFiveEvents;
              }
        }

    }} catch (error) {
      console.log("error", error);
    }
}

export function getDriverAverages(driverTableData, allCareerData) {
  for (let n = 0; n < driverTableData.length; n++) {
    for (let y = 0; y < allCareerData.length; y++) {
      if (driverTableData[n].driverId == allCareerData[y].MRData.RaceTable.driverId) {
        driverTableData[n].allRaceResults = allCareerData[y].MRData.RaceTable.Races;
          for (let i = 0; i < driverTableData[n].allRaceResults.length; i++) {
            for (let z = 0; z < driverTableData[n].careerData.raceResultsBySeason.length; z++) {
              if (driverTableData[n].allRaceResults[i].season == driverTableData[n].careerData.raceResultsBySeason[z].season) {
                driverTableData[n].careerData.raceResultsBySeason[z].raceResults.push(driverTableData[n].allRaceResults[i].Results[0].positionText);
                driverTableData[n].careerData.raceResultsBySeason[z].raceFinishes = driverTableData[n].careerData.raceResultsBySeason[z].raceResults.filter(Number);
                  let nums = driverTableData[n].careerData.raceResultsBySeason[z].raceFinishes.map(function(str) {
                    return parseInt(str)
                  });
              
                  function calculateAverage(array) {
                  let total = 0;
                  let count = 0;
                  array.forEach(function(item, index) {
                    total += item;
                    count++;
              
                  });
                  return total/count;
                  }
                  driverTableData[n].careerData.raceResultsBySeason[z].meanRaceFinish = calculateAverage(nums);
            
              };
            };  
          };
      
      };
    }; 
  };
};

export function matchAveragesWithTableResults(driverTableData, lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory) {
  for (let x = 0; x < driverTableData.length; x++) {
    for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
      for (let z = 0; z < lastFiveRaceResults.length; z++) {
        if ((driverTableData[x].careerData.raceResultsBySeason[y].season == lastFiveRaceResults[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4)) {
          driverTableData[x].tableAverages.lastFiveRaces[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
        } else if ((driverTableData[x].careerData.raceResultsBySeason[y].season == lastFiveRaceResults[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length <= 4)) {
          driverTableData[x].tableAverages.lastFiveRaces[z] = "average"
        }
      };
    };
  };

  for (let x = 0; x < driverTableData.length; x++) {
    for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
      for (let z = 0; z < nextRaceHistory.length; z++) {
        if ((driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceHistory[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4)) {
          driverTableData[x].tableAverages.nextRaceResults[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
        } else if ((driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceHistory[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length <= 4)) {
          driverTableData[x].tableAverages.nextRaceResults[z] = "average"
        }
      };
    }
  };
  
  for (let x = 0; x < driverTableData.length; x++) {
    for (let y = 0; y < driverTableData[x].careerData.raceResultsBySeason.length; y++) {
      for (let z = 0; z < nextRaceTypeHistory.length; z++) {
        if ((driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceTypeHistory[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length > 4)) {
          driverTableData[x].tableAverages.nextRaceTypeResults[z] = driverTableData[x].careerData.raceResultsBySeason[y].meanRaceFinish
        } else if ((driverTableData[x].careerData.raceResultsBySeason[y].season == nextRaceTypeHistory[z].season) && (driverTableData[x].careerData.raceResultsBySeason[y].raceFinishes.length <= 4)) {
          driverTableData[x].tableAverages.nextRaceTypeResults[z] = "average"
        }
      }
    }
  };
};

export function rateTableResults(driverTableData) {
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
                            } else if (driverTableData[x].lastFiveRaces[y].positionText != "N/A" && driverTableData[x].tableAverages.lastFiveRaces[y] != "N/A") {
                              driverTableData[x].tableAverages.lastFiveRaces[y] = "average";
                              };
      };
  };

  for (let x = 0; x < driverTableData.length; x++) {
    for (let y = 0; y < driverTableData[x].nextRaceResults.length; y++) {
      
      const excellentResult = driverTableData[x].tableAverages.nextRaceResults[y] - 5;
      const greatResult = driverTableData[x].tableAverages.nextRaceResults[y] - 2.5;
      const aboveAverageResult = driverTableData[x].tableAverages.nextRaceResults[y] - 1.5;
      const belowAverageResult = driverTableData[x].tableAverages.nextRaceResults[y] + 1.5;
      const badResult = driverTableData[x].tableAverages.nextRaceResults[y] + 2.5;
      const veryBadResult = driverTableData[x].tableAverages.nextRaceResults[y] + 5;

      if (driverTableData[x].nextRaceResults[y].positionText == "D" ||
          driverTableData[x].nextRaceResults[y].positionText == "R" ||
          driverTableData[x].nextRaceResults[y].positionText == "W") {
            driverTableData[x].tableAverages.nextRaceResults[y] = "no finish";
          } else if (driverTableData[x].nextRaceResults[y].positionText == "N/A") {
              driverTableData[x].tableAverages.nextRaceResults[y] = "N/A";
            } else if (driverTableData[x].nextRaceResults[y].positionText == "1") {
              driverTableData[x].tableAverages.nextRaceResults[y] = "win";
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
                            } else if (driverTableData[x].nextRaceResults[y].positionText != "N/A" && driverTableData[x].tableAverages.nextRaceResults[y] != "N/A") {
                              driverTableData[x].tableAverages.nextRaceResults[y] = "average";
                              };
                            
      };
  };
  
  for (let x = 0; x < driverTableData.length; x++) {
    for (let y = 0; y < driverTableData[x].nextRaceTypeResults.length; y++) {
      
      const excellentResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 5;
      const greatResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 2.5;
      const aboveAverageResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] - 1.5;
      const belowAverageResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 1.5;
      const badResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 2.5;
      const veryBadResult = driverTableData[x].tableAverages.nextRaceTypeResults[y] + 5;

      if (driverTableData[x].nextRaceTypeResults[y].positionText == "D" ||
          driverTableData[x].nextRaceTypeResults[y].positionText == "R" ||
          driverTableData[x].nextRaceTypeResults[y].positionText == "W") {
            driverTableData[x].tableAverages.nextRaceTypeResults[y] = "no finish";
          } else if (driverTableData[x].nextRaceTypeResults[y].positionText == "N/A") {
              driverTableData[x].tableAverages.nextRaceTypeResults[y] = "N/A";
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
                            } else if (driverTableData[x].nextRaceTypeResults[y].positionText != "N/A" && driverTableData[x].tableAverages.nextRaceTypeResults[y] != "N/A") {
                              driverTableData[x].tableAverages.nextRaceTypeResults[y] = "average";
                              };
      };
  };
};

export function getBackgroundColor(data3) {
  let color;
  switch (data3) {
    case "win":
      color = "#ffeb3b";
      break;
    case "excellent":
      color = "#4caf50";
      break;
    case "great":
      color = "#81c784";
      break;
    case "above-avg":
      color = "#c8e6c9";
      break;
    case "below-avg":
      color = "#ffcdd2";
      break;
    case "bad":
      color = "#e57373";
      break;
    case "very bad":
      color = "#f44336";
      break;
    case "no finish":
      color = "#212121";
      break;
    case "N/A":
      color = "#ffffff";
      break;
    case "Max Verstappen":
    case "Sergio Pérez":
      color = "#0d202f";
      break;
    case "Lewis Hamilton":
    case "George Russell":
      color = "#6CD3BF";
      break;
    case "Charles Leclerc":
    case "Carlos Sainz":
      color = "#F91536";
      break;
    case "Lando Norris":
    case "Oscar Piastri":
      color = "#F58020";
      break;
    case "Fernando Alonso":
    case "Lance Stroll":
      color = "#358C75";
      break;
    case "Pierre Gasly":
    case "Esteban Ocon":
      color = "#f5b6c7";
      break;
    case "Alexander Albon":
    case "Logan Sargeant":
      color = "#37BEDD";
      break;
    case "Yuki Tsunoda":
    case "Daniel Ricciardo":
    case "Liam Lawson":
    case "Nyck de Vries":
      color = "#1533cc";
      break; 
    case "Valtteri Bottas":
    case "Guanyu Zhou":
      color = "#53fc18";
      break;
    case "Nico Hülkenberg":
    case "Kevin Magnussen":
      color = "#B6BABD";
      break;
    default:
      color = "#ffffff";
  };

  return color        
};

export function getColor(data3) {
  let color;
  switch (data3) {
    case "excellent":
    case "very bad":
    case "no finish":
    case "N/A":
    case "Max Verstappen":
    case "Sergio Pérez":
    case "Charles Leclerc":
    case "Carlos Sainz":
    case "Fernando Alonso":
    case "Lance Stroll":
    case "Yuki Tsunoda":
    case "Daniel Ricciardo":
    case "Liam Lawson":
    case "Nyck de Vries":
      color = "#ffffff";
      break;
    default:
      color = "#212121";
  };

  return color
};

export async function createSeasonResultsProps() {
  const array = [];
  for (let x = 0; x < allSeasonsArray.length; x++) {
    let newSeason = {
      season: allSeasonsArray[x],
      raceResults: [],
      raceFinishes: [],
      meanRaceFinish: ""
    }
    array.push(newSeason);
  }
  return array;
};

export function formatDate(inputDate) {
  const dateArray = inputDate.split("-");
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];
  const formattedDate = month + "." + day + "." + year;

  return formattedDate;
}