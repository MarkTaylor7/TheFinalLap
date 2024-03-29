import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from './MyContext';

import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Grid } from "react-loader-spinner";

import { getBackgroundColor, getColor } from "./utilities";

const cellLoading = <Grid
visible={true}
height="300"
width="300"
color="#87C75F"
ariaLabel="grid-loading"
radius="0"
wrapperStyle={{}}
wrapperClass="grid-wrapper"
/>

export default function ResultsTable({data1, data2, data3, data4, data5, boolean1, boolean2, boolean3, boolean4}) {
  
  getBackgroundColor(data3);
  getColor(data3);

  const getColorForData5 = (value) => {
    switch (value) {
      case 'POWER':
        return 'red';
      case 'BALANCED':
        return 'orange';
      case 'HIGH DOWNFORCE':
        return 'yellow';
      default:
        return '#ffffff';
    }
  };

  const [hoveredSection, setHoveredSection] = useState(null);

  const handleHover = (section) => {
    setHoveredSection(section);
  };

  const { showCluster1, setShowCluster1,
          showCluster2, setShowCluster2,
          showCluster3, setShowCluster3 } = useContext(MyContext);

  const isSmallScreen = useMediaQuery('(max-width:480px)');
  const isVerySmallScreen = useMediaQuery('(max-width:410px)');
  
    return (
      boolean4 == false ? cellLoading :
        <div id="tableContainer">
          <TableContainer className="mainTable" component={Paper} style={{ maxHeight: 700, borderRadius: 0 }}>
            <Table sx={{ overflow: 'auto', maxWidth: 100/100 }} size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={1} sx={{ bgcolor: "#17181a", borderBottom: 0, borderTop: '1px solid #606367', borderRight: '1px solid #606367', borderLeft: '1px solid #606367' }}></TableCell>
                  {showCluster1 && <TableCell align="center" colSpan={5} onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ color: "#ffffff", transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderTop: '1px solid #606367', borderBottom: 0, borderRight: '1px solid #606367', whiteSpace: 'pre-wrap' }}>{"RECENT FORM\nTHE LAST 5 RACES"}</TableCell>}
                  {showCluster2 && <TableCell align="center" colSpan={5} onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ color: "#ffffff", transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderTop: '1px solid #606367', px: 0.5, borderBottom: 0, borderRight: '1px solid #606367', whiteSpace: 'pre-wrap' }}>{`CIRCUIT HISTORY\nRECENT RACES AT ${data4}`}</TableCell>}
                  {showCluster3 && <TableCell align="center" colSpan={5} onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderTop: '1px solid #606367', px: 0.5, borderBottom: 0, whiteSpace: 'pre-wrap' }}>
                    <div style={{fontFamily: 'Roboto'}}>
                      <span style={{ color:'#ffffff' }}>{`CIRCUIT TYPE: `}</span>
                      <span style={{ color: getColorForData5(data5) }}>{data5}</span><div/>
                      <span style={{ color:'#ffffff' }}>{`CIRCUITS SIMILAR TO ${data4}`}</span>
                    </div>
                  </TableCell>}
                </TableRow>
                  {data1.map((row, i) => (
                    <TableRow
                    key={i}
                    sx = {{ overflow: 'auto' }}
                    >
                      <TableCell sx = {{ bgcolor: "#17181a", borderBottom: 0, borderRight: '1px solid #606367', borderLeft: '1px solid #606367', top: "59px" }}></TableCell>
                      {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.fiveRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.fourRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.threeRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.twoRacesAgo}</TableCell>}
                      {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, borderRight: '1px solid #606367', top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.oneRaceAgo}</TableCell>}
                      {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{row.nextRace1}</TableCell>}
                      {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRace2}</TableCell>}
                      {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRace3}</TableCell>}
                      {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRace4}</TableCell>}
                      {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: 0, borderRight: '1px solid #606367', top: "59px", width: isVerySmallScreen ? 1/6 : 65 }}>{showCluster2 && row.nextRace5}</TableCell>}
                      {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRaceType1}</TableCell>}
                      {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRaceType2}</TableCell>}
                      {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRaceType3}</TableCell>}
                      {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRaceType4}</TableCell>}
                      {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: 0, top: "59px", width: isVerySmallScreen ? 1/6 : 65  }}>{row.nextRaceType5}</TableCell>}
                    </TableRow>
                  ))}
                {data2.map((row, i) => (
                <TableRow
                key={i}
                sx = {{ overflow: 'auto', bgcolor: "#17181a" }} 
                >
                  <TableCell align="left" sx = {{ color: "#ffffff", bgcolor: "#17181a", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', borderLeft: '1px solid #606367', top: "110px", px: isSmallScreen ? 0.5 : 1, fontSize: isSmallScreen ? '14px' : '14px'}}>Driver</TableCell>
                  {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.fiveRacesAgoReport}  target="_blank" rel="noopener noreferrer">{row.fiveRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.fourRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.fourRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.threeRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.threeRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.twoRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.twoRacesAgo}</a></TableCell>}
                  {showCluster1 && <TableCell align="center" onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 2 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', top: "110px" }}><a href={row.oneRaceAgoReport} target="_blank" rel="noopener noreferrer">{row.oneRaceAgo}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRace1Report} target="_blank" rel="noopener noreferrer">{row.nextRace1}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRace2Report} target="_blank" rel="noopener noreferrer">{row.nextRace2}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRace3Report} target="_blank" rel="noopener noreferrer">{row.nextRace3}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRace4Report} target="_blank" rel="noopener noreferrer">{row.nextRace4}</a></TableCell>}
                  {showCluster2 && <TableCell align="center" onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 3) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', borderRight: '1px solid #606367', top: "110px" }}><a href={row.nextRace5Report} target="_blank" rel="noopener noreferrer">{row.nextRace5}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRaceType1Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType1}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRaceType2Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType2}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRaceType3Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType3}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRaceType4Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType4}</a></TableCell>}
                  {showCluster3 && <TableCell align="center" onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx={{ px: 0.9, transition: 'bgcolor 0.3s ease-out', bgcolor: (hoveredSection !== 1 && hoveredSection !== 2) ? "#17181a" : "#303133", borderBottom: '1px solid #606367', top: "110px" }}><a href={row.nextRaceType5Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType5}</a></TableCell>}
                </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {data3.map((row, i) => (
                  <TableRow
                    key={i}
                  >
                    <TableCell component="th" scope="row" align="left" variant={isSmallScreen ? 'body2' : 'body1'} sx = {{px: isSmallScreen ? 0.5 : 1, fontSize: isSmallScreen ? '11px' : '14px', whiteSpace: 'nowrap', height: '100%', width: isSmallScreen ? 1/8 : 1/13, bgcolor: getBackgroundColor(row.name), color: getColor(row.name), borderBottom: '1px solid #606367', borderRight: '1px solid #606367', borderLeft: '1px solid #606367' }} >
                      <div style={{ fontFamily: 'Roboto' }}>{row.name.split(' ')[0]}</div>
                      <div><b>{row.name.split(' ')[1]}</b></div>
                    </TableCell>
                    {showCluster1 && <TableCell onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 2 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.fiveRacesAgoRating), color: getColor(row.fiveRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.fiveRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 2 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.fourRacesAgoRating), color: getColor(row.fourRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.fourRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 2 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.threeRacesAgoRating), color: getColor(row.threeRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.threeRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 2 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.twoRacesAgoRating), color: getColor(row.twoRacesAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.twoRacesAgo : cellLoading}</TableCell>}
                    {showCluster1 && <TableCell onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 2 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.oneRaceAgoRating), color: getColor(row.oneRaceAgoRating), border: '1px solid #606367' }} align="center">{boolean1 == true ? row.oneRaceAgo : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRace1Rating), color: getColor(row.nextRace1Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace1 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRace2Rating), color: getColor(row.nextRace2Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace2 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRace3Rating), color: getColor(row.nextRace3Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace3 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRace4Rating), color: getColor(row.nextRace4Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace4 : cellLoading}</TableCell>}
                    {showCluster2 && <TableCell onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 3) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRace5Rating), color: getColor(row.nextRace5Rating), border: '1px solid #606367' }} align="center">{boolean2 == true ? row.nextRace5 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 2) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRaceType1Rating), color: getColor(row.nextRaceType1Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType1 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 2) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRaceType2Rating), color: getColor(row.nextRaceType2Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType2 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 2) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRaceType3Rating), color: getColor(row.nextRaceType3Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType3 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 2) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRaceType4Rating), color: getColor(row.nextRaceType4Rating), border: '1px solid #606367' }} align="center">{boolean3 == true ? row.nextRaceType4 : cellLoading}</TableCell>}
                    {showCluster3 && <TableCell onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleHover(null)} sx = {{ px: 0.1, height: 1, transition: 'opacity 0.3s ease-out', opacity: (hoveredSection !== 1 && hoveredSection !== 2) ? 1 : 0.4, bgcolor: getBackgroundColor(row.nextRaceType5Rating), color: getColor(row.nextRaceType5Rating), border: '1px solid #606367'}} align="center">{boolean3 == true ? row.nextRaceType5 : cellLoading}</TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
};