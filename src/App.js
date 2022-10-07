import React from "react";
import "./App.css";
import MatrixBuilder from "./Components/Matrix/MatrixBuilder";
import { useSelector } from "react-redux";
import Matrix from "./Components/Matrix/Matrix";
import { matrixSelector } from "./slices/matrixSlice";

function App() {
  const { rows } = useSelector(matrixSelector);

  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          {rows ? <Matrix /> : <MatrixBuilder />}
        </div>
      </div>
    </div>
  );
}

export default App;
