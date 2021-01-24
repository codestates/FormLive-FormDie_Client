import styles from "../styles/Form.module.css";
import FormCard from "../components/FormCard";
import FormDescription from "../components/FormDescription";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";

import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import HomeFormCard from "../components/HomeFormCard";
import {
  FORM_LIST_REQUEST,
  IFormReducerState,
  FORM_GROUP_REQUEST,
} from "../reducers/form";
import HomeFormGroupCard from "../components/HomeFormGroupCard";
import { GET_USER_REQUEST } from "../reducers/user";

const Form = () => {
  const MEDIUM_GRAY = "#bfbfbf";
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  // const { formList, formGroup } = useSelector<IReducerState, IFormReducerState>(
  //   (state) => state.form
  // );

  interface data {
    formId: number;
    title: string;
    description: string;
    date: string;
    count: number;
  }
  let formData: Array<data> = [
    {
      formId: 1,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 256,
    },
    {
      formId: 2,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 208,
    },
    {
      formId: 3,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 154,
    },
    {
      formId: 4,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 361,
    },
    {
      formId: 5,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 487,
    },
    {
      formId: 6,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 633,
    },
    {
      formId: 7,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 211,
    },
    {
      formId: 8,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 275,
    },
    {
      formId: 9,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 275,
    },
    {
      formId: 10,
      title: "청년내일체움공제",
      description: "한국장학재단",
      date: "2021-01-20",
      count: 752,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__title}>Form</div>
          <div className={styles.header__sort}>
            <div>최신순</div>
            <div> ｜ </div>
            <div>인기순</div>
          </div>
        </div>
        <SearchBar />
      </header>
      <div className={styles.subHeader}>
        <div className={styles.subHeader__desc}>
          * 원하는 폼을 클릭 시, 최대 10개의 폼 목록을 한 번에 작성할 수 있어요.
        </div>
        <div className={styles.subHeader__number}>(총 56개)</div>
      </div>
      <div className={styles.form}>
        <div className={styles.cheveronLeft}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
        <div className={styles.formCard}>
          {formData.map((data, idx) => (
            <FormCard
              formId={idx + 1}
              updated_at={data.date}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
        <div className={styles.cheveronRight}>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
      </div>
      <FormDescription />
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
};

const formGroupRequest: IFormList = {
  page: 1,
};

Form.getInitialProps = async (context) => {
  // const state = context.store.getState();
  // 이 직전에 LOAD_USERS_REQUEST
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: formRequest,
  });
  //   context.store.dispatch({
  //     type: FORM_GROUP_REQUEST,
  //     data: formGroupRequest,
  //   });

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

export default Form;
