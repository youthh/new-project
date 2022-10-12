import { createSlice } from "@reduxjs/toolkit";

export const matrixSlice = createSlice({
  name: "matrix",

  initialState: {
    columns: null,
    rows: null,
    isIncrement: false,
    matrix: [],
    rowShowPercent: [],
  },

  reducers: {
    initValuesField: (state, action) => {
      state.columns = parseInt(action.payload.columns);
      state.rows = parseInt(action.payload.rows) + 1;
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
      state.isIncrement = !state.isIncrement;
    },
    findSimilarOnMoveLeave: (state, action) => {
      state.matrix.map((i, inx) => {
        if (state.matrix.length - 1 !== inx) {
          return i.map((i) => {
            let rez = action.payload.hoveredCell.amount - i.amount;
            if (rez <= 120 && rez >= -120) {
              i.isActive = true;
            }
            if (action.payload.type === "mouseleave") {
              i.isActive = false;
            }
          });
        }
      });
    },
    setShowPercent: (state, action) => {
      state.matrix.map((i, index) => {
        if (index === action.payload.index - 1) {
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
    },
    rowsDelete: (state, action) => {
      state.rows--;
      action.payload--;
      if (state.rows === 1) {
        state.matrix = [];
        state.rows = 0;
        state.columns = 0;
      }
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
      state.matrix.splice(state.rows - 2, 0, row);
    },
    setRowPercent: (state, action) => {
      state.rowShowPercent = [...action.payload];
    },
    changeAverage: (state, action) => {
      state.matrix[state.matrix.length - 1].map((item, index) => {
        if (index === action.payload.numberOfColumn) {
          return (item.amount = action.payload.amount);
        }
      });
    },
  },
});

export const matrixSelector = (state) => {
  return {
    columns: state.matrixSlice.columns,
    rows: state.matrixSlice.rows,
    matrix: state.matrixSlice.matrix,
    rowShowPercent: state.matrixSlice.rowShowPercent,
  };
};

export const {
  changeAverage,
  initValuesField,
  setMatrix,
  incrementCell,
  findSimilarOnMoveLeave,
  setShowPercent,
  rowsDelete,
  addRow,
  setRowPercent,
} = matrixSlice.actions;

export default matrixSlice.reducer;
