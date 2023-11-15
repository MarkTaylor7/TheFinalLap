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
  ],
};

//Power Circuits feature long straights that reward cars with powerful engines and low drag. Cornering ability
//is less important for success in the race.
const powerCircuits = {
  circuitType: "Power",
  circuitIds: [
    //"bahrain",
    //"jeddah",
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
