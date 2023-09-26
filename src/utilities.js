export default async function getDriverData(driverName) {
    const url = "http://ergast.com/api/f1/2023/drivers/"+driverName+".json";

    try {
        const response = await fetch(url);
        const json = await response.json();
        const rawDriverData = json.MRData.DriverTable.Drivers[0];
        console.log(rawDriverData);
    } catch (error) {
        console.log("error", error);
    }
};



export async function fetchDriverData(driverName) {
    const url = "http://ergast.com/api/f1/drivers/{driverName}";
    const response = await fetch(url);
    
    
    console.log(response);
};


export async function fetchAllDriverNames() {
    const url = "http://ergast.com/api/f1/2023/drivers.json"
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        const rawDriverList = json.MRData.DriverTable.Drivers;
        console.log(rawDriverList);
        const namesDriverArray = rawDriverList.map(function(element){
            return `${element.givenName} ${element.familyName}`;
    });
        
    } catch (error) {
        console.log("error", error);
    }
};

