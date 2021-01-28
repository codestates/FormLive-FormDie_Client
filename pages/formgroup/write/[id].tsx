import React, { useState, useEffect } from "react";
import styles from "../../../styles/FormWrite.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Forms from "../../../containers/Forms";
import { IReducerState } from "../../../reducers";
import { IFormReducerState, WRITE_GROUP_REQUEST } from "../../../reducers/form";

const FormWrite = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { currentGroup } = useSelector<IReducerState, IFormReducerState>(
    (state) => state.form
  );

  const [CurrentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [CompleteForm, setCompleteForm] = useState<number[]>([]);

  const changeFormClickHandler = (index) => {
    if (CurrentFormIndex === index) {
      return;
    }

    if (!CompleteForm.includes(CurrentFormIndex)) {
      const confirm = window.confirm(
        "작성중인 폼이 저장되지 않았습니다.\n폼을 변경하시겠습니까?"
      );
      if (confirm) {
        setCurrentFormIndex(index);
      }
    } else {
      setCurrentFormIndex(index);
    }
  };

  const renderFormList = () =>
    currentGroup?.forms.map((form, index) => {
      const current = CurrentFormIndex === index;

      return (
        <div key={index} className={styles.formListBox}>
          <div className={styles.formListBox__border}>
            {CompleteForm.includes(index) && (
              <img src="/image/check.png" alt="check" />
            )}
          </div>
          <div
            className={`${styles.formListBox__title} ${
              current && styles.yellow
            }`}
            onClick={() => {
              changeFormClickHandler(index);
            }}
          >
            {form.title}
          </div>
        </div>
      );
    });

  const changeCurrentFormHandler = (index) => {
    if (index > currentGroup.forms.length - 1) {
      window.alert("현재 마지막 폼에 위치해 있습니다.");
    } else if (index < 0) {
      window.alert("현재 첫번째 폼에 위치해 있습니다.");
    } else {
      setCurrentFormIndex(index);
    }
  };

  const recordCompleteForm = (formNumber) => {
    setCompleteForm((record) => [...record, formNumber]);
  };

  const cancelHandler = () => {
    router.push("/home");
  };

  const saveHandler = () => {
    window.alert("현재까지 제출된 폼들은 히스토리에 저장되었습니다.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.path}>
        <span>HOME &#62; FORM GROUP &#62; </span>
        <span>{currentGroup?.title}</span>
      </div>
      <div className={styles.form}>
        <Forms
          formId={`Id${currentGroup?.forms[CurrentFormIndex].id}`}
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormIndex={CurrentFormIndex}
          recordCompleteForm={recordCompleteForm}
        />
        <div className={styles.form__right}>
          <div className={styles.form__right__list}>
            <div className={styles.form__right__list__title}>FORM LIST</div>
            <div className={styles.form__right__list__text}>
              {renderFormList()}
            </div>
          </div>
          <div className={styles.form__right__btns}>
            <div onClick={cancelHandler}>취 소 하 기</div>
            <div onClick={saveHandler}>임 시 저 장</div>
            <div>작 성 완 료</div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormWrite.getInitialProps = async (context) => {
  const { id } = context.query;

  console.log("hashtag getInitialProps", id);
  context.store.dispatch({
    type: WRITE_GROUP_REQUEST,
    data: id,
  });

  return { id };
};

export default FormWrite;
