import React, {useEffect} from 'react';

const DriverList = () => {
    useEffect(() => {
        const url = "http://ergast.com/api/f1/2023/drivers.json";

        const fetchData = async() => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                const rawDriverList = json.MRData.DriverTable.Drivers;
                console.log(rawDriverList);
                const givenName = json.MRData.DriverTable.Drivers[0].givenName;
                const familyName = json.MRData.DriverTable.Drivers[0].familyName;
                const driverName = givenName.concat(' ',familyName);
                console.log(driverName);
                } catch (error) {
                    console.log("error", error);
                }
        };

        fetchData();

    },[]);

    return <div></div>;
};

export default DriverList;