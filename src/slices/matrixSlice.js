import { createSlice } from '@reduxjs/toolkit'


export const matrixSlice = createSlice({
    name: 'matrix',

    initialState: {
        columns: null,
        rows: null,
        cells: null,
        isCreated: false,
        matrix: []

    },

    reducers: {
        initValuesField: (state, action) => {
            state.columns = parseInt(action.payload.columns)
            state.rows = parseInt(action.payload.rows)
            state.cells = parseInt(action.payload.cells)
            state.isCreated = true
        },
        setMatrix: (state, action) => {
            state.matrix = action.payload
        }
    },
})


export const {
    initValuesField,
    setMatrix
} = matrixSlice.actions

export default matrixSlice.reducer