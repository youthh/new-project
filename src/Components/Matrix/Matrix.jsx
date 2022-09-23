import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMatrix, setShowPercent
} from "../../slices/matrixSlice";
import DrawMatrix from "./DrawMatrix";

const Matrix = () => {
  const columns = useSelector(state => state.matrixSlice.columns);
  const rows = useSelector(state => state.matrixSlice.rows);
  const matrix = useSelector(state => state.matrixSlice.matrix);
  const dispatch = useDispatch();



  let countPercent = (item, element) => {
    let sum = item.reduce((prev, curr) => {
      return prev + curr.amount
    }, 0)

    return Math.round(element.amount * 100 / sum) + "%"
  }

  let showPercent = (index, e) => {
    dispatch(setShowPercent({ index, type: e.type }));

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
    for (let j = 0; j < matrix.length; j++) {
      rez += matrix[j][numberOfColumn].amount;
    }

    return Math.floor(rez / rows);

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
        findAverage={findAverage}
        dispatch={dispatch}
        showPercent={showPercent}
        countPercent={countPercent}
      />
    </div>
  );
};

export default Matrix;
