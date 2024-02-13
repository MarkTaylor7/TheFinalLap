import { React } from "react";
import { MyContextProvider } from "./MyContext";
import App from "./App";
import ResultsTable from "./ResultsTable";

const ContextProvider = () => {
  return (
    <MyContextProvider>
      <App />
    </MyContextProvider>
  );
};

export default ContextProvider;
