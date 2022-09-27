import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matrixSelector, setMatrix } from "../../slices/matrixSlice";
import DrawMatrix from "./DrawMatrix";

const Matrix = () => {
  const { columns, rows, matrix } = useSelector(matrixSelector);
  const dispatch = useDispatch();

  let generateMatrix = (rows, columns) => {
    let arr = new Array(columns);
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < columns; j++) {
        arr[i][j] = {
          amount: Math.floor(Math.random() * (999 - 100) + 100),
          id: Math.floor(Math.random() * 1000000),
          isActive: false,
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

    return Math.floor(rez / rows);
  };

  useEffect(() => {
    if (matrix.length === 0) {
      generateMatrix(rows, columns);
    }
  }, []);
  return (
    <div>
      <DrawMatrix matrix={matrix} findAverage={findAverage} />
    </div>
  );
};

export default Matrix;
