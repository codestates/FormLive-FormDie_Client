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

/*
* Next.js에 saga와 persist 설정하기 위한 코드
* persist 설정은 Form 관련 데이터만 적용되고, User 부분은 적용되지 않게 설정
* persist 설정을 하면, 데이터가 localstorage에 저장되기 때문에
* 새로고침을 해도 데이터가 유실되지 않음
*/
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
