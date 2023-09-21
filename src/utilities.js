const fetchData = async() => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        const rawDriverList = json.MRData.DriverTable.Drivers;
        const namesDriverArray = rawDriverList.map(function(element){
            return `${element.givenName} ${element.familyName}`;
        });
        setDriverList(namesDriverArray);
        console.log(namesDriverArray);
        
    } catch (error) {
        console.log("error", error);
    }
};


export {fetchData};