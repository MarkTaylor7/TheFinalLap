import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable({data}) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Driver</TableCell>
              <TableCell align="right">Five Races Ago</TableCell>
              <TableCell align="right">Four Races Ago</TableCell>
              <TableCell align="right">Three Races Ago</TableCell>
              <TableCell align="right">Two Races Ago</TableCell>
              <TableCell align="right">One Race Ago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.fiveRacesAgo}</TableCell>
                <TableCell align="center">{row.fourRacesAgo}</TableCell>
                <TableCell align="center">{row.threeRacesAgo}</TableCell>
                <TableCell align="center">{row.twoRacesAgo}</TableCell>
                <TableCell align="center">{row.oneRaceAgo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }