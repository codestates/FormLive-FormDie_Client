import styles from "../styles/Home/Home.module.css";
import HomeFormCard from "../components/HomeFormCard";
import HomeFormGroupCard from "../components/HomeFormGroupCard";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import {
  FORM_LIST_REQUEST,
  IFormReducerState,
  FORM_GROUP_REQUEST,
  HISTORY_LIST_REQUEST,
} from "../reducers/form";
import { GET_USER_REQUEST } from "../reducers/user";
import Head from "next/head";

const Home = () => {
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  const { formList, formGroup } = useSelector<IReducerState, IFormReducerState>(
    (state) => state.form
  );

  const renderFormCard = () =>
    formList
      .slice(0, 5)
      .map((form, index) => (
        <HomeFormCard {...form} key={index} number={String(index + 1)} />
      ));

  const renderFormGroupCard = () =>
    formGroup
      .slice(0, 6)
      .map((form, index) => <HomeFormGroupCard {...form} key={index} />);

  return (
    <div className={styles.container}>
      <Head>
        <title>양식당 ｜ Home</title>
        <link rel="shortcut icon" href="/image/favicon.ico" />
      </Head>
      <div className={styles.greeting}>Hello, {userInfo?.name}!</div>
      <div className={styles.title__formGroup}>
        <img src="/image/012-clock.svg" />
        <span>Last Updated</span>
      </div>
      <div className={styles.formGroupCard}>{renderFormGroupCard()}</div>
      <div className={styles.title__form}>
        <img src="/image/011-trending.svg" />

        <span>Hot Form</span>
      </div>
      <div className={styles.formCard}>{renderFormCard()}</div>
    </div>
  );
};

interface IFormList {
  q?: string;
  page: number;
  sort?: string;
}

const formRequest: IFormList = {
  page: 1,
  sort: "popular",
};

const formGroupRequest: IFormList = {
  page: 1,
};

const queryParameter: IFormList = {
  page: 1,
};

Home.getInitialProps = async (context) => {
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: formRequest,
  });

  context.store.dispatch({
    type: FORM_GROUP_REQUEST,
    data: formGroupRequest,
  });

  context.store.dispatch({
    type: HISTORY_LIST_REQUEST,
    data: queryParameter,
  });

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });
};

export default Home;
