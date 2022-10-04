import React, { useMemo } from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import {
  addAverageCell,
  addRow,
  findSimilarOnMoveLeave, incrementCell

} from "../../slices/matrixSlice";
import MatrixCell from "./MatrixCell";
import AverageRow from "./AverageRow";

const DrawMatrix = ({
  matrix,
  showPercent,
  countPercent,
  deleteRowOnClick,
  averageCell
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
                item.length && item.map((cellItem) => {
                  let percent = countPercent(item, cellItem);
                  return <MatrixCell
                    key={cellItem.id}
                    item={cellItem}
                    percent={percent}
                  />;
                })
              }
              <td className="table table_sum"
                  onMouseOver={(e) => showPercent(e, index)}
                  onMouseLeave={(e) => showPercent(e, index)}
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
                  ✖
                </button>
              </td>
            </tr>
          );
        })}
        </tbody>

        <tfoot>
        <AverageRow
          averageCell={averageCell}
          showPercent={showPercent}
          countPercent={countPercent}
        />
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
