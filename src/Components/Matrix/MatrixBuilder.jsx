import React, { useRef } from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import { initValuesField } from "../../slices/matrixSlice";

const MatrixBuilder = () => {
  let inputColumn = useRef();
  let inputRow = useRef();
  let inputCell = useRef();
  const dispatch = useDispatch();

  /** set size of matrix**/
  const createMatrixOnClick = () => {
    let inputColumns = inputColumn.current.value;
    let inputRows = inputRow.current.value;
    let inputCells = inputCell.current.value;
    if (inputColumns && inputRows <= 25) {
      dispatch(
        initValuesField({
          columns: inputColumns,
          rows: inputRows,
          cells: inputCells,
        })
      );
    } else {
      alert("max size of matrix 25X25");
    }
  };

  return (
    <div className="box__matrix">
      <h1 className="box__matrix--title">Matrix builder</h1>

      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of columns</p>
        <input
          ref={inputColumn}
          type="number"
          step="1"
          id="theNumber"
          min="0"
          max="25"
        />
      </div>
      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of rows</p>
        <input
          ref={inputRow}
          type="number"
          step="1"
          id="theNumber"
          min="1"
          max="25"
        />
      </div>
      <div className="box__matrix-field">
        <p className="box__matrix-label">Enter the number of cells</p>
        <input
          ref={inputCell}
          type="number"
          step="1"
          id="theNumber"
          min="1"
          max="25"
        />
      </div>

      <button
        onClick={() => createMatrixOnClick()}
        className="box__matrix--btn"
      >
        Create
      </button>
    </div>
  );
};

export default MatrixBuilder;
