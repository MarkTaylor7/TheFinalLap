import React, { useEffect, useState, useContext, useRef } from "react";
import DenseTable from "./DenseTable";

import { MyContext } from './MyContext';

import {
  fetchCurrentSeasonRaceResults,
  fetchCurrentStandings,
  fetchEventList,
  fetchNextTrackData,
  fetchPreviousSeasonRaceResults,
  getDriverAverages,
  matchAveragesWithTableResults,
  rateTableResults,
  formatDate,
  createSeasonResultsProps
} from "./utilities";

import useMediaQuery from '@mui/material/useMediaQuery';
import smoothscroll from 'smoothscroll-polyfill';

import { circuitTypes, raceTitles, allCareerData, dropdownOptions, nextRaceBanners } from "./consts";
import { flags } from "./Flags";
import siteLogo from "./assets/siteLogo.svg";
import siteLogoDesktop from "./assets/siteLogoDesktop.svg";
import siteLogoFooterDesktop from "./assets/siteLogoFooterDesktop.svg";
import footerSiteLogo from "./assets/footerSiteLogo.svg";
import gitHubMobile from "./assets/gitHubMobile.svg";
import gitHubDesktop from "./assets/gitHubDesktop.svg";
import linkedInMobile from "./assets/linkedInMobile.svg";
import linkedInDesktop from "./assets/linkedInDesktop.svg";
import heroBannerMobile from "./assets/images/heroBannerMobile.png";
import heroBannerDesktop from "./assets/images/heroBannerDesktop.png";
import feature1 from "./assets/images/feature1.png";
import toggleButton from "./assets/toggleButton.svg";
import lineChart from "./assets/images/lineChart.png";
import leftArrow from "./assets/leftArrow.svg";
import rightArrow from "./assets/rightArrow.svg";
import nextRaceBox from "./assets/nextRaceBox.svg";
import circuitMonza from "./assets/circuitMonza.svg";
import circuitShanghai from "./assets/circuitShanghai.svg";
import circuitSuzuka from "./assets/circuitSuzuka.svg";

