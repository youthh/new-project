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
    columns, rows, matrix, averageCell, rowShowPercent
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
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        arr[i][j] = {
          amount: Math.floor(Math.random() * (999 - 100) + 100),
          id: Math.random().toString(16).slice(2),
          isActive: false,
          isShowPercent: false
        };
      }

    }

    dispatch(setMatrix(arr));
  };

  let findAverage = (numberOfColumn) => {
    let rez = 0;
    for (let j = 0; j < matrix.length; j++) {
      rez += matrix[j][numberOfColumn].amount;
    }

    return Math.floor(rez / matrix.length);
  };


  useEffect(() => {
    // create matrix in builder
    !matrix.length && generateMatrix(rows, columns);

    //set Average
    matrix.length && dispatch(addAverageCell(
      matrix[0].map((i, index) => {
        return {
          amount: findAverage(index),
          isShowPercent: false,
          id: Math.floor(Math.random() * (1000000))
        };
      })
    ));

  }, [matrix]);
  return (
    <div>
      <DrawMatrix
        matrix={matrix}
        dispatch={dispatch}
        showPercent={showPercent}
        deleteRowOnClick={deleteRowOnClick}
        averageCell={averageCell}
        rowShowPercent={rowShowPercent}
      />
    </div>
  );
};

export default Matrix;
