import { createSlice } from "@reduxjs/toolkit";

export const matrixSlice = createSlice({
  name: "matrix",

  initialState: {
    columns: null,
    rows: null,
    cells: null,
    matrix: [],
    averageCell: [],
    rowShowPercent: [],
  },

  reducers: {
    initValuesField: (state, action) => {
      state.columns = parseInt(action.payload.columns);
      state.rows = parseInt(action.payload.rows);
      state.cells = parseInt(action.payload.cells);
    },
    setMatrix: (state, action) => {
      state.matrix = action.payload;
    },
    incrementCell: (state, action) => {
      state.matrix.map((i) => {
        return i.map((i) => {
          if (i.id === action.payload.id) {
            i.amount++;
          }
        });
      });
    },
    findSimilarOnMoveLeave: (state, action) => {
      state.matrix.map((i) => {
        return i.map((i) => {
          let rez = action.payload.hoveredCell.amount - i.amount;
          if (rez <= 120 && rez >= -120) {
            i.isActive = true;
          }
          if (action.payload.type === "mouseleave") {
            i.isActive = false;
          }
        });
      });
    },
    setShowPercent: (state, action) => {
      if (action.payload.e.target.className === "table table_sum average") {
        state.averageCell.map((item) => {
          if (action.payload.e.type === "mouseleave") {
            item.isShowPercent = false;
          } else {
            return (item.isShowPercent = true);
          }
        });
      } else {
        state.matrix.map((i, index) => {
          index++;
          if (index === action.payload.index) {
            if (action.payload.e.type === "mouseleave") {
              return i.map((i) => {
                i.isShowPercent = false;
              });
            }
            return i.map((i) => {
              i.isShowPercent = true;
            });
          }
        });
      }
    },
    rowsDelete: (state, action) => {
      state.rows--;
      action.payload--;
      state.matrix = state.matrix.filter(
        (item, index) => index !== action.payload
      );
    },
    addRow: (state) => {
      state.rows++;
      let row = [];
      for (let i = 0; i < state.columns; i++) {
        row.push({
          amount: Math.floor(Math.random() * (999 - 100) + 100),
          id: Math.floor(Math.random() * 1000000),
          isActive: false,
          isShowPercent: false,
        });
      }
      state.matrix.push(row);
    },
    addAverageCell: (state, action) => {
      state.averageCell = [action.payload].flat();
    },
    setRowPercent: (state, action) => {
      state.rowShowPercent = [...action.payload];
    },
  },
});

export const matrixSelector = (state) => {
  return {
    columns: state.matrixSlice.columns,
    rows: state.matrixSlice.rows,
    matrix: state.matrixSlice.matrix,
    averageCell: state.matrixSlice.averageCell,
    rowShowPercent: state.matrixSlice.rowShowPercent,
  };
};

export const {
  initValuesField,
  setMatrix,
  incrementCell,
  findSimilarOnMoveLeave,
  setShowPercent,
  rowsDelete,
  addRow,
  setRowPercent,
  addAverageCell,
} = matrixSlice.actions;

export default matrixSlice.reducer;
