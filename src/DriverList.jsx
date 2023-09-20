import React, {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';

const DriverList = () => {
    const [driverList, setDriverList] = useState('');

    useEffect(() => {
        const url = "http://ergast.com/api/f1/2023/drivers.json";

        const fetchData = async() => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                const rawDriverList = json.MRData.DriverTable.Drivers;
                const namesDriverArray = rawDriverList.map(function(element){
                    return `${element.givenName} ${element.familyName}`;
                });
                console.log(namesDriverArray);
                const namesDriverList = namesDriverArray.map((nameOfDriver,i) => <li key={'nameOfDriver'+ i}>{nameOfDriver}</li>);
                setDriverList(namesDriverList);

                } catch (error) {
                    console.log("error", error);
                }
        };

        fetchData();
        
    },[]);

    return (
        <div>
            <p>{driverList}</p>
        </div>
    );
    
};


export default DriverList;

