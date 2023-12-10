import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Oval } from "react-loader-spinner";

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

const getBackgroundColor = () => {
  // Example condition: Change background color if value is greater than 10
  return value > 10 ? '#ff9999' : 'inherit'; // Change color as needed
};

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
                <TableCell align="center">{row.fiveRacesAgo}</TableCell>
                <TableCell align="center">{row.fourRacesAgo}</TableCell>
                <TableCell align="center">{row.threeRacesAgo}</TableCell>
                <TableCell align="center">{row.twoRacesAgo}</TableCell>
                <TableCell align="center">{row.oneRaceAgo}</TableCell>
                <TableCell align="center">{row.nextRace1}</TableCell>
                <TableCell align="center">{row.nextRace2}</TableCell>
                <TableCell align="center">{row.nextRace3}</TableCell>
                <TableCell align="center">{row.nextRace4}</TableCell>
                <TableCell align="center">{row.nextRace5}</TableCell>
                <TableCell align="center">{row.nextRaceType1}</TableCell>
                <TableCell align="center">{row.nextRaceType2}</TableCell>
                <TableCell align="center">{row.nextRaceType3}</TableCell>
                <TableCell align="center">{row.nextRaceType4}</TableCell>
                <TableCell align="center">{row.nextRaceType5}</TableCell>
              </TableRow>
            ))}
            {data2.map((row, i) => (
              <TableRow
              key={i}
              >
                <TableCell>Driver</TableCell>
                <TableCell align="center">{row.fiveRacesAgo}</TableCell>
                <TableCell align="center">{row.fourRacesAgo}</TableCell>
                <TableCell align="center">{row.threeRacesAgo}</TableCell>
                <TableCell align="center">{row.twoRacesAgo}</TableCell>
                <TableCell align="center">{row.oneRaceAgo}</TableCell>
                <TableCell align="center">{row.nextRace1}</TableCell>
                <TableCell align="center">{row.nextRace2}</TableCell>
                <TableCell align="center">{row.nextRace3}</TableCell>
                <TableCell align="center">{row.nextRace4}</TableCell>
                <TableCell align="center">{row.nextRace5}</TableCell>
                <TableCell align="center">{row.nextRaceType1}</TableCell>
                <TableCell align="center">{row.nextRaceType2}</TableCell>
                <TableCell align="center">{row.nextRaceType3}</TableCell>
                <TableCell align="center">{row.nextRaceType4}</TableCell>
                <TableCell align="center">{row.nextRaceType5}</TableCell>
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
                <TableCell sx = {{ bgcolor: "green" }} align="center">{boolean1 == true ? row.fiveRacesAgo : cellLoading}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.fourRacesAgo : cellLoading}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.threeRacesAgo : cellLoading}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.twoRacesAgo : cellLoading}</TableCell>
                <TableCell align="center">{boolean1 == true ? row.oneRaceAgo : cellLoading}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace1 : cellLoading}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace2 : cellLoading}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace3 : cellLoading}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace4 : cellLoading}</TableCell>
                <TableCell align="center">{boolean2 == true ? row.nextRace5 : cellLoading}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType1 : cellLoading}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType2 : cellLoading}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType3 : cellLoading}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType4 : cellLoading}</TableCell>
                <TableCell align="center">{boolean3 == true ? row.nextRaceType5 : cellLoading}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }