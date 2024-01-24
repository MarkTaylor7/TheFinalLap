import React, { useEffect, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
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
  
  useEffect(() => {
    const handleNarrowerThan480 = () => {
      setShowCluster1(true);
      setShowCluster2(true);
      setShowCluster3(true);
      setShowCluster2(false);
      setShowCluster3(false);
    };

    const handleResizeUp = () => {
      if (window.innerWidth < 480) {
        handleNarrowerThan480();
      }
    };

    handleResizeUp();
    window.addEventListener('resize', handleResizeUp);

    return () => {
      window.removeEventListener('resize', handleResizeUp);
    };
  }, []); 

  useEffect(() => {
    const handleWiderThan480 = () => {
      setShowCluster1(true);
      setShowCluster2(true);
      setShowCluster3(true);
    };  
  
    const handleResizeDown = () => {
      if (window.innerWidth > 480) {
        handleWiderThan480();
      }
    };

    handleResizeDown();
    window.addEventListener('resize', handleResizeDown);

    return () => {
      window.removeEventListener('resize', handleResizeDown);
    };
  }, []);

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

  const isSmallScreen = useMediaQuery('(max-width:480px)');

    return (
      boolean4 == false ? cellLoading :
        <div id="tableContainer">
          <Button sx={{ fontSize: 8, maxWidth: 90/100 }} onClick={toggleCluster1}>{showCluster2 == false && showCluster3 == false ? '(selected)' : 'Recent Form'}</Button>
          <Button sx={{ fontSize: 8, maxWidth: 90/100 }} onClick={toggleCluster2}>{showCluster1 == false && showCluster3 == false ? '(selected)' : 'Circuit History'}</Button>
          <Button sx={{ fontSize: 8, maxWidth: 90/100 }} onClick={toggleCluster3}>{showCluster1 == false && showCluster2 == false ? '(selected)' : 'Circuit Type'}</Button>

          <TableContainer className="mainTable" component={Paper} style={{ maxHeight: 700, borderRadius: 0 }}>
            <Table sx={{ overflow: 'auto', maxWidth: 100/100 }} size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1} sx={{ bgcolor: "#17181a", borderBottom: 0, borderTop: '1px solid #606367', borderRight: '1px solid #606367' }}></TableCell>
                  {showCluster1 && <TableCell align="center" colSpan={5} sx={{ color: "#ffffff", bgcolor: "#17181a", borderTop: '1px solid #606367', borderBottom: 0, borderRight: '1px solid #606367', whiteSpace: 'pre-wrap' }}>{"RECENT FORM\nTHE LAST 5 RACES"}</TableCell>}
                  {showCluster2 && <TableCell align="center" colSpan={5} sx={{ color: "#ffffff", bgcolor: "#17181a", borderTop: '1px solid #606367', borderBottom: 0, borderRight: '1px solid #606367', whiteSpace: 'pre-wrap' }}>{`CIRCUIT HISTORY\nRECENT RACES AT ${data4}`}</TableCell>}
                  {showCluster3 && <TableCell align="center" colSpan={5} sx={{ color: "#ffffff", bgcolor: "#17181a", borderTop: '1px solid #606367', borderBottom: 0, whiteSpace: 'pre-wrap' }}>{`CIRCUIT TYPE: ${data5}\nCIRCUITS SIMILAR TO ${data4}`}</TableCell>}

                </TableRow>
                  {data1.map((row, i) => (
                    <TableRow
                    key={i} sx = {{ overflow: 'auto' }}
                    >
                      <TableCell sx = {{ bgcolor: "#17181a", borderBottom: 0, borderRight: '1px solid #606367', top: "60px" }}></TableCell>
                      {showCluster1 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.fiveRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.fourRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.threeRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.twoRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, borderRight: '1px solid #606367', top: "60px" }}>{row.oneRaceAgo}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRace1}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRace2}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRace3}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRace4}</TableCell>}
                      {showCluster2 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, borderRight: '1px solid #606367', top: "60px" }}>{showCluster2 && row.nextRace5}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRaceType1}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRaceType2}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRaceType3}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRaceType4}</TableCell>}
                      {showCluster3 && <TableCell align="center" sx={{ px: 1.5, bgcolor: "#17181a", borderBottom: 0, top: "60px" }}>{row.nextRaceType5}</TableCell>}
                    </TableRow>
                  ))}
                {data2.map((row, i) => (
                <TableRow
                key={i} sx = {{ overflow: 'auto', bgcolor: "#17181a" }} 
                >
                  <TableCell align="left" sx = {{ color: "#ffffff", bgcolor: "#17181a", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', top: "112px", px: isSmallScreen ? 0.5 : 1, fontSize: isSmallScreen ? '11px' : '14px'}}>Driver</TableCell>
                  {showCluster1 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.fiveRacesAgoReport}  target="_blank" rel="noopener noreferrer">{row.fiveRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.fourRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.fourRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.threeRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.threeRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.twoRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.twoRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', top: "112px" }}><a href={row.oneRaceAgoReport} target="_blank" rel="noopener noreferrer">{row.oneRaceAgo}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRace1Report} target="_blank" rel="noopener noreferrer">{row.nextRace1}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRace2Report} target="_blank" rel="noopener noreferrer">{row.nextRace2}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRace3Report} target="_blank" rel="noopener noreferrer">{row.nextRace3}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRace4Report} target="_blank" rel="noopener noreferrer">{row.nextRace4}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', top: "112px" }}><a href={row.nextRace5Report} target="_blank" rel="noopener noreferrer">{row.nextRace5}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRaceType1Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType1}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRaceType2Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType2}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRaceType3Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType3}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRaceType4Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType4}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" sx={{ px: 0.75, bgcolor: "#17181a", borderBottom: '1px solid #606367', top: "112px" }}><a href={row.nextRaceType5Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType5}</a></TableCell>}
                </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {data3.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ height: 50, overflow: 'auto' }}
                  >
                    <TableCell component="th" scope="row" align="left" variant={isSmallScreen ? 'body2' : 'body1'} sx = {{px: isSmallScreen ? 0.5 : 1, fontSize: isSmallScreen ? '11px' : '14px', whiteSpace: 'nowrap', height: '100%', minWidth: 0, bgcolor: getBackgroundColor(row.name), color: getColor(row.name), borderBottom: '1px solid #606367', borderRight: '1px solid #606367' }} >
                      <div style={{ fontFamily: 'Roboto' }}>{row.name.split(' ')[0]}</div>
                      <div>{row.name.split(' ')[1]}</div>
                    </TableCell>
                    {showCluster1 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.fiveRacesAgoRating), color: getColor(row.fiveRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.fiveRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.fourRacesAgoRating), color: getColor(row.fourRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.fourRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.threeRacesAgoRating), color: getColor(row.threeRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.threeRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.twoRacesAgoRating), color: getColor(row.twoRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.twoRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.oneRaceAgoRating), color: getColor(row.oneRaceAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.oneRaceAgo : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRace1Rating), color: getColor(row.nextRace1Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace1 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRace2Rating), color: getColor(row.nextRace2Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace2 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRace3Rating), color: getColor(row.nextRace3Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace3 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRace4Rating), color: getColor(row.nextRace4Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace4 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRace5Rating), color: getColor(row.nextRace5Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace5 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRaceType1Rating), color: getColor(row.nextRaceType1Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType1 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRaceType2Rating), color: getColor(row.nextRaceType2Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType2 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRaceType3Rating), color: getColor(row.nextRaceType3Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType3 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRaceType4Rating), color: getColor(row.nextRaceType4Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType4 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell sx = {{ height: 1, bgcolor: getBackgroundColor(row.nextRaceType5Rating), color: getColor(row.nextRaceType5Rating), border: '1px solid #606367'}} align="center">{boolean3 == true ? row.nextRaceType5 : cellLoading}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
};