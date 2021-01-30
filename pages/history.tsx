import styles from "../styles/History.module.css";
import SearchBar from "../components/SearchBar";
import HistoryCard from "../components/HistoryCard";
import { IReducerState } from "../reducers";
import {
  HISTORY_LIST_REQUEST,
  IHistoryReducerState,
} from "../reducers/history";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

export default function History() {
  const [ascPage, setAscPage] = useState<number>(1);
  const [desPage, setDesPage] = useState<number>(1);
  const [Query, setQuery] = useState<string>("");
  const [Sort, setSort] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { historyTotal } = useSelector<IReducerState, IHistoryReducerState>(
    (state) => state.history
  );
  const historyInfo = useSelector<IReducerState, IHistoryReducerState>(
    (state) => state.history
  );

  const maxPage = Math.ceil(historyTotal / 10);

  const onChangeAscendingSortHandler = () => {
    console.log("ascPage : ", ascPage);
    console.log("onChangeAscendingSortHandler");
    const params = {
      page: 1,
      sort: "asc",
      q: Query,
    };

    dispatch({
      type: HISTORY_LIST_REQUEST,
      data: params,
    });

    setSort("asc");
    desPage > 1 && setDesPage(1);
  };

  const onChangeDescendingSortHandler = () => {
    const params = {
      page: 1,
      sort: null,
      q: Query,
    };

    dispatch({
      type: HISTORY_LIST_REQUEST,
      data: params,
    });

    setSort(null);
    ascPage > 1 && setAscPage(1);
  };

  const onClick = () => {
    console.log("maxPage : ", maxPage);
    if (Sort === null) {
      const params = {
        page: desPage + 1,
        sort: null,
        q: "",
      };

      dispatch({
        type: HISTORY_LIST_REQUEST,
        data: params,
      });
      setDesPage(desPage + 1);
    } else if (Sort === "asc") {
      const params = {
        page: ascPage + 1,
        sort: "asc",
        q: "",
      };

      dispatch({
        type: HISTORY_LIST_REQUEST,
        data: params,
      });
      setAscPage(ascPage + 1);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>양식당 ｜ History</title>
        <link rel="shortcut icon" href="/image/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__title}>History</div>
          <div className={styles.header__sort}>
            <div
              onClick={() => {
                onChangeDescendingSortHandler();
              }}
            >
              내림차순
            </div>
            <div> ｜ </div>
            <div
              onClick={() => {
                onChangeAscendingSortHandler();
              }}
            >
              오름차순
            </div>
          </div>
        </div>

        <SearchBar where={"history"} setQuery={setQuery} />
      </header>
      <div className={styles.main}>
        {historyInfo.historyList.map((el, idx) => (
          <HistoryCard
            groupId={el.groupId}
            title={el.title}
            updatedAt={el.updatedAt}
            forms={el.forms}
            key={idx}
          />
        ))}
        {!Sort
          ? desPage < maxPage && (
              <img
                src="/image/menu.svg"
                className={styles.icon}
                onClick={onClick}
              />
            )
          : ascPage < maxPage && (
              <img
                src="/image/menu.svg"
                className={styles.icon}
                onClick={onClick}
              />
            )}
      </div>
    </div>
  );
}
export interface historyQuery {
  q?: string;
  page: number;
  sort?: string;
}
const queryParameter: historyQuery = {
  page: 1,
};
History.getInitialProps = async (context) => {
  context.store.dispatch({
    type: HISTORY_LIST_REQUEST,
    data: queryParameter,
  });
};
