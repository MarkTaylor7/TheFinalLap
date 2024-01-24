import { React } from "react";
import { MyContextProvider } from "./MyContext";
import App from "./App";
import DenseTable from "./DenseTable";

const ContextProvider = () => {
  return (
    <MyContextProvider>
      <App />
      <DenseTable />
    </MyContextProvider>
  );
};

export default ContextProvider;
