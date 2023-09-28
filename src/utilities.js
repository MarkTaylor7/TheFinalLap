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
        const results = rawDriverList.map(function(element){
            return `${element.givenName} ${element.familyName}`;
        
        });
        return results;
        
        
    } catch (error) {
        console.log("error", error);
    }

    return null;
};

