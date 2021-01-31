import React, { useState } from "react";
import styles from "../styles/FormGroup/FormGroup.module.css";
import FormGroupCard from "../components/FormGroupCard";
import FormGroupDescription from "../components/FormGroupDescription";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../utils/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { IReducerState } from "../reducers";
import { IFormReducerState, FORM_GROUP_REQUEST } from "../reducers/form";
import { GET_USER_REQUEST } from "../reducers/user";
import Head from "next/head";

interface IselectGroupForm {
  groupId: number;
  title: string;
  description: string;
  updatedAt: string;
  organization: string;
  isDefaultGroup: boolean;
  forms: IselectForm[];
  views: number;
}

interface IselectForm {
  formId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  views: number;
}

const FormGroup = () => {
  const MEDIUM_GRAY = "#bfbfbf";
  const dispatch = useDispatch();

  const { formGroup, formGroupTotalNumber } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);

  const [Page, setPage] = useState<number>(1);
  const [Sort, setSort] = useState<string | null>(null);
  const [Query, setQuery] = useState<string>("");
  const [
    SelectFormGroup,
    setSelectFormGroup,
  ] = useState<IselectGroupForm | null>(null);

  const onSelectFormGroupHandler = (formGroup: IselectGroupForm): void => {
    setSelectFormGroup(formGroup);
  };

  const renderFormGroupCard = () =>
    formGroup.map((formGroup, index) => (
      <FormGroupCard
        {...formGroup}
        key={index}
        selectFormGroupHandler={onSelectFormGroupHandler}
        selectFormGroup={SelectFormGroup}
      />
    ));

  const onChangePageUpHandler = () => {
    const maxPage = Math.ceil(formGroupTotalNumber / 10);

    if (Page === maxPage) {
      window.alert("현재 마지막 페이지에 있습니다.");
      return;
    }
    const params = {
      page: Page + 1,
      sort: Sort,
      q: Query,
    };

    dispatch({
      type: FORM_GROUP_REQUEST,
      data: params,
    });

    setPage(Page + 1);
  };

  const onChangePageDownHandler = () => {
    if (Page === 1) {
      window.alert("현재 1 페이지에 있습니다.");
      return;
    } else {
      const params = {
        page: Page - 1,
        sort: Sort,
        q: Query,
      };

      dispatch({
        type: FORM_GROUP_REQUEST,
        data: params,
      });

      setPage(Page - 1);
    }
  };

  const onChangeSortPopularHandler = () => {
    const params = {
      page: Page,
      sort: "popular",
      q: Query,
    };

    dispatch({
      type: FORM_GROUP_REQUEST,
      data: params,
    });

    setSort("popular");
  };

  const onChangeSortLatestHandler = () => {
    const params = {
      page: Page,
      sort: null,
      q: Query,
    };

    dispatch({
      type: FORM_GROUP_REQUEST,
      data: params,
    });

    setSort(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>양식당 ｜ Form Group</title>
        <link rel="shortcut icon" href="/image/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__title}>Form Group</div>
          <div className={styles.header__sort}>
            <div onClick={onChangeSortLatestHandler}>최신순</div>
            <div> ｜ </div>
            <div onClick={onChangeSortPopularHandler}>인기순</div>
          </div>
        </div>
        <SearchBar where={"formGroup"} setQuery={setQuery} />
      </header>
      <div className={styles.number}>(총 {formGroupTotalNumber}개)</div>
      <div className={styles.formGroup}>
        <div className={styles.cheveronLeft} onClick={onChangePageDownHandler}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
        <div className={styles.formGroupCard}>{renderFormGroupCard()}</div>
        <div className={styles.cheveronRight} onClick={onChangePageUpHandler}>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={"1x"}
            color={MEDIUM_GRAY}
          />
        </div>
      </div>
      <FormGroupDescription {...SelectFormGroup} />
    </div>
  );
};

interface IFormList {
  q?: string;
  page: number;
  sort?: string;
}

const formGroupRequest: IFormList = {
  page: 1,
};

FormGroup.getInitialProps = async (context) => {
  context.store.dispatch({
    type: FORM_GROUP_REQUEST,
    data: formGroupRequest,
  });

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });
};

export default FormGroup;
