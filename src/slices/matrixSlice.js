import { createSlice } from "@reduxjs/toolkit";

export const matrixSlice = createSlice({
  name: "matrix",

  initialState: {
    columns: null,
    rows: null,
    cells: null,
    isCreated: false,
    matrix: [],
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
  },
});

export const matrixSelector = (state) => {
  return {
    columns: state.matrixSlice.columns,
    matrix: state.matrixSlice.matrix,
    rows: state.matrixSlice.rows,
    isCreated: state.matrixSlice.isCreated,
  };
};

export const { initValuesField, setMatrix, incrementCell } =
  matrixSlice.actions;

export default matrixSlice.reducer;
