import App, { AppProps } from "next/app";
import React from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { applyMiddleware, createStore, Store } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware, { Task } from "redux-saga";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import "../styles/globals.css";
import reducer, { IReducerState } from "../reducers";
import rootSaga from "../sagas";
import { GET_USER_REQUEST } from "../reducers/user";
import "../styles/globals.css";
import AppLayout from "../components/AppLayout";

interface Props extends AppProps {
  store: Store<IReducerState>;
  user: Iuser | null;
  logIn: boolean;
  cookie: string;
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
    // const user = state.user.me;
    //클라이언트 사이드 인증.
    const logIn = state.user.isLoggedIn;

    const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
    if (ctx.isServer && cookie && ctx.pathname === "/") {
      //로그인에 성공한 경우.
      axios.defaults.headers.Cookie = cookie;
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: "/home" });
        ctx.res.end();
      }
      ctx.store.dispatch({
        type: GET_USER_REQUEST,
      });
    } else if (ctx.isServer && !cookie && ctx.pathname !== "/") {
      //쿠기가 없는데 다른 경로로 접속하려함.
      axios.defaults.headers.Cookie = "";
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
      }
    } else if (ctx.isServer && !cookie && ctx.pathname === "/") {
      //일반적인 접근 홈으로 온 경우.
      axios.defaults.headers.Cookie = "";
    } else if (ctx.isServer && cookie && ctx.pathname !== "/") {
      //쿠키가 있는데 패스가 다른 걸로 들어오면 로그인으로 만들어야해.
      axios.defaults.headers.Cookie = cookie;
      // ctx.store.dispatch({
      //   type: FORM_LIST_REQUEST,
      // });
      // ctx.store.dispatch({
      //   type: GET_USER_REQUEST,
      // });
    }

    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    return { pageProps, cookie, logIn };
  }

  render() {
    const { Component, store, pageProps, cookie, logIn } = this.props;
    return (
      <Provider store={store}>
        {!cookie && !logIn ? (
          <Component {...pageProps} />
        ) : (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
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
