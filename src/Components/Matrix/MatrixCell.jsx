import React from "react";
import {
  findSimilarOnMoveLeave,
  incrementCell
} from "../../slices/matrixSlice";
import { useDispatch } from "react-redux";

const MatrixCell = ({ item, rowShowPercent, index, isAverage }) => {
  const dispatch = useDispatch();
  return (
    <td
      key={item.id}
      onMouseOver={(e) => !isAverage && dispatch(findSimilarOnMoveLeave({
        hoveredCell: item,
        type: e.type
      }))}
      onMouseLeave={(e) => !isAverage && dispatch(findSimilarOnMoveLeave({
        hoveredCell: item,
        type: e.type
      }))}
      onClick={() => {
        !isAverage && dispatch(incrementCell(item));
      }}
      className={"table " + (isAverage ? "table_sum" : "table_td")
        + (item.isActive ? " active" : "")
        + (item.isShowPercent ? " table_td--percent" : "")}>
      {item.isShowPercent ?
        rowShowPercent.filter((item, inx) => {
          return index === inx && item;
        })
        : item.amount}
      {item.isShowPercent &&
        <div className="percent__height" style={{
          height: rowShowPercent.filter((item, inx) => {
            return index === inx && item;
          }),
          background: "#6500FFFF"
        }}></div>
      }

    </td>
  );
};

export default MatrixCell;
