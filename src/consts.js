import data from "./data.json" assert { type: 'json' };

export const allCareerData = data;

export const emptyRaceObject = {
  Circuit: {
    circuitId: "N/A",
    circuitName: "N/A"
  },
  Results: [
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    },
    {Driver: {
      driverId: "N/A",
      familyName: "N/A",
      givenName: "N/A"
      },
      positionText: "N/A",
      status: "N/A"
    }
  ],
  raceName: "N/A",
  round: "N/A",
  season: ""
}

export const allSeasonsArray = [
  2005,
  2006,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
  2022,
  2023,
  2024
];



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
  circuitNames: [
    "Albert Park",
    "Monaco",
    "Barcelona",
    "Hungaroring",
    "Zandvoort",
    "Marina Bay",
    "Suzuka",
    "Losail",
    "Mexico City"
  ]
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
  circuitNames: [
    "Miami",
    "Red Bull Ring",
    "Silverstone",
    "COTA",
    "Interlagos",
    "Yas Marina",
    "Shanghai",
    "Imola"
  ]
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
  circuitNames: [
    "Sakhir",
    "Jeddah",
    "Baku",
    "Montreal",
    "Spa",
    "Monza",
    "Las Vegas"
  ]
};

export const circuitTypes = [
  highDownforceCircuits,
  balancedCircuits,
  powerCircuits,
];

export const dropdownOptions = [
  { value: 'bahrain', label: 'Sakhir (Bahrain)' },
  { value: 'jeddah', label: 'Jeddah (Saudi Arabia)' },
  { value: 'albert_park', label: 'Albert Park (Australia)' },
  { value: 'suzuka', label: 'Suzuka (Japan)' },
  { value: 'shanghai', label: 'Shanghai (China)' },
  { value: 'miami', label: 'Miami (USA)' },
  { value: 'imola', label: 'Imola (Italy)' },
  { value: 'monaco', label: 'Monaco' },
  { value: 'villeneuve', label: 'Montreal (Canada)' },
  { value: 'catalunya', label: 'Barcelona (Spain)' },
  { value: 'red_bull_ring', label: 'Red Bull Ring (Austria)' },
  { value: 'silverstone', label: 'Silverstone (Great Britain)' },
  { value: 'hungaroring', label: 'Hungaroring (Hungary)' },
  { value: 'spa', label: 'Spa-Francorchamps (Belgium)' },
  { value: 'zandvoort', label: 'Zandvoort (Netherlands)' },
  { value: 'monza', label: 'Monza (Italy)' },
  { value: 'baku', label: 'Baku (Azerbaijan)' },
  { value: 'marina_bay', label: 'Marina Bay (Singapore)' },
  { value: 'americas', label: 'Circuit of the Americas (USA)' },
  { value: 'rodriguez', label: 'Mexico City (Mexico)' },
  { value: 'interlagos', label: 'Interlagos (Brazil)' },
  { value: 'vegas', label: 'Las Vegas (USA)' },
  { value: 'losail', label: 'Losail (Qatar)' },
  { value: 'yas_marina', label: 'Yas Marina (UAE)' },
];

