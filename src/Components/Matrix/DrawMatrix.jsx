import React, { useMemo } from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import {
  addAverageCell,
  addRow,
  findSimilarOnMoveLeave, incrementCell

} from "../../slices/matrixSlice";
import MatrixCell from "./MatrixCell";

const DrawMatrix = ({
  matrix,
  findAverage,
  showPercent,
  countPercent,
  deleteRowOnClick,
  countOfColumn

}) => {
  const dispatch = useDispatch();

  return matrix.length !== 0 && (
    <div className="box__matrix-container">
      <table>
        <thead>
        <tr>
          <th>№</th>
          {matrix[0].map((item, index) => {
            index++;
            return <th key={index}>{index}</th>;
          })}
          <th>Sum</th>
        </tr>
        </thead>
        <tbody>
        {matrix.map((item, index) => {
          index++;
          return (
            <tr key={index}>
              <td>{index}</td>
              {
                item.map((i) => {
                  let percent = countPercent(item, i);
                  return <MatrixCell
                    key={i.id}
                    i={i}
                    percent={percent}
                  />;
                })
              }
              <td className="table table_sum"
                  onMouseOver={(e) => showPercent(index, e)}
                  onMouseLeave={(e) => showPercent(index, e)}
              >
                {
                  item.reduce((prev, current) => {
                    return prev + current.amount;
                  }, 0)
                }
              </td>
              <td>
                <button onClick={() => {
                  deleteRowOnClick(index);
                }}
                        className="btn">
                  delete
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>

        <tfoot>
        <tr>
          <th>Avg</th>
          {
            matrix[0].map((item, index) => {
              let i = findAverage(index);
              //dispatch(addAverageCell(i));
              return <th className="table table_sum"
                         key={index}>{i}</th>;
            })
          }
          {
            <th className="table table_sum"
            >
              {
                matrix[0].reduce((item, curr, index) => {
                  return item + findAverage(index);
                }, 0)
              }
            </th>
          }

        </tr>
        </tfoot>
      </table>
      <button onClick={() => {
        dispatch(addRow());

      }}
              className="btn btn__add--row">Add Row
      </button>
    </div>
  );
};

export default DrawMatrix;
