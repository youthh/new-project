import React from "react";
import {
  findSimilarOnMoveLeave,
  incrementCell
} from "../../slices/matrixSlice";
import { useDispatch } from "react-redux";

const MatrixCell = ({ item, rowShowPercent, index }) => {
  const dispatch = useDispatch();
  return (
    <td
      onMouseOver={(e) => dispatch(findSimilarOnMoveLeave({
        hoveredCell: item,
        type: e.type
      }))}
      onMouseLeave={(e) => dispatch(findSimilarOnMoveLeave({
        hoveredCell: item,
        type: e.type
      }))}
      onClick={() => dispatch(incrementCell(item))}
      key={item.id}
      className={"table table_td " + (item.isActive ? "active" : "")
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
