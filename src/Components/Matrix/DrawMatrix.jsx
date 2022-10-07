import React from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import {
  addRow,
  findSimilarOnMoveLeave, incrementCell
} from "../../slices/matrixSlice";
import MatrixCell from "./MatrixCell";

const DrawMatrix = ({
  matrix,
  showPercent,
  deleteRowOnClick,
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
            if (indx !== matrix.length) {
              return (
                <tr>
                  <td>{indx}</td>
                  {
                    item.length && item.map((cellItem, index) => {
                      return <MatrixCell
                        key={cellItem.id}
                        item={cellItem}
                        rowShowPercent={rowShowPercent}
                        index={index}
                        isAverage={false}
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
                  <td>
                    <button onClick={() => {
                      deleteRowOnClick(indx);
                    }}
                            className="btn btn_delete--row">
                      ✖
                    </button>
                  </td>
                </tr>
              );
            }
          })
        }
        </tbody>
        <tfoot>
        {
          matrix.map((item, indx) => {
            if (indx === matrix.length - 1) {
              return (
                <tr>
                  <td>avg</td>
                  {
                    item.map((cellItem, index) => {
                      return <MatrixCell
                        key={cellItem.id}
                        item={cellItem}
                        rowShowPercent={rowShowPercent}
                        index={index}
                        isAverage={true}
                      />;
                    })
                  }
                  <td className="table table_sum">
                    {
                      item.reduce((prev, current) => {
                        return prev + current.amount;
                      }, 0)
                    }
                  </td>
                </tr>
              );
            }
          })
        }
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

