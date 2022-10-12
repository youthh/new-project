import { combineReducers, createStore } from "@reduxjs/toolkit";
import matrixSlice from "./slices/matrixSlice";

let reducers = combineReducers({
  matrixSlice,
});

const store = createStore(reducers);

export default store;
