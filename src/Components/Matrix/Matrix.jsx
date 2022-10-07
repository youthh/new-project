import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  addAverageCell,
  matrixSelector, rowsDelete,
  setMatrix, setRowPercent, setShowPercent
} from "../../slices/matrixSlice";
import DrawMatrix from "./DrawMatrix";
import { logDOM } from "@testing-library/react";

const Matrix = () => {
  const {
    columns, rows, matrix, rowShowPercent
  } = useSelector(matrixSelector);
  const dispatch = useDispatch();


  let countPercent = (item) => {
    let arr = [];
    let sum = item.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    for (let j = 0; j < item.length; j++) {
      arr.push(Math.round(item[j].amount * 100 / sum) + "%");
    }
    return arr;
  };

  let showPercent = (e, item, index) => {
    dispatch(setRowPercent(countPercent(item)));
    dispatch(setShowPercent({ index, e }));
  };

  let deleteRowOnClick = (index) => {
    dispatch(rowsDelete(index));
  };

  let generateMatrix = (rows, columns) => {
    let arr = new Array(columns);
    let rez = 0;
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        // check if it is not  last item of array
        if (i !== rows - 1) {
          arr[i][j] = {
            amount: Math.floor(Math.random() * (999 - 100) + 100),
            id: Math.random().toString(16).slice(2),
            isShowPercent: false,
            isActive: false

          };
        }
      }
    }
    setAverage(arr);
    dispatch(setMatrix(arr));
  };
  const setAverage = (arr = matrix) => {
    let rez = 0;
    for (let j = 0; j < columns; j++) {
      for (let k = 0; k < rows; k++) {
        if (k !== rows - 1) {
          rez += arr[k][j].amount;
        } else {
          arr[k][j] = {
            amount: Math.floor(rez / (arr.length - 1)),
            id: Math.random().toString(16).slice(2),
            isShowPercent: false
          };
          rez = 0;
        }
      }
    }
  };


  useEffect(() => {
    // create matrix in builder
    !matrix.length && generateMatrix(rows, columns);

    //matrix.length && setAverage();

  }, [matrix.length]);
  return (
    <div>
      <DrawMatrix
        matrix={matrix}
        dispatch={dispatch}
        showPercent={showPercent}
        deleteRowOnClick={deleteRowOnClick}
        rowShowPercent={rowShowPercent}
      />
    </div>
  );
};

export default Matrix;