export const raceTitles = [
{raceName: "N/A", raceHeader: ""},
{raceName: "70th Anniversary Grand Prix", raceHeader: "70A"},
{raceName: "Abu Dhabi Grand Prix", raceHeader: "ABU"},
{raceName: "Australian Grand Prix", raceHeader: "AUS"},
{raceName: "Austrian Grand Prix", raceHeader: "AUT"},
{raceName: "Azerbaijan Grand Prix", raceHeader: "AZE"},
{raceName: "Bahrain Grand Prix", raceHeader: "BAH"},
{raceName: "Belgian Grand Prix", raceHeader: "BEL"},
{raceName: "Brazilian Grand Prix", raceHeader: "BRA"},
{raceName: "Canadian Grand Prix", raceHeader: "CAN"},
{raceName: "Chinese Grand Prix", raceHeader: "CHN"},
{raceName: "Emilia Romagna Grand Prix", raceHeader: "EMI"},
{raceName: "Spanish Grand Prix", raceHeader: "ESP"},
{raceName: "European Grand Prix", raceHeader: "EUR"},
{raceName: "British Grand Prix", raceHeader: "GBR"},
{raceName: "Hungarian Grand Prix", raceHeader: "HUN"},
{raceName: "Italian Grand Prix", raceHeader: "ITA"},
{raceName: "Japanese Grand Prix", raceHeader: "JPN"},
{raceName: "Las Vegas Grand Prix", raceHeader: "LVG"},
{raceName: "Mexican Grand Prix", raceHeader: "MEX"},
{raceName: "Mexico City Grand Prix", raceHeader: "MEX"},
{raceName: "Miami Grand Prix", raceHeader: "MIA"},
{raceName: "Monaco Grand Prix", raceHeader: "MON"},
{raceName: "Dutch Grand Prix", raceHeader: "NED"},
{raceName: "Qatar Grand Prix", raceHeader: "QAT"},
{raceName: "Saudi Arabian Grand Prix", raceHeader: "SAU"},
{raceName: "Singapore Grand Prix", raceHeader: "SIN"},
{raceName: "Sakhir Grand Prix", raceHeader: "SKH"},
{raceName: "San Marino Grand Prix", raceHeader: "SMR"},
{raceName: "São Paulo Grand Prix", raceHeader: "BRA"},
{raceName: "Styrian Grand Prix", raceHeader: "STY"},
{raceName: "United States Grand Prix", raceHeader: "USA"}
];

export const nextRaceBanners = [
  {circuitId: 'yas_marina',  raceName: 'Abu Dhabi GP', circuit: 'Yas Marina'},
  {circuitId: 'albert_park', raceName: 'Australian GP', circuit: 'Albert Park'},
  {circuitId: 'red_bull_ring', raceName: 'Austrian GP', circuit: 'Red Bull Ring'},
  {circuitId: 'baku', raceName: 'Azerbaijan GP', circuit: 'Baku'},
  {circuitId: 'bahrain', raceName: 'Bahrain GP', circuit: 'Sakhir'},
  {circuitId: 'spa', raceName: 'Belgian GP', circuit: 'Spa'},
  {circuitId: 'villeneuve', raceName: 'Canadian GP', circuit: 'Montreal'},
  {circuitId: 'shanghai', raceName: 'Chinese GP', circuit: 'Shanghai'},
  {circuitId: 'imola', raceName: 'Emilia Romagna GP', circuit: 'Imola'},
  {circuitId: 'catalunya', raceName: 'Spanish GP', circuit: 'Barcelona'},
  {circuitId: 'silverstone', raceName: 'British GP', circuit: 'Silverstone'},
  {circuitId: 'hungaroring', raceName: 'Hungarian GP', circuit: 'Hungaroring'},
  {circuitId: 'monza', raceName: 'Italian GP', circuit: 'Monza'},
  {circuitId: 'suzuka', raceName: 'Japanese GP', circuit: 'Suzuka'},
  {circuitId: 'vegas', raceName: 'Las Vegas GP', circuit: 'Vegas'},
  {circuitId: 'rodriguez', raceName: 'Mexico City GP', circuit: 'Mexico City'},
  {circuitId: 'miami', raceName: 'Miami GP', circuit: 'Miami'},
  {circuitId: 'monaco', raceName: 'Monaco GP', circuit: 'Monaco'},
  {circuitId: 'zandvoort', raceName: 'Dutch GP', circuit: 'Zandvoort'},
  {circuitId: 'losail', raceName: 'Qatar GP', circuit: 'Losail'},
  {circuitId: 'jeddah', raceName: 'Saudi Arabian GP', circuit: 'Jeddah'},
  {circuitId: 'marina_bay', raceName: 'Singapore GP', circuit: 'Marina Bay'},
  {circuitId: 'interlagos', raceName: 'São Paulo GP', circuit: 'Interlagos'},
  {circuitId: 'americas', raceName: 'United States GP', circuit: 'COTA'}
]