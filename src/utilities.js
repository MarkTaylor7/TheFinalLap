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
            return `${element.positionText}`;
        });
        return (results);
    
    } catch (error) {
    console.log("error", error);
    }

    return null;
};

export async function fetchCurrentSeasonRaceResults() {
    const url = "https://ergast.com/api/f1/2023/results.json?limit=500"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const allRaces = json.MRData.RaceTable.Races;
        console.log(allRaces);
        return allRaces;
    } catch (error) {
        console.log("error", error);
        }
    
        return null;
};

export async function fetchEventList() {
    const url = "https://ergast.com/api/f1/current.json"
    try {
        const response = await fetch(url);
        const json = await response.json();
        const results = json.MRData.RaceTable.Races;
        console.log(results);
        return results;
        //const today = new Date();
        //const jsonDateAndTime = today.toJSON();
        //const splitJsonDateAndTime = jsonDateAndTime.split("T") 
        //const jsonDate = splitJsonDateAndTime[0];
        //console.log(jsonDateAndTime);
        //console.log(new Date(jsonDate).toUTCString());
        //console.log(jsonDate);
        //console.log(json);
        //for (let i = 0; i < 22; i++ ) {
            //const race = eventList[0];
            //const raceDate = race.date;
            //console.log(raceDate);
            //if (raceDate < today) {
                //eventList.filter(race) //filter method is the way to go. Or maybe use switch statement?
            //}
        //};
    } catch (error) {
        console.log("error", error);
        }
    
        return null;
};




