export async function getDriverData(driverName) {
    const url = `http://ergast.com/api/f1/2023/drivers/${driverName}.json`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        const rawDriverData = json.MRData.DriverTable.Drivers[0];
        console.log(rawDriverData);
    } catch (error) {
        console.log("error", error);
    }
};


export async function fetchAllDriverNames() {
    const url = "http://ergast.com/api/f1/2023/drivers.json"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const rawDriverList = json.MRData.DriverTable.Drivers;
        console.log(rawDriverList);
        const results = rawDriverList.map(function(element){
            return `${element.givenName} ${element.familyName}`;
        });
        return results;
        
    } catch (error) {
        console.log("error", error);
    }

    return null;
};

export async function fetchCurrentStandings() {
    const url = "http://ergast.com/api/f1/current/driverStandings.json"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const standings = json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log(standings);
        const results = standings.map(function(element){
            //return `${//element.Driver.code}`;
            return `${element.Driver.givenName} ${element.Driver.familyName}`;
        });
        return results;

    } catch (error) {
        console.log("error", error);
    }

    return null;
};


export async function fetchLastRaceResults() {
    const url = "http://ergast.com/api/f1/current/last/results.json"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const raceResults = json.MRData.RaceTable.Races[0].Results;
        console.log(raceResults);
        const results = raceResults.map(function(element){
            //return `${element.Driver.code}`;
            return `${element.positionText}`;
        });
        return (results);
    
    } catch (error) {
    console.log("error", error);
    }

    return null;
};

export async function fetchLastFiveRaceResults() {
    const url = "https://ergast.com/api/f1/2023/results.json?limit=500"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const allRaces = json.MRData.RaceTable.Races;
        const reverseAllRaces = allRaces.reverse();
        const lastFiveResults = reverseAllRaces.slice(0, 5);
        console.log(lastFiveResults);
        //const resultsP1 = lastFiveResults.map(function(element){
            //return `${element.Results[0].Driver.code}`;
        //});
        //console.log(resultsP1);
        //const results = lastFiveResults.map(function(element){
            //return `${element.Results[0].positionText}`;
        //});
        return lastFiveResults;
    } catch (error) {
        console.log("error", error);
        }
    
        return null;
};




