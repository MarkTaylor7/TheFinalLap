import React, {useEffect} from 'react';


const DriverList = () => {
    useEffect(() => {
        const url = "http://ergast.com/api/f1/2023/drivers.json";

        const fetchData = async() => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                const rawDriverList = json.MRData.DriverTable.Drivers;
                const namesDriverList = rawDriverList.map(function(element){
                    return `${element.givenName} ${element.familyName}`;
                });
                console.log(namesDriverList);
                } catch (error) {
                    console.log("error", error);
                }
        };

        fetchData();

    },[]);

    return <div></div>;
};

export default DriverList;