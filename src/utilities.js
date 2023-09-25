const url = "http://ergast.com/api/f1/2023/drivers.json";

async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    const rawDriverList = json.MRData.DriverTable.Drivers;
    console.log(rawDriverList)
}

export {fetchData};