import React, { useRef } from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import { initValuesField } from "../../slices/matrixSlice";

const MatrixBuilder = () => {
  let inputColumns = useRef();
  let inputRows = useRef();
  let inputCells = useRef();
  const dispatch = useDispatch();

  /** set size of matrix**/
  const createMatrixOnClick = () => {
    if (inputColumns.current.value || inputRows.current.value || inputCells.current.value) {
      dispatch(initValuesField({
        columns: inputColumns.current.value,
        rows: inputRows.current.value,
        cells: inputCells.current.value
      }));
    }
  };

  return (
    <div className="box__matrix">
      <h1 className="box__matrix--title">Matrix builder</h1>

      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of columns</p>
        <input ref={inputColumns} type="number" step="1" id="theNumber" min="0"
               max="100" />
      </div>
      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of rows</p>
        <input ref={inputRows} type="number" step="1" id="theNumber" min="1"
               max="100" />
      </div>
      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of cells</p>
        <input ref={inputCells} type="number" step="1" id="theNumber" min="1"
               max="100" />
      </div>

      <button onClick={() => createMatrixOnClick()}
              className="box__matrix--btn">Create
      </button>
    </div>
  );
};

export default MatrixBuilder;
