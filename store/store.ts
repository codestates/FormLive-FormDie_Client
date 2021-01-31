import { createStore, applyMiddleware, Store } from "redux";
import { Persistor } from "redux-persist/es/types";
import createSagaMiddleware, { Task } from "redux-saga";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../sagas";
import rootReducer from "../reducers";

interface IStore extends Store {
  sagaTask?: Task;
  __PERSISTOR?: Persistor;
}

const reduxStore = (initialState) => {
  let store: IStore;

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      storage,
      blacklist: ["user"],
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      enhancer
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(rootReducer, initialState, enhancer);
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default reduxStore;
