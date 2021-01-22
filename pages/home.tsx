import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import HomeFormCard from "../components/HomeFormCard";
import { faClock, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FORM_LIST_REQUEST,
  IFormReducerState,
  FORM_GROUP_REQUEST,
} from "../reducers/form";
import HomeFormGroupCard from "../components/HomeFormGroupCard";
import { GET_USER_REQUEST } from "../reducers/user";

const Home = () => {
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  // const { formList, formGroup } = useSelector<IReducerState, IFormReducerState>(
  //   (state) => state.form
  // );

  interface ITemp {
    title: string;
    views: number;
    description?: any;
    number: string;
    updated_at?: any;
    organization: string;
  }
  const formList: ITemp[] = [
    {
      title: "청년내일채움공제",
      organization: "한국장학재단",
      views: 2815,
      number: "1",
      description: null,
      updated_at: null,
    },
    {
      title: "청년내일채움공제",
      organization: "한국장학재단",
      views: 2815,
      number: "1",
      description: null,
      updated_at: null,
    },
    {
      title: "청년내일채움공제",
      organization: "한국장학재단",
      views: 2815,
      number: "1",
      description: null,
      updated_at: null,
    },
    {
      title: "청년내일채움공제",
      organization: "한국장학재단",
      views: 2815,
      number: "1",
      description: null,
      updated_at: null,
    },
    {
      title: "청년내일채움공제",
      organization: "한국장학재단",
      views: 2815,
      number: "1",
      description: null,
      updated_at: null,
    },
  ];

  //5개만 잘라서 map 필요
  const renderFormCard = () =>
    formList.map((form, index) => <HomeFormCard {...form} key={index} />);

  //6개만 잘라서 map 필요
  const renderFormGroupCard = () =>
    formList.map((form, index) => <HomeFormGroupCard {...form} key={index} />);

  return (
    <div className={styles.container}>
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

Home.getInitialProps = async (context) => {
  // const state = context.store.getState();
  // 이 직전에 LOAD_USERS_REQUEST
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: formRequest,
  });

  context.store.dispatch({
    type: FORM_GROUP_REQUEST,
    data: formGroupRequest,
  });

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });
  // context.store.dispatch({
  //   type: LOAD_FOLLOWINGS_REQUEST,
  //   data: state.user.me && state.user.me.id,
  // });
  // context.store.dispatch({
  //   type: LOAD_USER_POSTS_REQUEST,
  //   data: state.user.me && state.user.me.id,
  // });

  // 이 쯤에서 LOAD_USERS_SUCCESS 돼서 me가 생김.
};

export default Home;
