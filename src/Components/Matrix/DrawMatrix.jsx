import React from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import {
  addRow, rowsDelete
} from "../../slices/matrixSlice";
import MatrixCell from "./MatrixCell";

const DrawMatrix = ({
  matrix,
  showPercent,
  rowShowPercent
}) => {
  const dispatch = useDispatch();

  return matrix.length && (
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
        {
          matrix.map((item, indx) => {
            indx++;
            return (
              <tr key={indx}>
                <td>{indx === matrix.length ? "avg" : indx}</td>
                {
                  item.length && item.map((cellItem, index) => {
                    return <MatrixCell
                      key={cellItem.id}
                      item={cellItem}
                      rowShowPercent={rowShowPercent}
                      index={index}
                      isAverage={indx === matrix.length}
                    />;
                  })
                }
                <td className="table table_sum"
                    onMouseOver={(e) => showPercent(e, item, indx)}
                    onMouseLeave={(e) => showPercent(e, item, indx)}
                >
                  {
                    item.reduce((prev, current) => {
                      return prev + current.amount;
                    }, 0)
                  }
                </td>
                {
                  indx !== matrix.length &&
                  <td>
                    <button onClick={() => {
                      dispatch(rowsDelete(indx));
                    }}
                            className="btn btn_delete--row">
                      ✖
                    </button>
                  </td>
                }
              </tr>
            );
          })
        }
        </tbody>
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

