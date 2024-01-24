import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [showCluster1, setShowCluster1] = useState(true);
  const [showCluster2, setShowCluster2] = useState(true);
  const [showCluster3, setShowCluster3] = useState(true);

  return (
    <MyContext.Provider value={{ showCluster1, setShowCluster1, showCluster2, setShowCluster2, showCluster3, setShowCluster3 }}>
      {children}
    </MyContext.Provider>
  );
};
  

export { MyContext, MyContextProvider };