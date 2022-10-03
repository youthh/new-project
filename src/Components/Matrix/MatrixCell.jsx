import React from "react";
import {
  findSimilarOnMoveLeave,
  incrementCell
} from "../../slices/matrixSlice";
import { useDispatch } from "react-redux";

const MatrixCell = ({ i, percent }) => {
  const dispatch = useDispatch();
  return (
    <td
      onMouseOver={(e) => dispatch(findSimilarOnMoveLeave({
        hoveredCell: i,
        type: e.type
      }))}
      onMouseLeave={(e) => dispatch(findSimilarOnMoveLeave({
        hoveredCell: i,
        type: e.type
      }))}
      onClick={() => dispatch(incrementCell(i))}
      key={i.id}
      className={"table table_td " + (i.isActive ? "active" : "")
        + (i.isShowPercent ? " table_td--percent" : "")}>
      {i.isShowPercent ? percent : i.amount}
      {i.isShowPercent &&
        <div className="percent__height" style={{
          height: percent,
          background: "#6500FFFF"
        }}></div>}
    </td>
  );
};

export default MatrixCell;
