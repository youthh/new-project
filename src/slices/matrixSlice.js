import { createSlice } from "@reduxjs/toolkit";


export const matrixSlice = createSlice({
  name: "matrix",

  initialState: {
    columns: null,
    rows: null,
    cells: null,
    isCreated: false,
    matrix: [],
    averageCell: [],
    countOfColumn: null
  },

  reducers: {
    initValuesField: (state, action) => {
      state.columns = parseInt(action.payload.columns);
      state.rows = parseInt(action.payload.rows);
      state.cells = parseInt(action.payload.cells);
      state.isCreated = true;
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
      state.matrix.map((i, index) => {
        index++;
        if (index === action.payload.index) {
          if (action.payload.type === "mouseleave") {
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
      state.matrix = state.matrix.filter((item, index) => index !== action.payload);
    },
    addRow: (state) => {
      state.rows++;
      let row = [];
      for (let i = 0; i < state.columns; i++) {
        row.push({
          amount: Math.floor(Math.random() * (999 - 100) + 100),
          id: Math.floor(Math.random() * (1000000)),
          isActive: false,
          isShowPercent: false
        });
      }
      state.matrix.push(row);
    },
    addAverageCell: (state, action) => {
      state.averageCell.push(action.payload);
    },
    setNewPageColumn: (state, action) => {
      debugger
      state.countOfColumn = action.payload;
    }
  }
});

export const matrixSelector = (state) => {
  return {
    columns: state.matrixSlice.columns,
    rows: state.matrixSlice.rows,
    isCreated: state.matrixSlice.isCreated,
    matrix: state.matrixSlice.matrix,
    countOfColumn: state.matrixSlice.countOfColumn
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
  addAverageCell,
  setNewPageColumn
} = matrixSlice.actions;

export default matrixSlice.reducer;
