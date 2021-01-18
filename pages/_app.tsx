import App, { AppProps } from "next/app";
import React from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { applyMiddleware, createStore, Store } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware, { Task } from "redux-saga";
import axios from "axios";
import Helmet from "react-helmet";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer, { IReducerState } from "../reducers";
import rootSaga from "../sagas";
import { LOG_IN_REQUEST } from "../reducers/user";

interface Props extends AppProps {
  store: Store<IReducerState>;
}

class YangSikDang extends App<Props> {
  static async getInitialProps(context) {
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (ctx.isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    if (!state.user.me) {
      ctx.store.dispatch({
        type: LOG_IN_REQUEST,
      });
    }
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    return { pageProps };
  }

  render() {
    const { Component, store, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

interface IStore extends Store {
  sagaTask?: Task;
}
const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store: IStore = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(YangSikDang));
