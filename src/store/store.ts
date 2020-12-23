import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import rootSearchSaga from "../features/search/redux/sagas/search";
import search from "../features/search/redux/search";

export const rootSaga = function* () {
  yield all([rootSearchSaga()]);
};

const rootReducer = combineReducers({ search });

const composeEnhancers = composeWithDevTools({});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type AppStoreState = ReturnType<typeof rootReducer>;

export default store;
