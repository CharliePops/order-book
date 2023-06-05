import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import bookReducer from "../features/book/bookSlice";
import sagas from "../sagas/rootSaga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    book: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(sagas);

export default store;
