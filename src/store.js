import { combineReducers, createStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import matrixSlice from "./slices/matrixSlice";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  matrixSlice,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
