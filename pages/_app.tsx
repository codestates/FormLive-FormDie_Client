import App, { AppProps } from "next/app";
import React from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { Store } from "redux";
import { Provider } from "react-redux";
import { Task } from "redux-saga";
import axios from "axios";
import "../styles/globals.css";
import { IReducerState } from "../reducers";
import { GET_USER_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "../store/store";
import { Persistor } from "redux-persist/es/types";


interface IStore extends Store<IReducerState> {
  sagaTask?: Task;
  __PERSISTOR?: Persistor;
}

interface Props extends AppProps {
  store: IStore;
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
    const logIn = state.user.isLoggedIn;

    const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
    if (ctx.isServer && cookie && ctx.pathname === "/") {
      //로그인에 성공한 경우
      axios.defaults.headers.Cookie = cookie;

      ctx.store.dispatch({
        type: GET_USER_REQUEST,
      });

    } else if (ctx.isServer && !cookie && ctx.pathname !== "/") {
      //쿠기가 없는데 다른 경로로 접속하려 함.
      axios.defaults.headers.Cookie = "";
      if (ctx.req && ctx.res) {
        ctx.res.writeHead(302, { Location: "/" });
        ctx.res.end();
      }
    } else if (ctx.isServer && !cookie && ctx.pathname === "/") {
      //일반적인 접근 홈으로 온 경우.
      axios.defaults.headers.Cookie = "";
    } else if (ctx.isServer && cookie && ctx.pathname !== "/") {
      //쿠키가 있는데 패스가 다른 걸로 들어오면 로그인으로 만듦.
      axios.defaults.headers.Cookie = cookie;
      ctx.store.dispatch({
        type: GET_USER_REQUEST,
      });
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
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          {!cookie && !logIn ? (
            <Component {...pageProps} />
          ) : (
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          )}
        </PersistGate>
      </Provider>
    );
  }
}

export default withRedux(reduxStore)(withReduxSaga(YangSikDang));

