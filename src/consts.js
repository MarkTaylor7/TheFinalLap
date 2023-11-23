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
    "shanghai"
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

const anniversary = {
  raceName: "70th Anniversary Grand Prix", raceHeader: "70A"
};

const abuDhabi = {
  raceName: "Abu Dhabi Grand Prix", raceHeader: "ABU"
};

const australia = {
  raceName: "Australian Grand Prix", raceHeader: "AUS"
};

const austria = {
  raceName: "Austrian Grand Prix", raceHeader: "AUT"
};

const azerbaijan = {
  raceName: "Azerbaijan Grand Prix", raceHeader: "AZE"
};

const bahrain = {
  raceName: "Bahrain Grand Prix", raceHeader: "BAH"
};

const belgium = {
  raceName: "Belgian Grand Prix", raceHeader: "BEL"
};

const brazil = {
  raceName: "São Paulo Grand Prix" || "Brazilian Grand Prix", raceHeader: "BRA"
};

const canada = {
  raceName: "Canadian Grand Prix", raceHeader: "CAN"
};

const china = {
  raceName: "Chinese Grand Prix", raceHeader: "CHN"
};

const emiliaRomagna = {
  raceName: "Emilia Romagna Grand Prix", raceHeader: "EMI"
};

const europe = {
  raceName: "European Grand Prix", raceHeader: "EUR"
};

const greatBritain = {
  raceName: "British Grand Prix", raceHeader: "GBR"
};

const hungary = {
  raceName: "Hungarian Grand Prix", raceHeader: "HUN"
};

const italy = {
  raceName: "Italian Grand Prix", raceHeader: "ITA"
};

const japan = {
  raceName: "Japanese Grand Prix", raceHeader: "JPN"
};

const lasVegas = {
  raceName: "Las Vegas Grand Prix", raceHeader: "LVG"
};

const mexico = {
  raceName: "Mexico City Grand Prix" || "Mexican Grand Prix", raceHeader: "MEX"
};

const miami = {
  raceName: "Miami Grand Prix", raceHeader: "MIA"
};

const netherlands = {
  raceName: "Dutch Grand Prix", raceHeader: "NED"
};

const monaco = {
  raceName: "Monaco Grand Prix", raceHeader: "MON"
};

const qatar = {
  raceName: "Qatar Grand Prix", raceHeader: "QAT"
};

const sakhir = {
  raceName: "Sakhir Grand Prix", raceHeader: "SKH"
};

const sanMarino = {
  raceName: "San Marino Grand Prix", raceHeader: "SMR"
};

const saudiArabia = {
  raceName: "Saudi Arabian Grand Prix", raceHeader: "SAU"
};

const singapore = {
  raceName: "Singapore Grand Prix", raceHeader: "SIN"
};

const spain = {
  raceName: "Spanish Grand Prix", raceHeader: "ESP"
};

const styria = {
  raceName: "Styrian Grand Prix", raceHeader: "STY"
};

const unitedStates = {
  raceName: "United States Grand Prix", raceHeader: "USA"
};


export const raceTitles = [
  anniversary,
  abuDhabi,
  australia,
  austria,
  azerbaijan,
  bahrain,
  belgium,
  brazil,
  canada,
  china,
  emiliaRomagna,
  europe,
  greatBritain,
  hungary,
  italy,
  japan,
  lasVegas,
  mexico,
  miami,
  monaco,
  netherlands,
  qatar,
  sakhir,
  sanMarino,
  saudiArabia,
  singapore,
  spain,
  styria,
  unitedStates
];

export const circuitTypes = [
  highDownforceCircuits,
  balancedCircuits,
  powerCircuits,
];
