import React from "react";


const AverageRow = ({ averageCell, showPercent, rowPercent }) => {
  return (
    <tr>
      <td>Avg</td>
      {
        averageCell.length ? averageCell.map((i, index) => {
          return <td
            className={"table table_sum" + (i.isShowPercent ? " table_td--percent" : "")}
            key={index}>{i.isShowPercent ?
            rowPercent.filter((item, inx) => {
              return index === inx && item;
            })
            : i.amount}
            {i.isShowPercent &&
              <div className="percent__height" style={{
                height: rowPercent.filter((item, inx) => {
                  return index === inx && item;
                }),
                background: "#6500FFFF"
              }}></div>
            }
          </td>;
        }) : null
      }
      <th className="table table_sum average"
          onMouseOver={(e) => showPercent(e, averageCell)}
          onMouseLeave={(e) => showPercent(e, averageCell)}
      >{
        averageCell.length && averageCell.reduce((prev, curr) => {
          return prev + curr.amount;
        }, 0)
      }
      </th>

    </tr>
  );
};


export default AverageRow;
