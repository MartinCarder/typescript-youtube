import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import rootSearchSaga from "../features/search/redux/sagas/search";
import rootVideoSaga from "../features/videoDetails/redux/sagas/video";
import rootRelatedSaga from "../features/videoDetails/redux/sagas/related";
import search from "../features/search/redux/search";
import videoDetails from "features/videoDetails/redux/videoDetailsSlice";
import relatedVideos from "features/videoDetails/redux/relatedSlice";

export const rootSaga = function* () {
  yield all([rootVideoSaga(), rootSearchSaga(), rootRelatedSaga()]);
};

export const rootReducer = combineReducers({
  search,
  videoDetails,
  relatedVideos,
});
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppStoreState = ReturnType<typeof rootReducer>;

export default store;
