import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function DenseTable({data1, data2, data3, boolean1, boolean2, boolean3, boolean4}) {
  
  getBackgroundColor(data3);
  getColor(data3);

    return (boolean4 == false ? cellLoading :
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1} sx={{ bgcolor: "#f5f5f5" }}></TableCell>
              <TableCell align="center" colSpan={5} >Recent Form - The Last 5 Races</TableCell>
              <TableCell align="center" colSpan={5} sx={{ bgcolor: "#f5f5f5" }}>Circuit History - Recent Races at the Next Circuit</TableCell>
              <TableCell align="center" colSpan={5}>Circuit Type: Power - Recent Races Similar to the Next Circuit</TableCell>

            </TableRow>
                    {data1.map((row, i) => (
                      <TableRow
                      key={i}  
                      >
                        <TableCell sx = {{ bgcolor: "#f5f5f5" }}></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.fiveRacesAgo}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.fourRacesAgo}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.threeRacesAgo}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.twoRacesAgo}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.oneRaceAgo}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}>{row.nextRace1}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}>{row.nextRace2}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}>{row.nextRace3}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}>{row.nextRace4}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}>{row.nextRace5}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType1}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType2}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType3}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType4}</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}>{row.nextRaceType5}</TableCell>
                      </TableRow>
                    ))}
                    {data2.map((row, i) => (
                      <TableRow
                      key={i} sx = {{ bgcolor: "#f5f5f5" }} 
                      >
                        <TableCell>Driver</TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.fiveRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.fiveRacesAgo}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.fourRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.fourRacesAgo}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.threeRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.threeRacesAgo}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.twoRacesAgoReport} target="_blank" rel="noopener noreferrer">{row.twoRacesAgo}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.oneRaceAgoReport} target="_blank" rel="noopener noreferrer">{row.oneRaceAgo}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}><a href={row.nextRace1Report} target="_blank" rel="noopener noreferrer">{row.nextRace1}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}><a href={row.nextRace2Report} target="_blank" rel="noopener noreferrer">{row.nextRace2}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}><a href={row.nextRace3Report} target="_blank" rel="noopener noreferrer">{row.nextRace3}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}><a href={row.nextRace4Report} target="_blank" rel="noopener noreferrer">{row.nextRace4}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#f5f5f5" }}><a href={row.nextRace5Report} target="_blank" rel="noopener noreferrer">{row.nextRace5}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.nextRaceType1Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType1}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.nextRaceType2Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType2}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.nextRaceType3Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType3}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.nextRaceType4Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType4}</a></TableCell>
                        <TableCell align="center" sx={{ bgcolor: "#ffffff" }}><a href={row.nextRaceType5Report} target="_blank" rel="noopener noreferrer">{row.nextRaceType5}</a></TableCell>
                      </TableRow>
                    ))}
                  </TableHead>
                  <TableBody>
                    {data3.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" align="left" sx = {{ minWidth: 90, bgcolor: getBackgroundColor(row.name), color: getColor(row.name)}} >
                          {row.name}
                        </TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.fiveRacesAgoRating), color: getColor(row.fiveRacesAgoRating)}} align="center">{boolean1 == true ? row.fiveRacesAgo : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.fourRacesAgoRating), color: getColor(row.fourRacesAgoRating) }} align="center">{boolean1 == true ? row.fourRacesAgo : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.threeRacesAgoRating), color: getColor(row.threeRacesAgoRating) }} align="center">{boolean1 == true ? row.threeRacesAgo : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.twoRacesAgoRating), color: getColor(row.twoRacesAgoRating) }} align="center">{boolean1 == true ? row.twoRacesAgo : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.oneRaceAgoRating), color: getColor(row.oneRaceAgoRating) }} align="center">{boolean1 == true ? row.oneRaceAgo : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace1Rating), color: getColor(row.nextRace1Rating) }} align="center">{boolean2 == true ? row.nextRace1 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace2Rating), color: getColor(row.nextRace2Rating) }} align="center">{boolean2 == true ? row.nextRace2 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace3Rating), color: getColor(row.nextRace3Rating) }} align="center">{boolean2 == true ? row.nextRace3 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace4Rating), color: getColor(row.nextRace4Rating) }} align="center">{boolean2 == true ? row.nextRace4 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRace5Rating), color: getColor(row.nextRace5Rating) }} align="center">{boolean2 == true ? row.nextRace5 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType1Rating), color: getColor(row.nextRaceType1Rating) }} align="center">{boolean3 == true ? row.nextRaceType1 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType2Rating), color: getColor(row.nextRaceType2Rating) }} align="center">{boolean3 == true ? row.nextRaceType2 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType3Rating), color: getColor(row.nextRaceType3Rating) }} align="center">{boolean3 == true ? row.nextRaceType3 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType4Rating), color: getColor(row.nextRaceType4Rating) }} align="center">{boolean3 == true ? row.nextRaceType4 : cellLoading}</TableCell>
                        <TableCell sx = {{ bgcolor: getBackgroundColor(row.nextRaceType5Rating), color: getColor(row.nextRaceType5Rating) }} align="center">{boolean3 == true ? row.nextRaceType5 : cellLoading}</TableCell>
                      </TableRow>
                    ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};