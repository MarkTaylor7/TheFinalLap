import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Oval } from "react-loader-spinner";


export default function DenseTable({data1, data2, data3, boolean1, boolean2, boolean3}) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            {data1.map((row, i) => (
              <TableRow
              key={i}
              >
                <TableCell></TableCell>
                <TableCell align="right">{row.fiveRacesAgo}</TableCell>
                <TableCell align="right">{row.fourRacesAgo}</TableCell>
                <TableCell align="right">{row.threeRacesAgo}</TableCell>
                <TableCell align="right">{row.twoRacesAgo}</TableCell>
                <TableCell align="right">{row.oneRaceAgo}</TableCell>
                <TableCell align="right">{row.nextRace1}</TableCell>
                <TableCell align="right">{row.nextRace2}</TableCell>
                <TableCell align="right">{row.nextRace3}</TableCell>
                <TableCell align="right">{row.nextRace4}</TableCell>
                <TableCell align="right">{row.nextRace5}</TableCell>
                <TableCell align="right">{row.nextRaceType1}</TableCell>
                <TableCell align="right">{row.nextRaceType2}</TableCell>
                <TableCell align="right">{row.nextRaceType3}</TableCell>
                <TableCell align="right">{row.nextRaceType4}</TableCell>
                <TableCell align="right">{row.nextRaceType5}</TableCell>
              </TableRow>
            ))}
            {data2.map((row, i) => (
              <TableRow
              key={i}
              >
                <TableCell>Driver</TableCell>
                <TableCell align="right">{row.fiveRacesAgo}</TableCell>
                <TableCell align="right">{row.fourRacesAgo}</TableCell>
                <TableCell align="right">{row.threeRacesAgo}</TableCell>
                <TableCell align="right">{row.twoRacesAgo}</TableCell>
                <TableCell align="right">{row.oneRaceAgo}</TableCell>
                <TableCell align="right">{row.nextRace1}</TableCell>
                <TableCell align="right">{row.nextRace2}</TableCell>
                <TableCell align="right">{row.nextRace3}</TableCell>
                <TableCell align="right">{row.nextRace4}</TableCell>
                <TableCell align="right">{row.nextRace5}</TableCell>
                <TableCell align="right">{row.nextRaceType1}</TableCell>
                <TableCell align="right">{row.nextRaceType2}</TableCell>
                <TableCell align="right">{row.nextRaceType3}</TableCell>
                <TableCell align="right">{row.nextRaceType4}</TableCell>
                <TableCell align="right">{row.nextRaceType5}</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {data3.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{boolean1 == true ? row.fiveRacesAgo : <Oval/>}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.fourRacesAgo : <Oval/>}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.threeRacesAgo : <Oval/>}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.twoRacesAgo : <Oval/>}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.oneRaceAgo : <Oval/>}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace1 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace2 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace3 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace4 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace5 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType1 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType2 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType3 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType4 : <Oval/>}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType5 : <Oval/>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }