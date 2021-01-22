import React from "react";

import styles from "../styles/Form.module.css";
import FormCard from "../components/FormCard";
import Description from "../components/Description";
import FormCardForm from "../containers/FormCardForm";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";
import { FORM_LIST_REQUEST } from "../reducers/form";

export default function Form() {
  /*
   * 메뉴 클릭 시 API 요청(SSR)
   * 검색 할 때 API 요청
   *
   */

  return (
    <div className={styles.container}>
      <section className={styles.section1}>
        <section className={styles.section1__topMenu}>
          <span className={styles.section1__article}>Form</span>
          <span className={styles.section1__sort}>
            <span>최신순</span>
            <span>|</span>
            <span>인기순</span>
          </span>
          <SearchBar />
        </section>
        <section className={styles.section1__description}>
          <span>
            * 원하는 폼을 클릭 시, 최대 10개의 폼 목록을 한 번에 작성할 수
            있어요.
          </span>
          <span className={styles.section1__description__count}>(총 56개)</span>
        </section>
      </section>
      <section className={styles.section2}>
        <section className={styles.section2__left}>
          <FontAwesomeIcon icon={faChevronLeft} size={"lg"} color={"#000000"} />
        </section>

        <FormCardForm />

        <section className={styles.section2__right}>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={"lg"}
            color={"#000000"}
          />
        </section>
      </section>
      <Description />
    </div>
  );
}

Form.getInitialProps = async (context) => {
  const state = context.store.getState();
  const { req } = context;
  console.log(state);
  console.log(req);
  context.store.dispatch({
    type: FORM_LIST_REQUEST,
    data: "1",
  });
};
