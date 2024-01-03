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
        <div id="tableContainer">
          <Button sx={{ maxWidth: 20/100 }} onClick={toggleCluster1}>{showCluster2 == false && showCluster3 == false ? '(selected)' : 'Recent Form'}</Button>
          <Button sx={{ maxWidth: 20/100 }} onClick={toggleCluster2}>{showCluster1 == false && showCluster3 == false ? '(selected)' : 'Circuit History'}</Button>
          <Button sx={{ maxWidth: 20/100 }} onClick={toggleCluster3}>{showCluster1 == false && showCluster2 == false ? '(selected)' : 'Circuit Type'}</Button>

          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 100/100, border: '1px solid #212121'}} size="small" aria-label="a dense table" display="flex" >
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1} sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121'}}></TableCell>
                  {showCluster1 && <TableCell align="center" colSpan={5} sx={{ borderRight: '1px solid #212121' }}>{"RECENT FORM - THE LAST 5 RACES"}</TableCell>}
                  {showCluster2 && <TableCell align="center" colSpan={5} sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}>{`CIRCUIT HISTORY - RECENT RACES AT ${data4}`}</TableCell>}
                  {showCluster3 && <TableCell align="center" colSpan={5} sx={{ borderRight: '1px solid #212121' }}>{`CIRCUIT TYPE: ${data5} - CIRCUITS SIMILAR TO ${data4}`}</TableCell>}

                </TableRow>
                  {data1.map((row, i) => (
                    <TableRow
                    key={i}  
                    >
                      <TableCell sx = {{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}></TableCell>
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.fiveRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.fourRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.threeRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.twoRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderRight: '1px solid #212121' }}>{row.oneRaceAgo}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{row.nextRace1}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{row.nextRace2}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{row.nextRace3}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee" }}>{row.nextRace4}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderRight: '1px solid #212121' }}>{showCluster2 && row.nextRace5}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType1}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType2}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType3}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType4}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType5}</TableCell>}
                    </TableRow>
                  ))}
                  {data2.map((row, i) => (
                    <TableRow
                    key={i} sx = {{ bgcolor: "#eeeeee" }} 
                    >
                      <TableCell sx = {{ borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}>Driver</TableCell>
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.fiveRacesAgoReport}  target="_blank" rel="noopener noreferrer">{row.fiveRacesAgo}</a></TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.fourRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.fourRacesAgo}</a></TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.threeRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.threeRacesAgo}</a></TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.twoRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.twoRacesAgo}</a></TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}><a href={row.oneRaceAgoReport} target="_blank" rel="noopener noreferrer">{row.oneRaceAgo}</a></TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace1Report} target="_blank" rel="noopener noreferrer">{row.nextRace1}</a></TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace2Report} target="_blank" rel="noopener noreferrer">{row.nextRace2}</a></TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace3Report} target="_blank" rel="noopener noreferrer">{row.nextRace3}</a></TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121' }}><a href={row.nextRace4Report} target="_blank" rel="noopener noreferrer">{row.nextRace4}</a></TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ bgcolor: "#eeeeee", borderBottom: '1px solid #212121', borderRight: '1px solid #212121' }}><a href={row.nextRace5Report} target="_blank" rel="noopener noreferrer">{row.nextRace5}</a></TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType1Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType1}</a></TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType2Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType2}</a></TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType3Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType3}</a></TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType4Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType4}</a></TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ bgcolor: "#ffffff", borderBottom: '1px solid #212121' }}><a href={row.nextRaceType5Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType5}</a></TableCell>}
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
                      {showCluster1 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.fiveRacesAgoRating), color: getColor(row.fiveRacesAgoRating)}} align="center">{boolean1 == true ? row.fiveRacesAgo : cellLoading}</TableCell>}
                      {showCluster1 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.fourRacesAgoRating), color: getColor(row.fourRacesAgoRating) }} align="center">{boolean1 == true ? row.fourRacesAgo : cellLoading}</TableCell>}
                      {showCluster1 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.threeRacesAgoRating), color: getColor(row.threeRacesAgoRating)}} align="center">{boolean1 == true ? row.threeRacesAgo : cellLoading}</TableCell>}
                      {showCluster1 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.twoRacesAgoRating), color: getColor(row.twoRacesAgoRating) }} align="center">{boolean1 == true ? row.twoRacesAgo : cellLoading}</TableCell>}
                      {showCluster1 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.oneRaceAgoRating), color: getColor(row.oneRaceAgoRating), borderRight: '1px solid #212121' }} align="center">{boolean1 == true ? row.oneRaceAgo : cellLoading}</TableCell>}
                      {showCluster2 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace1Rating), color: getColor(row.nextRace1Rating) }} align="center">{boolean2 == true ? row.nextRace1 : cellLoading}</TableCell>}
                      {showCluster2 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace2Rating), color: getColor(row.nextRace2Rating) }} align="center">{boolean2 == true ? row.nextRace2 : cellLoading}</TableCell>}
                      {showCluster2 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace3Rating), color: getColor(row.nextRace3Rating) }} align="center">{boolean2 == true ? row.nextRace3 : cellLoading}</TableCell>}
                      {showCluster2 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace4Rating), color: getColor(row.nextRace4Rating) }} align="center">{boolean2 == true ? row.nextRace4 : cellLoading}</TableCell>}
                      {showCluster2 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace5Rating), color: getColor(row.nextRace5Rating), borderRight: '1px solid #212121' }} align="center">{boolean2 == true ? row.nextRace5 : cellLoading}</TableCell>}
                      {showCluster3 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType1Rating), color: getColor(row.nextRaceType1Rating) }} align="center">{boolean3 == true ? row.nextRaceType1 : cellLoading}</TableCell>}
                      {showCluster3 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType2Rating), color: getColor(row.nextRaceType2Rating) }} align="center">{boolean3 == true ? row.nextRaceType2 : cellLoading}</TableCell>}
                      {showCluster3 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType3Rating), color: getColor(row.nextRaceType3Rating) }} align="center">{boolean3 == true ? row.nextRaceType3 : cellLoading}</TableCell>}
                      {showCluster3 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType4Rating), color: getColor(row.nextRaceType4Rating) }} align="center">{boolean3 == true ? row.nextRaceType4 : cellLoading}</TableCell>}
                      {showCluster3 && <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType5Rating), color: getColor(row.nextRaceType5Rating) }} align="center">{boolean3 == true ? row.nextRaceType5 : cellLoading}</TableCell>}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
};