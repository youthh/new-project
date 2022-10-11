import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAverage,
  matrixSelector,
  setMatrix,
  setRowPercent,
  setShowPercent,
} from "../../slices/matrixSlice";
import DrawMatrix from "./DrawMatrix";

const Matrix = () => {
  const { columns, rows, matrix, rowShowPercent } = useSelector(matrixSelector);
  const dispatch = useDispatch();

  let countPercent = (item) => {
    let arr = [];
    let sum = item.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    for (let j = 0; j < item.length; j++) {
      arr.push(Math.round((item[j].amount * 100) / sum) + "%");
    }
    return arr;
  };

  let showPercent = (e, item, index) => {
    dispatch(setRowPercent(countPercent(item)));
    dispatch(setShowPercent({ index, e }));
  };

  let generateMatrix = (rows, columns) => {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        // checking if it is not  last item of array
        if (i !== rows - 1) {
          arr[i][j] = {
            amount: Math.floor(Math.random() * (999 - 100) + 100),
            id: Math.random().toString(16).slice(2),
            isShowPercent: false,
            isActive: false,
          };
        }
      }
    }
    setAverage(arr);
    dispatch(setMatrix(arr));
  };
  const setAverage = (arr) => {
    let rez = 0;
    for (let j = 0; j < columns; j++) {
      for (let k = 0; k < rows; k++) {
        // counting average
        if (k !== rows - 1) {
          rez += arr[k][j].amount;
        } else {
          if (arr[arr.length - 1].length !== columns) {
            // set average during generating of matrix
            arr[k][j] = {
              amount: Math.floor(rez / (arr.length - 1)),
              id: Math.random().toString(16).slice(2),
              isShowPercent: false,
            };
          } else {
            //set average on increment
            dispatch(
              changeAverage({
                amount: Math.floor(rez / (arr.length - 1)),
                numberOfColumn: j,
              })
            );
          }
          rez = 0;
        }
      }
    }
  };

  useEffect(() => {
    // create matrix in builder
    !matrix.length && generateMatrix(rows, columns);

    matrix.length && setAverage(matrix);
  }, [
    matrix.map((i) => {
      return i.map((i) => {
        return i.amount;
      });
    }),
  ]);

  return (
    <DrawMatrix
      matrix={matrix}
      dispatch={dispatch}
      showPercent={showPercent}
      rowShowPercent={rowShowPercent}
    />
  );
};

export default Matrix;
