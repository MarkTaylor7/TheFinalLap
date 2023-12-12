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



export default function DenseTable({data1, data2, data3, data4, boolean1, boolean2, boolean3}) {
  
  function getBackgroundColor(data3) {
    let color;
    switch (data3) {
      case "win":
        color = "#ffeb3b";
        break;
      case "excellent":
        color = "#4caf50";
        break;
      case "great":
        color = "#81c784";
        break;
      case "above-avg":
        color = "#c8e6c9";
        break;
      case "below-avg":
        color = "#ffcdd2";
        break;
      case "bad":
        color = "#e57373";
        break;
      case "very bad":
        color = "#f44336";
        break;
      case "no finish":
        color = "#212121";
        break;
      case "N/A":
        color = "#bdbdbd";
        break;
      case "Max Verstappen":
      case "Sergio Pérez":
        color = "#3671C6";
        break;
      case "Lewis Hamilton":
      case "George Russell":
        color = "#6CD3BF";
        break;
      case "Charles Leclerc":
      case "Carlos Sainz":
        color = "#F91536";
        break;
      case "Lando Norris":
      case "Oscar Piastri":
        color = "#F58020";
        break;
      case "Fernando Alonso":
      case "Lance Stroll":
        color = "#358C75";
        break;
      case "Pierre Gasly":
      case "Esteban Ocon":
        color = "#2293D1";
        break;
      case "Alexander Albon":
      case "Logan Sargeant":
        color = "#37BEDD";
        break;
      case "Yuki Tsunoda":
      case "Daniel Ricciardo":
      case "Liam Lawson":
      case "Nyck de Vries":
        color = "#5E8FAA";
        break; 
      case "Valtteri Bottas":
      case "Guanyu Zhou":
        color = "#C92D4B";
        break;
      case "Nico Hülkenberg":
      case "Kevin Magnussen":
        color = "#B6BABD";
        break;
      default:
        color = "ffffff";
    };

    return color        
  };
  
  function getColor(data3) {
    let color;
    switch (data3) {
      case "no finish":
      case "Max Verstappen":
      case "Sergio Pérez":
      case "Charles Leclerc":
      case "Carlos Sainz":
      case "Fernando Alonso":
      case "Lance Stroll":
      case "Valtteri Bottas":
      case "Guanyu Zhou":
        color = "#ffffff";
        break;
      default:
        color = "#212121";
    };

    return color
  };

  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1} sx={{ bgcolor: "#f5f5f5" }}></TableCell>
              <TableCell align="center" colSpan={5} >Recent Form</TableCell>
              <TableCell align="center" colSpan={5} sx={{ bgcolor: "#f5f5f5" }}>Circuit History</TableCell>
              <TableCell align="center" colSpan={5}>Circuit Type</TableCell>

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
                  </TableHead>
                  <TableBody>
                    {data3.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" sx = {{ bgcolor: getBackgroundColor(row.name), color: getColor(row.name)}} >
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