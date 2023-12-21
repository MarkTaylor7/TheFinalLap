import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Paper';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Oval } from "react-loader-spinner";

import { getBackgroundColor, getColor } from "./utilities";

const cellLoading = <Oval
  height={40}
  width={40}
  color="#1aa7ec"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}
/>

export default function DenseTable({data1, data2, data3, data4, data5, boolean1, boolean2, boolean3, boolean4}) {
  
  getBackgroundColor(data3);
  getColor(data3);

  const [showCluster1, setShowCluster1] = useState(true);
  const [showCluster2, setShowCluster2] = useState(true);
  const [showCluster3, setShowCluster3] = useState(true);

  const toggleCluster1 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster2(false);
    setShowCluster3(false);
  };

  const toggleCluster2 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster1(false);
    setShowCluster3(false);
  };

  const toggleCluster3 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster1(false);
    setShowCluster2(false);
  };

    return (
      boolean4 == false ? cellLoading :
        <div>
          <Button onClick={toggleCluster1}>{showCluster2 == false && showCluster3 == false ? '(selected)' : 'Recent Form'}</Button>
          <Button onClick={toggleCluster2}>{showCluster1 == false && showCluster3 == false ? '(selected)' : 'Circuit History'}</Button>
          <Button onClick={toggleCluster3}>{showCluster1 == false && showCluster2 == false ? '(selected)' : 'Circuit Type'}</Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, border: '1px solid #212121' }} size="small" aria-label="a dense table" >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1} sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121'}}></TableCell>
                  <TableCell align="center" colSpan={5} sx={{ borderRight: '1px solid #212121' }}>{showCluster1 && "RECENT FORM - THE LAST 5 RACES"}</TableCell>
                  <TableCell align="center" colSpan={5} sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}>{showCluster2 && `CIRCUIT HISTORY - RECENT RACES AT ${data4}`}</TableCell>
                  <TableCell align="center" colSpan={5} sx={{ borderRight: '1px solid #212121' }}>{showCluster3 && `CIRCUIT TYPE: ${data5} - CIRCUITS SIMILAR TO ${data4}`}</TableCell>

                </TableRow>
                  {data1.map((row, i) => (
                    <TableRow
                    key={i}  
                    >
                      <TableCell sx = {{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster1 && row.fiveRacesAgo}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster1 && row.fourRacesAgo}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster1 && row.threeRacesAgo}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster1 && row.twoRacesAgo}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderRight: '1px solid #212121' }}>{showCluster1 && row.oneRaceAgo}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{showCluster2 && row.nextRace1}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{showCluster2 && row.nextRace2}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{showCluster2 && row.nextRace3}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{showCluster2 && row.nextRace4}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}>{showCluster2 && row.nextRace5}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster3 && row.nextRaceType1}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster3 && row.nextRaceType2}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster3 && row.nextRaceType3}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster3 && row.nextRaceType4}</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{showCluster3 && row.nextRaceType5}</TableCell>
                    </TableRow>
                  ))}
                  {data2.map((row, i) => (
                    <TableRow
                    key={i} sx = {{ bgcolor: "#eeeeee" }} 
                    >
                      <TableCell sx = {{ borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}>Driver</TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.fiveRacesAgoReport}  target="_blank" rel="noopener noreferrer">{showCluster1 && row.fiveRacesAgo}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.fourRacesAgoReport} target="_blank" rel="noopener noreferrer">{showCluster1 && row.fourRacesAgo}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.threeRacesAgoReport} target="_blank" rel="noopener noreferrer">{showCluster1 && row.threeRacesAgo}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.twoRacesAgoReport} target="_blank" rel="noopener noreferrer">{showCluster1 && row.twoRacesAgo}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}><a href={row.oneRaceAgoReport} target="_blank" rel="noopener noreferrer">{showCluster1 && row.oneRaceAgo}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace1Report} target="_blank" rel="noopener noreferrer">{showCluster2 && row.nextRace1}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace2Report} target="_blank" rel="noopener noreferrer">{showCluster2 && row.nextRace2}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace3Report} target="_blank" rel="noopener noreferrer">{showCluster2 && row.nextRace3}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace4Report} target="_blank" rel="noopener noreferrer">{showCluster2 && row.nextRace4}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}><a href={row.nextRace5Report} target="_blank" rel="noopener noreferrer">{showCluster2 && row.nextRace5}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType1Report} target="_blank" rel="noopener noreferrer">{showCluster3 && row.nextRaceType1}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType2Report} target="_blank" rel="noopener noreferrer">{showCluster3 && row.nextRaceType2}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType3Report} target="_blank" rel="noopener noreferrer">{showCluster3 && row.nextRaceType3}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType4Report} target="_blank" rel="noopener noreferrer">{showCluster3 && row.nextRaceType4}</a></TableCell>
                      <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType5Report} target="_blank" rel="noopener noreferrer">{showCluster3 && row.nextRaceType5}</a></TableCell>
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {data3.map((row, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left" sx = {{ minWidth: 100, bgcolor: getBackgroundColor(row.name), color: getColor(row.name), borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }} >
                        {row.name}
                      </TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.fiveRacesAgoRating), color: getColor(row.fiveRacesAgoRating)}} align="center">{boolean1 == true ? showCluster1 && row.fiveRacesAgo : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.fourRacesAgoRating), color: getColor(row.fourRacesAgoRating) }} align="center">{boolean1 == true ? showCluster1 && row.fourRacesAgo : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.threeRacesAgoRating), color: getColor(row.threeRacesAgoRating)}} align="center">{boolean1 == true ? showCluster1 && row.threeRacesAgo : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.twoRacesAgoRating), color: getColor(row.twoRacesAgoRating) }} align="center">{boolean1 == true ? showCluster1 && row.twoRacesAgo : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.oneRaceAgoRating), color: getColor(row.oneRaceAgoRating), borderRight: '1px solid #212121' }} align="center">{boolean1 == true ? showCluster1 && row.oneRaceAgo : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace1Rating), color: getColor(row.nextRace1Rating) }} align="center">{boolean2 == true ? showCluster2 && row.nextRace1 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace2Rating), color: getColor(row.nextRace2Rating) }} align="center">{boolean2 == true ? showCluster2 && row.nextRace2 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace3Rating), color: getColor(row.nextRace3Rating) }} align="center">{boolean2 == true ? showCluster2 && row.nextRace3 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace4Rating), color: getColor(row.nextRace4Rating) }} align="center">{boolean2 == true ? showCluster2 && row.nextRace4 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace5Rating), color: getColor(row.nextRace5Rating), borderRight: '1px solid #212121' }} align="center">{boolean2 == true ? showCluster2 && row.nextRace5 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType1Rating), color: getColor(row.nextRaceType1Rating) }} align="center">{boolean3 == true ? showCluster3 && row.nextRaceType1 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType2Rating), color: getColor(row.nextRaceType2Rating) }} align="center">{boolean3 == true ? showCluster3 && row.nextRaceType2 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType3Rating), color: getColor(row.nextRaceType3Rating) }} align="center">{boolean3 == true ? showCluster3 && row.nextRaceType3 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType4Rating), color: getColor(row.nextRaceType4Rating) }} align="center">{boolean3 == true ? showCluster3 && row.nextRaceType4 : cellLoading}</TableCell>
                      <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType5Rating), color: getColor(row.nextRaceType5Rating) }} align="center">{boolean3 == true ? showCluster3 && row.nextRaceType5 : cellLoading}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
};