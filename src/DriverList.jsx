import React, {useEffect, useState} from 'react';
import getDriverData from './utilities';



{getDriverData("hamilton")};

export default function DriverList ()  {
    const [driverList, setDriverList] = useState([]);

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
                setDriverList(namesDriverArray);
                console.log(driverList);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData()
        
        
    },[]);

    return (
        <div>
            <p>{driverList.map((nameOfDriver,i) => <li key={'nameOfDriver'+ i}>{nameOfDriver}</li>)}</p>
        </div>
    );
    
};




