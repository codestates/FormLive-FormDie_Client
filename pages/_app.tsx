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
import "../styles/globals.css";
import reducer, { IReducerState } from "../reducers";
import rootSaga from "../sagas";
import { LOG_IN_REQUEST, GET_USER_REQUEST } from "../reducers/user";
import "../styles/globals.css";
import AppLayout from "../components/AppLayout";

interface Props extends AppProps {
  store: Store<IReducerState>;
  user: Iuser | null;
  logIn: boolean;
}

interface Iuser {
  id: number;
  email: string;
  name: string;
  profileIconURL?: string;
  isAdmin: number;
}

class YangSikDang extends App<Props> {
  static async getInitialProps(context) {
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const user = state.user.me;
    const logIn = state.user.isLoggedIn;
    const cookie = ctx.isServer ? ctx.req.headers.cookie : "";

    if (ctx.isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    } else if (ctx.isServer) {
      axios.defaults.headers.Cookie = "";
    }
    if (!user) {
      ctx.store.dispatch({
        type: GET_USER_REQUEST,
      });
    }
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    return { pageProps, logIn };
  }

  render() {
    const { Component, store, pageProps, logIn } = this.props;
    return (
      <Provider store={store}>
        {logIn ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : (
          <Component {...pageProps} />
        )}
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
