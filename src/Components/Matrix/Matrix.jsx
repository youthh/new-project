import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addAverageCell,
  matrixSelector, rowsDelete,
  setMatrix, setShowPercent
} from "../../slices/matrixSlice";
import DrawMatrix from "./DrawMatrix";

const Matrix = () => {
  const { columns, rows, matrix, averageCell } = useSelector(matrixSelector);
  let [countOfColumn, setPageColumn] = useState([]);
  const dispatch = useDispatch();


  let countPercent = (item, element) => {
    let sum = item.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);

    return Math.round(element.amount * 100 / sum) + "%";
  };

  let showPercent = (index, e) => {
    dispatch(setShowPercent({ index, type: e.type }));
  };

  let deleteRowOnClick = (index) => {
    dispatch(rowsDelete(index));
  };

  let generateMatrix = (rows, columns) => {
    let arr = new Array(columns);
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        arr[i][j] = {
          amount: Math.floor(Math.random() * (999 - 100) + 100),
          id: Math.floor(Math.random() * (1000000)),
          isActive: false,
          isShowPercent: false
        };
      }

    }

    dispatch(setMatrix(arr));
  };

  let findAverage = (numberOfColumn) => {
    let rez = 0;
    for (let j = 0; j < rows; j++) {
      rez += matrix[j][numberOfColumn].amount;
    }
    let avrg = Math.floor(rez / rows);
    //setPageColumn((prev) => [...prev, avrg]);
    return avrg;

  };

  useEffect(() => {
    if (matrix.length === 0) {
      generateMatrix(rows, columns);
    }
  }, []);
  return (
    <div>
      <DrawMatrix
        matrix={matrix}
        countOfColumn={countOfColumn}
        dispatch={dispatch}
        showPercent={showPercent}
        deleteRowOnClick={deleteRowOnClick}
        countPercent={countPercent}
        findAverage={findAverage}
      />
    </div>
  );
};

export default Matrix;
