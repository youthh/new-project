import React from "react";


const AverageRow = ({ averageCell, countPercent, showPercent }) => {
  return (
    <tr>
      <td>Avg</td>
      {
        averageCell.length ? averageCell.map((i, index) => {
          let percent = countPercent(averageCell, i);
          return <td
            className={"table table_sum" + (i.isShowPercent ? " table_td--percent" : "")}
            key={index}>{i.isShowPercent ? percent : i.amount}
            {i.isShowPercent &&
              <div className="percent__height" style={{
                height: percent,
                background: "#6500FFFF"
              }}></div>
            }
          </td>;
        }) : null
      }
      <th className="table table_sum average"
          onMouseOver={(e) => showPercent(e)}
          onMouseLeave={(e) => showPercent(e)}
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
