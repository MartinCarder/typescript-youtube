import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import rootSearchSaga from "../features/search/redux/sagas/search";
import search from "../features/search/redux/search";

export const rootSaga = function* () {
  yield all([rootSearchSaga()]);
};

export const rootReducer = combineReducers({ search, search2: search });
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppStoreState = ReturnType<typeof rootReducer>;

export default store;
