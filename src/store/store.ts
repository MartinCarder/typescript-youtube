import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import rootSearchSaga from "../features/search/sagas/search";
import search from "../features/search/reducers/search";

export const rootSaga = function* () {
  yield all([rootSearchSaga()]);
};

const RootReducer = combineReducers({ search });

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  RootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
