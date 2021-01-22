import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";
import HomeFormCard from "../components/HomeFormCard";
import { faClock, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FORM_LIST_REQUEST, IFormReducerState } from "../reducers/form";
import HomeFormGroupCard from "../components/HomeFormGroupCard";

const Home = () => {
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  const formInfo = useSelector<IReducerState, IFormReducerState>(
    (state) => state.form
  );

  console.log(formInfo);
  return (
    <div className={styles.container}>
      <div className={styles.greeting}>Hello, Yeongbba!</div>
      <div className={styles.title__formGroup}>
        {/* <FontAwesomeIcon icon={faClock} size="lg" color="black" / */}
        <img src="/image/012-clock.svg" />
        <span>Last Updated</span>
      </div>
      <div className={styles.formGroupCard}>
        <HomeFormGroupCard />
        <HomeFormGroupCard />
        <HomeFormGroupCard />
        <HomeFormGroupCard />
        <HomeFormGroupCard />
        <HomeFormGroupCard />
      </div>
      <div className={styles.title__form}>
        {/* <FontAwesomeIcon icon={faFireAlt} size="lg" color="black" /> */}
        <img src="/image/011-trending.svg" />

        <span>Hot Form</span>
      </div>
      <div className={styles.formCard}>
        <HomeFormCard />
        <HomeFormCard />
        <HomeFormCard />
        <HomeFormCard />
        <HomeFormCard />
      </div>
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

Home.getInitialProps = async (context) => {
  // const state = context.store.getState();
  // 이 직전에 LOAD_USERS_REQUEST
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: formRequest,
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
