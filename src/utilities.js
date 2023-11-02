export async function getDriverData(driverName) {
  const url = `http://ergast.com/api/f1/2023/drivers/${driverName}.json`;

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
  const url = "http://ergast.com/api/f1/2023/drivers.json";
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
  const url = "http://ergast.com/api/f1/current/driverStandings.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const standings =
      json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const results = standings.map(function (element) {
      return `${element.Driver.givenName} ${element.Driver.familyName}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchLastRaceResults() {
  const url = "http://ergast.com/api/f1/current/last/results.json";
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
  const url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const nextRaceAllEvents = json.MRData.RaceTable.Races;
    const reverseNextRaceAllEvents = nextRaceAllEvents.reverse();
    const nextRaceLastFiveEventsReverse = reverseNextRaceAllEvents.slice(
      0,
      5
    );
    const nextRaceLastFiveEvents = nextRaceLastFiveEventsReverse.reverse();
    return nextRaceLastFiveEvents;
  } catch (error) {
    console.log("error", error);
  }
}

