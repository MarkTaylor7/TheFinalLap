import React, {useEffect, useState} from 'react';
import {fetchData} from './utilities.js'


const DriverList = () => {
    const [driverList, setDriverList] = useState([]);

    useEffect(() => {
        const url = "http://ergast.com/api/f1/2023/drivers.json";

        fetchData();
        
    },[]);

    return (
        <div>
            <p>{driverList.map((nameOfDriver,i) => <li key={'nameOfDriver'+ i}>{nameOfDriver}</li>)}</p>
        </div>
    );
    
};


export default DriverList;

