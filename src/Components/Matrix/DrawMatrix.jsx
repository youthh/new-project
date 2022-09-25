import React from "react";
import "./Matrix.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findSimilar, incrementCell,

} from "../../slices/matrixSlice";

const DrawMatrix = ({ matrix, findAverage, showPercent, countPercent}) => {
  const dispatch = useDispatch()
  return (
    <>
      {
        matrix.length !== 0 &&
        <div>
          <table>
            <thead>
            <tr>
              <th>№</th>
              {matrix[0].map((item, index) => {
                index++
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
                      let percent = countPercent(item, i)
                      return <td
                        onMouseOver={(e) => dispatch(findSimilar({ hoveredCell: i, type: e.type }))}
                        onMouseLeave={(e) => dispatch(findSimilar({ hoveredCell: i, type: e.type }))}
                        onClick={() => dispatch(incrementCell(i))}
                        key={i.id}
                        className={"table table_td " + (i.isActive ? "active" : "")
                          + (i.isShowPercent ? " table_td--percent" : '')}>
                        {i.isShowPercent ? percent : i.amount}
                        {i.isShowPercent && <div className="percent__height" style={{height: percent, background: "#6500FFFF"}}></div>}
                      </td>;
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
                </tr>
              );
            })}
            </tbody>

            <tfoot>
            <tr>
              <th>Avg</th>
              {
                matrix[0].map((item, index) => {
                  return <th className="table table_sum"
                             key={index}>{findAverage(index)}</th>;
                })
              }

              {
                <th className="table table_sum">
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
        </div>
      }
    </>
  );
};

export default DrawMatrix;
