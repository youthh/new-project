import React from "react";
import "./Matrix.css";
import { useDispatch } from "react-redux";
import {
  incrementCell,

} from "../../slices/matrixSlice";

const DrawMatrix = ({ matrix, findAverage}) => {
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
              {matrix.map((item, index) => {
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
                      return <td
                                 onClick={() => dispatch(incrementCell(i))}
                                 key={i.id}
                                 className={"table table_td "}>{i.amount}
                      </td>;
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
