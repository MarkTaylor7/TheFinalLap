//Every race has a unique circuitId, which is sorted into one of three circuitTypes based its characteristics:
//High downforce circuits feature demanding corners and usually don't feature long straights, so high aerodynamic
//grip (downforce) is required.
const highDownforceCircuits = {
  circuitType: "High Downforce",
  circuitIds: [
    "albert_park",
    "monaco",
    "catalunya",
    "hungaroring",
    "zandvoort",
    "marina_bay",
    "suzuka",
    "losail",
    "rodriguez",
  ],
};

//Balanced Circuits are all-around tests of car/driver performance, where both power and downforce are in roughly
//equal demand for a quick laptime.
const balancedCircuits = {
  circuitType: "Balanced",
  circuitIds: [
    "miami",
    "red_bull_ring",
    "silverstone",
    "americas",
    "interlagos",
    "yas_marina",
    "shanghai",
    "imola"
  ],
};

//Power Circuits feature long straights that reward cars with powerful engines and low drag. Cornering ability
//is less important for success in the race.
const powerCircuits = {
  circuitType: "Power",
  circuitIds: [
    "bahrain",
    "jeddah",
    "baku",
    "villeneuve",
    "spa",
    "monza",
    "vegas",
  ],
};

export const circuitTypes = [
  highDownforceCircuits,
  balancedCircuits,
  powerCircuits,
];

const x = document.getElementById("belgianFlag");

export const raceTitles = [
{raceName: "70th Anniversary Grand Prix", raceHeader: "70A"},
{raceName: "Abu Dhabi Grand Prix", raceHeader: "ABU"},
{raceName: "Australian Grand Prix", raceHeader: "AUS"},
{raceName: "Austrian Grand Prix", raceHeader: "AUT"},
{raceName: "Azerbaijan Grand Prix", raceHeader: "AZE"},
{raceName: "Bahrain Grand Prix", raceHeader: "BAH"},
{raceName: "Belgian Grand Prix", raceHeader: "BEL", flag: x},
{raceName: "São Paulo Grand Prix" || "Brazilian Grand Prix", raceHeader: "BRA"},
{raceName: "Canadian Grand Prix", raceHeader: "CAN"},
{raceName: "Chinese Grand Prix", raceHeader: "CHN"},
{raceName: "Emilia Romagna Grand Prix", raceHeader: "EMI"},
{raceName: "European Grand Prix", raceHeader: "EUR"},
//flags api doesn't have EU flag. May need to look elsewhere if this header is needed
{raceName: "British Grand Prix", raceHeader: "GBR"},
{raceName: "Hungarian Grand Prix", raceHeader: "HUN"},
{raceName: "Italian Grand Prix", raceHeader: "ITA"},
{raceName: "Japanese Grand Prix", raceHeader: "JPN"},
{raceName: "Las Vegas Grand Prix", raceHeader: "LVG"},
{raceName: "Mexico City Grand Prix" || "Mexican Grand Prix", raceHeader: "MEX"},
{raceName: "Miami Grand Prix", raceHeader: "MIA"},
{raceName: "Monaco Grand Prix", raceHeader: "MON"},
{raceName: "Dutch Grand Prix", raceHeader: "NED"},
{raceName: "Qatar Grand Prix", raceHeader: "QAT"},
{raceName: "Sakhir Grand Prix", raceHeader: "SKH"},
{raceName: "San Marino Grand Prix", raceHeader: "SMR"},
{raceName: "Saudi Arabian Grand Prix", raceHeader: "SAU"},
{raceName: "Singapore Grand Prix", raceHeader: "SIN"},
{raceName: "Spanish Grand Prix", raceHeader: "ESP"},
{raceName: "Styrian Grand Prix", raceHeader: "STY"},
//flags api doesn't have EU flag. May need to look elsewhere or use Austrian flag.
{raceName: "United States Grand Prix", raceHeader: "USA"}
];