import { React } from "react";
import { MyContextProvider } from "./MyContext";
import App from "./App";
import DenseTable from "./DenseTable";

const ContextProvider = () => {
  return (
    <MyContextProvider>
      <App />
    </MyContextProvider>
  );
};

export default ContextProvider;