export default function App() {
  const [standings, setStandings] = useState([]);
  const [names, setNames] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [previousSeasonRaceResults, setPreviousSeasonRaceResults] = useState([]);
  const [currentSeasonRaceResults, setCurrentSeasonRaceResults] = useState([]);
  const [lastFiveRaceResults, setLastFiveRaceResults] = useState([]);
  const [flagHeadingsContent, setFlagHeadingsContent] = useState([]);
  const [tableHeadingsContent, setTableHeadingsContent] = useState([]);
  const [driverTableData, setDriverTableData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [nextRace, setNextRace] = useState("");
  const [nextEventName, setNextEventName] = useState("");
  const [nextEventDate, setNextEventDate] = useState("");
  const [nextEventCircuit, setNextEventCircuit] = useState("");
  const [nextCircuitProperName, setNextCircuitProperName] = useState("");
  const [nextRaceHistory, setNextRaceHistory] = useState([]);
  const [nextRaceType, setNextRaceType] = useState("");
  const [nextCircuitTypeProperName, setNextCircuitTypeProperName] = useState("");
  const [currentSeasonCircuitTypeMatches, setCurrentSeasonCircuitTypeMatches] = useState([]);
  const [nextRaceTypeHistory, setNextRaceTypeHistory] = useState([]);
  const [flagHeadings, setFlagHeadings] = useState([]);
  const [tableHeadings, setTableHeadings] = useState([]);
  const [racerData, setRacerData] = useState([]);
  const [lastFiveRacesDataFetched, setLastFiveRacesDataFetched] = useState(false);
  const [nextRaceDataFetched, setNextRaceDataFetched] = useState(false);
  const [nextRaceTypeDataFetched, setNextRaceTypeDataFetched] = useState(false);
  const [tableDataPopulated, setTableDataPopulated] = useState(false);
  const [allTableDataPopulated, setAllTableDataPopulated] = useState(false);
  const [selectedRace, setselectedRace] = useState('');

  const [showFeature1, setShowFeature1] = useState(true);
  const [showFeature2, setShowFeature2] = useState(true);
  const [showFeature3, setShowFeature3] = useState(true);

  const [circuitTypeColor, setCircuitTypeColor] = useState({
    color: 'black'
  });

  const [nextCircuitFlag, setNextCircuitFlag] = useState('');
  const [nextEventFlag, setNextEventFlag] = useState('');

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const screenWidth1280 = useMediaQuery('(max-width:1281px)');
  const screenWidth1366 = useMediaQuery('(min-width:1282px) and (max-width:1367px)');
  const screenWidth1440 = useMediaQuery('(min-width:1368px) and (max-width:1441px)');
  const screenWidth1536 = useMediaQuery('(min-width:1442px) and (max-width: 1900px)');
  const screenWidth1920Plus = useMediaQuery('(min-width:1901px)');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let isStickyNow;
      if (screenWidth1280) {
        isStickyNow = scrollPosition >= 1044;
      } else if (screenWidth1366) {
        isStickyNow = scrollPosition >= 1274;
      } else if (screenWidth1440) {
        isStickyNow = scrollPosition >= 1156;
      } else if (screenWidth1536) {
        isStickyNow = scrollPosition >= 1188;
      }else if (screenWidth1920Plus) {
        isStickyNow = scrollPosition >= 993;
       } else {isStickyNow = scrollPosition >= 1145};

      setSticky(isStickyNow);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const targetElementRef = useRef(null);
  const handleButtonClick = () => {
    targetElementRef.current.scrollIntoView({
      behavior: 'smooth', 
      block: 'start',     
    });
  };

  const targetElementRefMobile = useRef(null);
  const handleButtonClickMobile = () => {
    targetElementRefMobile.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',     
    });
  };


  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setselectedRace(selectedValue);

    switch (selectedValue) {
      case 'bahrain':
        setNextRace('bahrain');
        setNextCircuitFlag('https://flagsapi.com/BH/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'jeddah':
        setNextRace('jeddah');
        setNextCircuitFlag('https://flagsapi.com/SA/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'albert_park':
        setNextRace('albert_park');
        setNextCircuitFlag('https://flagsapi.com/AU/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'suzuka':
        setNextRace('suzuka');
        setNextCircuitFlag('https://flagsapi.com/JP/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'shanghai':
        setNextRace('shanghai');
        setNextCircuitFlag('https://flagsapi.com/CN/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'miami':
        setNextRace('miami');
        setNextCircuitFlag('https://flagsapi.com/US/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'imola':
        setNextRace('imola');
        setNextCircuitFlag('https://flagsapi.com/IT/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'monaco':
        setNextRace('monaco');
        setNextCircuitFlag('https://flagsapi.com/MC/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'villeneuve':
        setNextRace('villeneuve');
        setNextCircuitFlag('https://flagsapi.com/CA/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'catalunya':
        setNextRace('catalunya');
        setNextCircuitFlag('https://flagsapi.com/ES/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'red_bull_ring':
        setNextRace('red_bull_ring');
        setNextCircuitFlag('https://flagsapi.com/AT/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'silverstone':
        setNextRace('silverstone');
        setNextCircuitFlag('https://flagsapi.com/GB/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'hungaroring':
        setNextRace('hungaroring');
        setNextCircuitFlag('https://flagsapi.com/HU/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'spa':
        setNextRace('spa');
        setNextCircuitFlag('https://flagsapi.com/BE/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'zandvoort':
        setNextRace('zandvoort');
        setNextCircuitFlag('https://flagsapi.com/NL/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'monza':
        setNextRace('monza');
        setNextCircuitFlag('https://flagsapi.com/IT/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'baku':
        setNextRace('baku');
        setNextCircuitFlag('https://flagsapi.com/AZ/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'marina_bay':
        setNextRace('marina_bay');
        setNextCircuitFlag('https://flagsapi.com/SG/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'americas':
        setNextRace('americas');
        setNextCircuitFlag('https://flagsapi.com/US/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'rodriguez':
        setNextRace('rodriguez');
        setNextCircuitFlag('https://flagsapi.com/MX/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'interlagos':
        setNextRace('interlagos');
        setNextCircuitFlag('https://flagsapi.com/BR/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      case 'vegas':
        setNextRace('vegas');
        setNextCircuitFlag('https://flagsapi.com/US/flat/32.png');
        setNextRaceType('Power');
        setCircuitTypeColor({color: 'red'})
        break;
      case 'losail':
        setNextRace('losail');
        setNextCircuitFlag('https://flagsapi.com/QA/flat/32.png');
        setNextRaceType('High Downforce');
        setCircuitTypeColor({color: 'yellow'})
        break;
      case 'yas_marina':
        setNextRace('yas_marina');
        setNextCircuitFlag('https://flagsapi.com/AE/flat/32.png');
        setNextRaceType('Balanced');
        setCircuitTypeColor({color: 'orange'})
        break;
      default:
        break;
    }
  };
  

  const [line5Style, setLine5Style] = useState({
    width: 113.20,
    height: 0,
    border: '1px #87C75F solid',
  });

  const [line7Style, setLine7Style] = useState({
    width: 126.696,
    height: 0,
    border: '1px #405E2C solid',
  });

  const [line8Style, setLine8Style] = useState({
    width: 105.92,
    height: 0,
    border: '1px #405E2C solid',
  });
  
  const { showCluster1, setShowCluster1,
          showCluster2, setShowCluster2,
          showCluster3, setShowCluster3 } = useContext(MyContext);

  let recordedWidth = window.innerWidth;
          
  useEffect(() => {
    const handleNarrowerThan480 = () => {
      setShowCluster1(true);
      setShowCluster2(true);
      setShowCluster3(true);
      setShowCluster2(false);
      setShowCluster3(false);

      setShowFeature1(true);
      setShowFeature2(true);
      setShowFeature3(true);
      setShowFeature2(false);
      setShowFeature3(false);

      setLine5Style({height: 0, border: '1.50px #87C75F solid'});
      setLine7Style({height: 0, border: '1.50px #405E2C solid'});
      setLine8Style({height: 0, border: '1.50px #405E2C solid'});
    };

    const handleInitialScreenWidth = () => {
      if (window.innerWidth < 480) {
        handleNarrowerThan480();
      }
    };

    handleInitialScreenWidth();

    const handleResizeUp = () => {
      let currentWidth = window.innerWidth;
        if (recordedWidth !== currentWidth) {
          if (window.innerWidth < 480) {
            handleNarrowerThan480();
          }
        }
    };

    handleResizeUp();
    window.addEventListener('resize', handleResizeUp);

    return () => {
      window.removeEventListener('resize', handleResizeUp);
    };
  }, []); 

  useEffect(() => {
    const handleWiderThan480 = () => {
      setShowCluster1(true);
      setShowCluster2(true);
      setShowCluster3(true);

      setShowFeature1(true);
      setShowFeature2(true);
      setShowFeature3(true);
    };  
  
    const handleResizeDown = () => {
      if (window.innerWidth > 480) {
        handleWiderThan480();
      }
    };

    handleResizeDown();
    window.addEventListener('resize', handleResizeDown);

    return () => {
      window.removeEventListener('resize', handleResizeDown);
    };
  }, []);

  const showOnlyCluster1 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster2(false);
    setShowCluster3(false);

    setLine5Style({height: 0, border: '1.50px #87C75F solid'});
    setLine7Style({height: 0, border: '1.50px #405E2C solid'});
    setLine8Style({height: 0, border: '1.50px #405E2C solid'});
  };

  const showOnlyCluster2 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster1(false);
    setShowCluster3(false);

    setLine5Style({height: 0, border: '1.50px #405E2C solid'});
    setLine7Style({height: 0, border: '1.50px #87C75F solid'});
    setLine8Style({height: 0, border: '1.50px #405E2C solid'});
  };

  const showOnlyCluster3 = () => {
    setShowCluster1(true);
    setShowCluster2(true);
    setShowCluster3(true);
    setShowCluster1(false);
    setShowCluster2(false);

    setLine5Style({height: 0, border: '1.50px #405E2C solid'});
    setLine7Style({height: 0, border: '1.50px #405E2C solid'});
    setLine8Style({height: 0, border: '1.50px #87C75F solid'});
  };

  const showOnlyFeature1 = () => {
    setShowFeature1(true);
    setShowFeature2(true);
    setShowFeature3(true);
    setShowFeature2(false);
    setShowFeature3(false);
  };

  const showOnlyFeature2 = () => {
    setShowFeature1(true);
    setShowFeature2(true);
    setShowFeature3(true);
    setShowFeature1(false);
    setShowFeature3(false);
  };

  const showOnlyFeature3 = () => {
    setShowFeature1(true);
    setShowFeature2(true);
    setShowFeature3(true);
    setShowFeature1(false);
    setShowFeature2(false);
  };
  
  // Getting driver names, current season results and events list
  useEffect(() => {
    fetchCurrentStandings().then((results) => setStandings(results));

    fetchCurrentSeasonRaceResults().then((results) =>
      setCurrentSeasonRaceResults(results)
    );

    fetchEventList().then((results) => setEventList(results));
  }, []);

  useEffect (() => {
    const fullNames = standings.map(function (element) {
      return `${element.Driver.givenName} ${element.Driver.familyName}`;
    });
    //Remove the line below after 2024 season starts to ensure no limit on number of drivers reported in table
    fullNames.length = 21;
    setNames(fullNames);

    const driverIds = standings.map(function (element) {
      return `${element.Driver.driverId}`;
    });
    setDriverIds(driverIds);
  }, [standings]);

  // Update last five race results
  useEffect(() => {
    const lastFiveRaceResults = currentSeasonRaceResults
      //making copy for reverse
      .slice()
      .reverse()
      .slice(0, 5)
      .reverse();
    setLastFiveRaceResults(lastFiveRaceResults);
    setLastFiveRacesDataFetched(true);
  }, [currentSeasonRaceResults]);

  // Set next race data

  useEffect(() => {
    /*May need to add an if statement to handle situations when lastFiveRaceResults.length <5. See state setter
    function for nextRaceTypeHistory*/
    if (lastFiveRaceResults.length === 5) {
      let nextCircuitId = "red_bull_ring";
      let nextCircuitEventName;
      let rawNextCircuitEventDate = "2024-03-02";
      let rawNextCircuitEventFlag;
      let nextCircuitName;
      let nextRaceFlag;
      let nextCircuitType;
      let nextCircuitTypeColor;

      /*Code below is temporarily commented out until the API updates its current season as "2024". Once update
       occurs, enable code below and remove "= "bahrain"" from let nextCircuitId. This will re-activate automated 
       selection of nextCircuitId. Also, remove "= "2024-03-02"" from let rawNextCircuitEventDate to automate date selection.
      let lastRound = Number(lastFiveRaceResults[4]?.round);
      let nextRound = (lastRound += 1);
      for (let i = 0; i < eventList.length; i++) {
        if (Number(eventList[i].round) === nextRound) {
          nextCircuitId = eventList[i].Circuit.circuitId;
          rawNextCircuitEventDate = eventList[i].date;
        }
      }
      */
      let nextCircuitEventDate = formatDate(rawNextCircuitEventDate)
      
      for (let i = 0; i < circuitTypes.length; i++) {
        if (circuitTypes[i].circuitIds.includes(nextCircuitId)) {
          nextCircuitType = circuitTypes[i].circuitType;
          nextCircuitTypeColor = circuitTypes[i].color;
        }
      }

      for (let i = 0; i < nextRaceBanners.length; i++) {
        if (nextRaceBanners[i].circuitId == nextCircuitId) {
          nextCircuitEventName = nextRaceBanners[i].raceName;
          nextCircuitName = nextRaceBanners[i].circuit;
        }
      }

      for (let i = 0; i < flags.length; i++) {
        if (flags[i].circuitId == nextCircuitId) {
          nextRaceFlag = flags[i].url;
          rawNextCircuitEventFlag = flags[i].url;
        }
      }

      let nextCircuitEventFlag = rawNextCircuitEventFlag
        .replace("32", "48")
        .replace("flat", "shiny");

      setNextRace(nextCircuitId);
      setNextCircuitFlag(nextRaceFlag);
      setNextEventName(nextCircuitEventName);
      setNextEventDate(nextCircuitEventDate);
      setNextEventFlag(nextCircuitEventFlag);
      setNextEventCircuit(nextCircuitName);
      setNextRaceType(nextCircuitType);
      setCircuitTypeColor(nextCircuitTypeColor);
    }
  }, [eventList, lastFiveRaceResults]);

  useEffect(() => {
    console.log(nextEventFlag)
  }, [nextEventFlag]);

  function getNextCircuitProperName (nextRace, nextRaceType) {
    let nextCircuitName;
    let nextCircuitTypeName;
    for (let i = 0; i < circuitTypes.length; i++) {
      for (let x = 0; x < circuitTypes[i].circuitIds.length; x++)
        if (nextRaceType == circuitTypes[i].circuitType &&
          nextRace == circuitTypes[i].circuitIds[x]) {
            nextCircuitName = circuitTypes[i].circuitNames[x].toUpperCase();
            nextCircuitTypeName = circuitTypes[i].circuitType.toUpperCase(); 
        }
        setNextCircuitProperName(nextCircuitName);
        setNextCircuitTypeProperName(nextCircuitTypeName);
    }
  } 

  useEffect(() => {
    getNextCircuitProperName (nextRace, nextRaceType)
  }, [nextRace, nextRaceType]);

  // Update next race history
  useEffect(() => {
    if (nextRace != "") {
      fetchNextTrackData(nextRace).then((results) => setNextRaceHistory(results));
      setNextRaceDataFetched(true);
      setTableDataPopulated(true);
    };
  }, [nextRace]);

  useEffect(() => {
    if (nextRaceType != "" && currentSeasonRaceResults.length != 0) {
      /**
       * This function returns full race results for the last 5 races that have a circuit type which matches the next race's circuit type. (I.e. If the next race is a power circuit, it will get the last 5 race results from power circuits)
       */
      function getCurrentSeasonTypeMatches(nextRaceType) {
        const typeMatch = circuitTypes.find(
          (type) => type.circuitType === nextRaceType
        );
        const circuitTypeMatches = typeMatch ? typeMatch.circuitIds : [];

        const circuitTypeMatchesMostRecent = currentSeasonRaceResults.filter(
          (result) => circuitTypeMatches.includes(result.Circuit.circuitId)
        );

        setCurrentSeasonCircuitTypeMatches(circuitTypeMatchesMostRecent);
      };
      getCurrentSeasonTypeMatches(nextRaceType);
    };
  }, [currentSeasonRaceResults, nextRaceType]);
  
  useEffect(() => {
    if (currentSeasonCircuitTypeMatches.length >= 5) {
      const results = currentSeasonCircuitTypeMatches.slice(-5);
      setNextRaceTypeHistory(results);
    } else if (currentSeasonCircuitTypeMatches.length < 5) {
        function getLastSeasonRaceResults() {
          fetchPreviousSeasonRaceResults().then((results) =>
            setPreviousSeasonRaceResults(results)
          );
        }
        setTimeout(getLastSeasonRaceResults(), 1000);

        const previousSeasonTypeMatch = circuitTypes.find(
          (type) => type.circuitType === nextRaceType
        );
        const previousSeasonsCircuitTypeMatches = previousSeasonTypeMatch
          ? previousSeasonTypeMatch.circuitIds
          : [];
        const previousSeasonsCircuitTypeMatchesMostRecent =
          previousSeasonRaceResults.filter((result) =>
            previousSeasonsCircuitTypeMatches.includes(
              result.Circuit.circuitId
            )
          );
        const bothSeasonsCircuitTypeMatchesMostRecent =
            previousSeasonsCircuitTypeMatchesMostRecent.concat(
              currentSeasonCircuitTypeMatches
            );
          const results = bothSeasonsCircuitTypeMatchesMostRecent.slice(-5);
          setNextRaceTypeHistory(results);
          setNextRaceTypeDataFetched(true);

    }
  }, [currentSeasonCircuitTypeMatches]);

  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
      
      const raceFlags = [];
      
      async function mapFlagsToHeadings() {

        const flagHeading = {
          name: "Driver",
          lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        };

        for (let i = 0; i < flagHeading.lastFiveRaces.length; i++) {
          flagHeading.lastFiveRaces[i] = lastFiveRaceResults[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.lastFiveRaces[i] == flags[z].raceName) {
              flagHeading.lastFiveRaces[i] = flags[z].flagImage
            }
          }
        }

        for (let i = 0; i < flagHeading.nextRaceResults.length; i++) {
          flagHeading.nextRaceResults[i] = nextRaceHistory[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.nextRaceResults[i] == flags[z].raceName) {
              flagHeading.nextRaceResults[i] = flags[z].flagImage;
            }
          }
        }

        for (let i = 0; i < flagHeading.nextRaceTypeResults.length; i++) {
          flagHeading.nextRaceTypeResults[i] = nextRaceTypeHistory[i].raceName;
          for (let z = 0; z < flags.length; z++) {
            if (flagHeading.nextRaceTypeResults[i] == flags[z].raceName) {
              flagHeading.nextRaceTypeResults[i] = flags[z].flagImage
            }
          }
        }

        for (let z = 0; z < flags.length; z++) {
          if (flagHeading.nextRaceResults[0] == flags[z].raceName) {
            nextRaceFlag = flags[z].flagImage.src;
          }
        }

        raceFlags.push(flagHeading);
        setFlagHeadingsContent(raceFlags);
      }
      
      mapFlagsToHeadings();
    };
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
      
      const raceNames = [];
      
      async function mapRaceNamesToHeadings() {

        const tableHeading = {
          name: "Driver",
          lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          lastFiveRacesReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceResultsReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
          nextRaceTypeResultsReports: ["N/A", "N/A", "N/A", "N/A", "N/A"],
        };

        for (let i = 0; i < tableHeading.lastFiveRaces.length; i++) {
          tableHeading.lastFiveRaces[i] = lastFiveRaceResults[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.lastFiveRaces[i] == raceTitles[z].raceName) {
              tableHeading.lastFiveRaces[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.lastFiveRaces[i] = tableHeading.lastFiveRaces[i].concat("\n", lastFiveRaceResults[i].season)
        }

        for (let i = 0; i < tableHeading.nextRaceResults.length; i++) {
          tableHeading.nextRaceResults[i] = nextRaceHistory[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.nextRaceResults[i] == raceTitles[z].raceName) {
              tableHeading.nextRaceResults[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.nextRaceResults[i] = tableHeading.nextRaceResults[i].concat("\n", nextRaceHistory[i].season)
        }

        for (let i = 0; i < tableHeading.nextRaceTypeResults.length; i++) {
          tableHeading.nextRaceTypeResults[i] = nextRaceTypeHistory[i].raceName;
          for (let z = 0; z < raceTitles.length; z++) {
            if (tableHeading.nextRaceTypeResults[i] == raceTitles[z].raceName) {
              tableHeading.nextRaceTypeResults[i] = raceTitles[z].raceHeader
            }
          }
          tableHeading.nextRaceTypeResults[i] = tableHeading.nextRaceTypeResults[i].concat("\n", nextRaceTypeHistory[i].season)
        }

        for (let i = 0; i < tableHeading.lastFiveRacesReports.length; i++) {
          const season = lastFiveRaceResults[i].season;
          const rawRaceName = lastFiveRaceResults[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.lastFiveRacesReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };

        for (let i = 0; i < tableHeading.nextRaceResultsReports.length; i++) {
          const season = nextRaceHistory[i].season;
          const rawRaceName = nextRaceHistory[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.nextRaceResultsReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };

        for (let i = 0; i < tableHeading.nextRaceTypeResultsReports.length; i++) {
          const season = nextRaceTypeHistory[i].season;
          const rawRaceName = nextRaceTypeHistory[i].raceName;
          const raceName = rawRaceName.replace(/ /g, "_");
          tableHeading.nextRaceTypeResultsReports[i] = `https://en.wikipedia.org/wiki/${season}_${raceName}#Race_report`;
        };

        raceNames.push(tableHeading);
        setTableHeadingsContent(raceNames);
      }
      mapRaceNamesToHeadings();
    };
  }, [lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect(() => {
    if (lastFiveRaceResults != 0 && nextRaceHistory !=0 && nextRaceTypeHistory !=0) {
     
      const driverData = [];
      /**
       * This function creates a variable called driver - each driver has props that are updated based on three metrics:
       * 1. Results from the last five races.
       * 2. Results from the next five races held at the next circuit.
       * 3. Results from the last five races held circuits that have the same circuit type as the next circuit.
       * After each driver's props are fully updated, the driver object is pushed to an empty array called "driverData".
       * The driverData array is used to set the state of driverTableData.
       */
      async function mapNamesAndResultsToDrivers() {
        names.forEach((name, i) => {
          const driver = {
            name: names[i],
            driverId: driverIds[i],
            lastFiveRaces: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            nextRaceResults: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            nextRaceTypeResults: [{positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}, {positionText: "N/A"}],
            tableAverages: {
              lastFiveRaces: ["N/A", "N/A", "N/A", "N/A", "N/A"],
              nextRaceResults: ["N/A", "N/A", "N/A", "N/A", "N/A"], 
              nextRaceTypeResults: ["N/A", "N/A", "N/A", "N/A", "N/A"]
            },
            allRaceResults: [],
            careerData: {
              raceResultsBySeason: [
                {season: 2005,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                  //function: function goes here
                },
                {season: 2006,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2015,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2016,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2017,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2018,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2019,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2020,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2021,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2022,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                },
                {season: 2023,
                  raceResults: [],
                  raceFinishes: [],
                  meanRaceFinish: ""
                }
              ]
            }
          };

          for (let z = 0; z < lastFiveRaceResults.length; z++) {
            for (let i = 0; i < lastFiveRaceResults[0].Results.length; i++) {
              if (
                lastFiveRaceResults[z].Results[i].Driver.driverId ===
                driver.driverId
              ) {
                driver.lastFiveRaces[z] =
                  lastFiveRaceResults[z].Results[i];
              }
            }
          }

          for (let z = 0; z < nextRaceHistory.length; z++) {
            for (let i = 0; i < nextRaceHistory[0].Results.length; i++) {
              if (
                nextRaceHistory[z].Results[i]?.Driver.driverId ===
                driver.driverId
              ) {
                driver.nextRaceResults[z] =
                  nextRaceHistory[z].Results[i];
              }
            }
          }

          for (let z = 0; z < nextRaceTypeHistory?.length; z++) {
            for (let i = 0; i < nextRaceTypeHistory[0].Results.length; i++) {
              if (
                nextRaceTypeHistory[z].Results[i].Driver.driverId ===
                driver.driverId
              ) {
                driver.nextRaceTypeResults[z] =
                  nextRaceTypeHistory[z].Results[i];
              }
            }
          }
          driverData.push(driver);
        });

        setDriverTableData(driverData);
      }
      mapNamesAndResultsToDrivers();
    };

    
  }, [lastFiveRaceResults, names, nextRaceHistory, nextRaceTypeHistory]);

  useEffect (() => {
    getDriverAverages(driverTableData, allCareerData)
  }, [driverTableData]);

  useEffect (() => {
    matchAveragesWithTableResults(driverTableData, lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory);
  }, [driverTableData, lastFiveRaceResults, nextRaceHistory, nextRaceTypeHistory]);

  useEffect (() => {
    rateTableResults(driverTableData)
  }, [driverTableData]);


  function test() {
    if (tableDataPopulated == true) {
      setAllTableDataPopulated(true)
    }
  };

  useEffect (() => {
    test()
  }, [tableDataPopulated]);
  
  function formatRow(
    name,
    fiveRacesAgo,
    fourRacesAgo,
    threeRacesAgo,
    twoRacesAgo,
    oneRaceAgo,
    nextRace1,
    nextRace2,
    nextRace3,
    nextRace4,
    nextRace5,
    nextRaceType1,
    nextRaceType2,
    nextRaceType3,
    nextRaceType4,
    nextRaceType5,
    fiveRacesAgoReport,
    fourRacesAgoReport,
    threeRacesAgoReport,
    twoRacesAgoReport,
    oneRaceAgoReport,
    nextRace1Report,
    nextRace2Report,
    nextRace3Report,
    nextRace4Report,
    nextRace5Report,
    nextRaceType1Report,
    nextRaceType2Report,
    nextRaceType3Report,
    nextRaceType4Report,
    nextRaceType5Report
  ) {
    return {
      name,
      fiveRacesAgo,
      fourRacesAgo,
      threeRacesAgo,
      twoRacesAgo,
      oneRaceAgo,
      nextRace1,
      nextRace2,
      nextRace3,
      nextRace4,
      nextRace5,
      nextRaceType1,
      nextRaceType2,
      nextRaceType3,
      nextRaceType4,
      nextRaceType5,
      fiveRacesAgoReport,
      fourRacesAgoReport,
      threeRacesAgoReport,
      twoRacesAgoReport,
      oneRaceAgoReport,
      nextRace1Report,
      nextRace2Report,
      nextRace3Report,
      nextRace4Report,
      nextRace5Report,
      nextRaceType1Report,
      nextRaceType2Report,
      nextRaceType3Report,
      nextRaceType4Report,
      nextRaceType5Report
    };
  }

  useEffect(() => {
    setFlagHeadings(
      flagHeadingsContent.map((flagHeading) =>
        formatRow(
          flagHeading.name,
          flagHeading.lastFiveRaces[0],
          flagHeading.lastFiveRaces[1],
          flagHeading.lastFiveRaces[2],
          flagHeading.lastFiveRaces[3],
          flagHeading.lastFiveRaces[4],
          flagHeading.nextRaceResults[0],
          flagHeading.nextRaceResults[1],
          flagHeading.nextRaceResults[2],
          flagHeading.nextRaceResults[3],
          flagHeading.nextRaceResults[4],
          flagHeading.nextRaceTypeResults[0],
          flagHeading.nextRaceTypeResults[1],
          flagHeading.nextRaceTypeResults[2],
          flagHeading.nextRaceTypeResults[3],
          flagHeading.nextRaceTypeResults[4]
        )
      )
    );
  }, [flagHeadingsContent]);

  useEffect(() => {
    setTableHeadings(
      tableHeadingsContent.map((tableHeading) =>
        formatRow(
          tableHeading.name,
          tableHeading.lastFiveRaces[0],
          tableHeading.lastFiveRaces[1],
          tableHeading.lastFiveRaces[2],
          tableHeading.lastFiveRaces[3],
          tableHeading.lastFiveRaces[4],
          tableHeading.nextRaceResults[0],
          tableHeading.nextRaceResults[1],
          tableHeading.nextRaceResults[2],
          tableHeading.nextRaceResults[3],
          tableHeading.nextRaceResults[4],
          tableHeading.nextRaceTypeResults[0],
          tableHeading.nextRaceTypeResults[1],
          tableHeading.nextRaceTypeResults[2],
          tableHeading.nextRaceTypeResults[3],
          tableHeading.nextRaceTypeResults[4],
          tableHeading.lastFiveRacesReports[0],
          tableHeading.lastFiveRacesReports[1],
          tableHeading.lastFiveRacesReports[2],
          tableHeading.lastFiveRacesReports[3],
          tableHeading.lastFiveRacesReports[4],
          tableHeading.nextRaceResultsReports[0],
          tableHeading.nextRaceResultsReports[1],
          tableHeading.nextRaceResultsReports[2],
          tableHeading.nextRaceResultsReports[3],
          tableHeading.nextRaceResultsReports[4],
          tableHeading.nextRaceTypeResultsReports[0],
          tableHeading.nextRaceTypeResultsReports[1],
          tableHeading.nextRaceTypeResultsReports[2],
          tableHeading.nextRaceTypeResultsReports[3],
          tableHeading.nextRaceTypeResultsReports[4]
        )
      )
    );
  }, [tableHeadingsContent]);

  function formatDataRow(
    name,
    fiveRacesAgo,
    fourRacesAgo,
    threeRacesAgo,
    twoRacesAgo,
    oneRaceAgo,
    nextRace1,
    nextRace2,
    nextRace3,
    nextRace4,
    nextRace5,
    nextRaceType1,
    nextRaceType2,
    nextRaceType3,
    nextRaceType4,
    nextRaceType5,
    fiveRacesAgoRating,
    fourRacesAgoRating,
    threeRacesAgoRating,
    twoRacesAgoRating,
    oneRaceAgoRating,
    nextRace1Rating,
    nextRace2Rating,
    nextRace3Rating,
    nextRace4Rating,
    nextRace5Rating,
    nextRaceType1Rating,
    nextRaceType2Rating,
    nextRaceType3Rating,
    nextRaceType4Rating,
    nextRaceType5Rating
  ) {
    return {
      name,
      fiveRacesAgo,
      fourRacesAgo,
      threeRacesAgo,
      twoRacesAgo,
      oneRaceAgo,
      nextRace1,
      nextRace2,
      nextRace3,
      nextRace4,
      nextRace5,
      nextRaceType1,
      nextRaceType2,
      nextRaceType3,
      nextRaceType4,
      nextRaceType5,
      fiveRacesAgoRating,
      fourRacesAgoRating,
      threeRacesAgoRating,
      twoRacesAgoRating,
      oneRaceAgoRating,
      nextRace1Rating,
      nextRace2Rating,
      nextRace3Rating,
      nextRace4Rating,
      nextRace5Rating,
      nextRaceType1Rating,
      nextRaceType2Rating,
      nextRaceType3Rating,
      nextRaceType4Rating,
      nextRaceType5Rating,
    };
  }

  useEffect(() => {
    setRacerData(
      driverTableData.map((driver) =>
        formatDataRow(
          driver.name,
          driver.lastFiveRaces[0].positionText,
          driver.lastFiveRaces[1].positionText,
          driver.lastFiveRaces[2].positionText,
          driver.lastFiveRaces[3].positionText,
          driver.lastFiveRaces[4].positionText,
          driver.nextRaceResults[0].positionText,
          driver.nextRaceResults[1].positionText,
          driver.nextRaceResults[2].positionText,
          driver.nextRaceResults[3].positionText,
          driver.nextRaceResults[4].positionText,
          driver.nextRaceTypeResults[0].positionText,
          driver.nextRaceTypeResults[1].positionText,
          driver.nextRaceTypeResults[2].positionText,
          driver.nextRaceTypeResults[3].positionText,
          driver.nextRaceTypeResults[4].positionText,
          driver.tableAverages.lastFiveRaces[0],
          driver.tableAverages.lastFiveRaces[1],
          driver.tableAverages.lastFiveRaces[2],
          driver.tableAverages.lastFiveRaces[3],
          driver.tableAverages.lastFiveRaces[4],
          driver.tableAverages.nextRaceResults[0],
          driver.tableAverages.nextRaceResults[1],
          driver.tableAverages.nextRaceResults[2],
          driver.tableAverages.nextRaceResults[3],
          driver.tableAverages.nextRaceResults[4],
          driver.tableAverages.nextRaceTypeResults[0],
          driver.tableAverages.nextRaceTypeResults[1],
          driver.tableAverages.nextRaceTypeResults[2],
          driver.tableAverages.nextRaceTypeResults[3],
          driver.tableAverages.nextRaceTypeResults[4]
        )
      ),
    );
  }, [driverTableData]);

  useEffect(() => {
    console.log(racerData)
  }, [racerData]);
  
  // Function to toggle the mobile site's menu visibility
  const toggleMenu = () => {
    if (isMenuOpen) {
      setMenuOpen(false)
    } else {setMenuOpen(true)}
  };

  const reloadPage = () => {
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <>
      <div className="iphone">
        <div className="div">
          <div className="overlap">
            <div className="overlap-group">
              
              <img className="heroBannerMobile" src={heroBannerMobile} alt="an image of a Williams F1 car in Monaco" />
              <img className="heroBannerDesktop" src={heroBannerDesktop} alt="an image of a Williams F1 car in Monaco" />
              <div className="rectangle" />
              <div className="rectangle-2" />
              <p className="pDesktop">Live F1 form guide and driver data lets you predict results with confidence.</p>
              <div className="text-wrapper-Desktop">The Final Lap</div>
              <div className="menuTextWrapper" onClick={toggleMenu}>{isMenuOpen ? 'Close' : 'Menu'}</div>
              
              <div className="box"> 
                <div className={`iphone-menu ${isMenuOpen ? 'open' : 'closed'}`}>
                  <div className="overlap-group">
                    <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Entries" target="_blank" rel="noreferrer">
                      <div className="text-wrapper">Drivers</div>
                    </a>
                    <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Calendar" target="_blank" rel="noreferrer">
                      <div className="divX">Schedule</div>
                    </a>
                    <div className="text-wrapper-2">About</div>
                    <div className="text-wrapper-3" onClick={handleButtonClickMobile}>Features</div>
                    <div className="mobileMenuLine1" />
                    <div className="mobileMenuLine2" />
                    <div className="mobileMenuLine3" />
                  </div>
                </div>
              </div>

              <div className="groupMobile">
                <div className="overlap-2">
                  <p className="p">Live F1 form guide and driver data lets you predict results with confidence.</p>
                  <div className="text-wrapper-2">The Final Lap</div>
                  <div className="nextRaceBoxMobile">
                    <img className="nextRaceBoxImageMobile" alt="Rectangle" src={nextRaceBox} />
                    <div className="text-wrapperAMobile">Next Race</div>
                    <div className="text-wrapperBMobile">Date</div>
                    <div className="text-wrapperCMobile">Circuit</div>
                    <div className="text-wrapperDMobile">{nextEventName}</div>
                    <div className="text-wrapperEMobile">{nextEventDate}</div>
                    <div className="text-wrapperFMobile">{nextEventCircuit}</div>
                  </div>
                </div>
              </div>
            </div>
            <img className="siteLogo" alt="site logo: stylized initials 'FL'" src={siteLogo} onClick={reloadPage} style={{ cursor: 'pointer' }} />
          </div>
          <div className="nextRaceBoxDesktop">
            <div className="text-wrapperADesktop">Next Race</div>
            <div className="text-wrapperBDesktop">Date</div>
            <div className="text-wrapperCDesktop">Circuit</div>
            <div className="text-wrapperDDesktop">{nextEventName}</div>
            <div className="text-wrapperEDesktop">{nextEventDate}</div>
            <div className="nextRaceBoxCircuitContainer">
              <div className="text-wrapperFDesktop">{nextEventCircuit}</div>
              <img className="nextRaceBoxFlag" src={nextEventFlag} />
            </div>
          </div>
          <img className="nextRaceBoxImageDesktop" alt="Rectangle" src={nextRaceBox} />
          
          <div className="footerBoxMobile" ref={targetElementRefMobile}>
            <div className="footerBoxBackgroundMobile" />
            <img className="siteLogoFooterMobile" alt="site logo: stylized initials 'FL'" src={footerSiteLogo} onClick={reloadPage} style={{ cursor: 'pointer' }} />
            <p className="copyrightMobile">© 2024 The Final Lap</p>
            <p className="designCreditMobile">Site Design by Abigail Z</p>
            <a href="https://www.linkedin.com/in/abigail-zhuk/" target="_blank" rel="noreferrer">
              <img className="linkedInMobileDesigner" alt="LinkedIn logo" src={linkedInMobile} />
            </a>
            <div className="flexcontainerMobile">
              <p className="textMobile">
                <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Entries" target="_blank" rel="noreferrer">
                  <span className="spanMobile">
                    Drivers
                    <br />
                  </span>
                </a>
              </p>
              <p className="textMobile">
                <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Calendar" target="_blank" rel="noreferrer">
                  <span className="span">Schedule</span>
                </a>
              </p>
            </div>
            <div className="flexcontainer-2-Mobile">
              <p className="textMobile">
                <span className="spanMobile" onClick={handleButtonClickMobile} style={{ cursor: 'pointer' }}>
                  Features
                  <br />
                </span>
              </p>
              <p className="textMobile">
                <span className="spanMobile">
                  About
                  <br />
                </span>
              </p>
              <p className="textMobile">
                <span className="spanMobile">{""}</span>
              </p>
            </div>
            <a href="https://github.com/MarkTaylor7" target="_blank" rel="noreferrer">
              <img className="gitHubMobile" alt="Github logo" src={gitHubMobile} />
            </a>
            <a href="https://www.linkedin.com/in/marktaylor27" target="_blank" rel="noreferrer">
              <img className="linkedInMobile" alt="LinkedIn logo" src={linkedInMobile} />
            </a>
            <div className="line-2"></div>
          </div>

          <div className="footerBoxDesktop">
            <div className="footerBoxBackgroundDesktop" />
            <p className="designCreditDesktop">Site Design by Abigail Z</p>
            <a href="https://www.linkedin.com/in/abigail-zhuk" target="_blank" rel="noreferrer">
              <img className="linkedInDesktopDesigner" alt="Vector" src={linkedInDesktop} />
            </a>
            <p className="copyrightDesktop">© 2024 The Final Lap</p>
            <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Calendar" target="_blank" rel="noreferrer">
              <div className="footer-text-wrapper-1">Schedule</div>
            </a>
            <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Entries" target="_blank" rel="noreferrer">
              <div className="footer-text-wrapper-2">Drivers</div>
            </a>
            <div className="footer-text-wrapper-3" onClick={handleButtonClick} style={{ cursor: 'pointer' }}>Features</div>
            <div className="footer-text-wrapper-4">About</div>
            <div className="footer-text-wrapper-5">The Final Lap</div>
            <img className="siteLogoFooterDesktop" alt="Group" src={siteLogoFooterDesktop} onClick={reloadPage} style={{ cursor: 'pointer' }} />
            <a href="https://github.com/MarkTaylor7" target="_blank" rel="noreferrer">
              <img className="gitHubDesktop" alt="Vector" src={gitHubDesktop} />
            </a>
            <a href="https://www.linkedin.com/in/marktaylor27" target="_blank" rel="noreferrer">
              <img className="linkedInDesktop" alt="Vector" src={linkedInDesktop} />
            </a>
          </div>
          
          <div className={`desktop-sticky-menu ${isSticky ? 'sticky' : ''}`}>
            <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Entries" target="_blank" rel="noreferrer">
              <div className="text-wrapper-18">Drivers</div>
            </a>
            <a href="https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship#Calendar" target="_blank" rel="noreferrer">
              <div className="text-wrapper-19">Schedule</div>
            </a>
            <div className="text-wrapper-21" onClick={handleButtonClick} style={{ cursor: 'pointer' }}>Features</div>
            <div className="text-wrapper-20">About</div>
            <div className="desktopMenuLine1" />
            <div className="desktopMenuLine2" />
            <div className="desktopMenuLine3" />
            <div className="desktopMenuLine4" />
            <div className="desktopMenuLine5" />
            <img className="group-3" alt="Site Logo" src={siteLogoDesktop} onClick={reloadPage} style={{ cursor: 'pointer' }} />
          </div>

          <div className="text-wrapper-10">Race Outlook</div>
          <div className="raceOutlookLine" />
          <div className="overlap-table">
            <DenseTable data1={flagHeadings} data2={tableHeadings} data3={racerData} data4={nextCircuitProperName} data5={nextCircuitTypeProperName}
            boolean1={lastFiveRacesDataFetched} boolean2={nextRaceDataFetched} boolean3={nextRaceTypeDataFetched} boolean4={allTableDataPopulated}
            />
          </div>

          <div className="text-wrapper-6" ref={targetElementRef}>Final Lap Features</div>
          <div className="featuresLine" />

          {showFeature1 && <div className="feature-container-1">
            <div className="feature-card-container-1">
              <div className="feature-card-1">
                <img className="imageFeature1" alt="Cursor highlighting table column header" src={feature1} />
              </div>
              <img className="leftArrow" alt="Arrow pointing left" src={leftArrow} onClick={showOnlyFeature3} />
              <img className="rightArrow" alt="Arrow pointing right" src={rightArrow} onClick={showOnlyFeature2} />
            </div>
            <div className="feature-header-1">
              <div className="feature-header-text">Feature</div>
              <div className="feature-header-wrapper">
                <div className="feature-lines-container-1">
                  <div className="feature-line-1A"></div>
                  <div className="feature-line-2"></div>
                </div>
              </div>
            </div>
            <div className="feature-text-container-1">
              <div className="feature-text-wrapper-A">Get the Full Story</div>
              <p className="feature-text-wrapper-B">
                See an unusual race result and need more info? Click on the race header for a detailed report.
              </p>
            </div>
          </div>}

          {showFeature2 && <div className="feature-container-2">
            <div className="feature-card-2">
              <div className="card-section">
                <div className="card-text">Win</div>
              </div>
              <div className="card-section">
                <div className="card-text">Way Above Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">Above Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">Slightly Above Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">Average</div>
              </div>
              <div className="card-section">
                <div className="card-text">Slightly Below Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">Below Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">Way Below Avg</div>
              </div>
              <div className="card-section">
                <div className="card-text">DNF - Did Not Finish</div>
              </div>
              <img className="leftArrow" alt="Arrow pointing left" src={leftArrow} onClick={showOnlyFeature1} />
              <img className="rightArrowA" alt="Arrow pointing right" src={rightArrow} onClick={showOnlyFeature3} />
            </div>
            <div className="feature-header-2">
              <div className="feature-header-text">Feature</div>
              <div className="feature-header-wrapper">
                <div className="feature-lines-container-2">
                  <div className="feature-line-1"></div>
                  <div className="feature-line-2"></div>
                </div>
              </div>
            </div>
            <div className="feature-text-container-2">
              <div className="feature-text-wrapper-A">Context is King</div>
              <p className="feature-text-wrapper-B">
              Race results are measured against that driver's in-season averages so that you
              can spot the stand-out performances; good and bad.
              </p>
            </div>
          </div>}

          {showFeature3 && <div className="feature-container-3"> 
            <div className="feature-card-3">
              <div className="card-column">
                <div className="card-column-child">
                  <div className="card-column-child-text">POWER</div>
                </div>
                <div className="card-column-child">
                  <div className="card-column-child-text">BALANCED</div>
                </div>
                <div className="card-column-child">
                  <div className="card-column-child-text">HIGH<br/>DOWNFORCE</div>
                </div>
              </div>
              <div className="card-column">
                <div className="card-column-child">
                  <img className="circuit-svg" src={circuitMonza} />
                </div>
                <div className="card-column-child">
                  <img className="circuit-svg" src={circuitShanghai} />
                </div>
                <div className="card-column-child">
                  <img className="circuit-svg" src={circuitSuzuka} />
                </div>
              </div>
              <img className="leftArrow" alt="Arrow pointing left" src={leftArrow} onClick={showOnlyFeature2} />
              <img className="rightArrowA" alt="Arrow pointing right" src={rightArrow} onClick={showOnlyFeature1} />
            </div>
            <div className="feature-header-3">
              <div className="feature-header-text">Feature</div>
              <div className="feature-header-wrapper">
                <div className="feature-lines-container-3">
                  <div className="feature-line-1"></div>
                  <div className="feature-line-2"></div>
                </div>
              </div>
            </div>
            <div className="feature-text-container-3">
              <div className="feature-text-wrapper-A">Track the Trends</div>
              <p className="feature-text-wrapper-B">
                Circuits are grouped into one of three types, based on the demands they place on an F1 car. See how circuit characteristics affect driver and team performance.
              </p>
            </div>
          </div>}

          <div className="overlap-7">
            <div className="rectangle-6" onClick={showOnlyCluster1}>
              <img className="toggleButton" alt="Rectangle" src={toggleButton} />
              <div className="text-wrapper-11">Recent Form</div>
              <div className="line-5" style={line5Style}></div>
              <img className="toggleButton1Icon" src={lineChart} />
            </div>
          </div>
          
          <div className="overlap-11">
            <div className="rectangle-12" onClick={showOnlyCluster2}>
              <img className="toggleButton2" alt="Rectangle" src={toggleButton} />
              <div className="text-wrapper-12">Circuit History</div>
              <div className="line-7" style={line7Style}></div>
              <img className="toggleButton2Status" src={nextCircuitFlag} />
            </div>
          </div>

          <div className="overlap-12">
            <div className="rectangle-14" onClick={showOnlyCluster3}>
              <img className="toggleButton3" alt="Rectangle" src={toggleButton} />
              <div className="text-wrapper-13">Circuit Type</div>
              <div className="line-8" style={line8Style}></div>
              <div className="toggleButton3Status" style={circuitTypeColor} >{nextCircuitTypeProperName}</div>
            </div>
          </div>

          <div className="dropdown-container">
            <select id="dropdown" value={selectedRace} onChange={handleDropdownChange}>
              <option value="">Select Circuit</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
