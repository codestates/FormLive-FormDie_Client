import React, { useState, useEffect } from "react";
import styles from "../../../styles/FormWrite/FormWrite.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Forms from "../../../containers/Forms";
import { IReducerState } from "../../../reducers";
import {
  CURRENT_HISTORY_REQUEST,
  IFormReducerState,
} from "../../../reducers/form";
import { GET_USER_REQUEST } from "../../../reducers/user";
import Head from "next/head";

const FormWriteHistory = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentGroup } = useSelector<IReducerState, IFormReducerState>(
    (state) => state.form
  );

  const [CurrentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [CompleteForm, setCompleteForm] = useState<number[]>([]);
  const [SaveTempForm, setSaveTempForm] = useState<boolean>(false);

  useEffect(() => {
    const completedForm = [];

    currentGroup?.forms.forEach((form, index) => {
      if (form.contents) {
        completedForm.push(index);
      }
    });

    setCompleteForm([...completedForm]);
  }, [currentGroup]);

  const changeFormClickHandler = (index) => {
    if (CurrentFormIndex === index) {
      return;
    }

    if (!CompleteForm.includes(CurrentFormIndex)) {
      const confirm = window.confirm(
        "작성중인 폼이 완성되지 않았습니다.\n폼을 변경하시겠습니까?"
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
      if (!CompleteForm.includes(CurrentFormIndex)) {
        const confirm = window.confirm(
          "작성중인 폼이 완성되지 않았습니다.\n폼을 변경하시겠습니까?"
        );
        if (confirm) {
          setCurrentFormIndex(index);
        }
      } else {
        setCurrentFormIndex(index);
      }
    }
  };

  const recordCompleteForm = (formNumber) => {
    setCompleteForm((record) => [...record, formNumber]);
  };

  const deleteCompleteForm = (formNumber) => {
    const deleteIndex = CompleteForm.indexOf(formNumber);
    const copyCompleteForm = CompleteForm.slice();

    copyCompleteForm.splice(deleteIndex, 1);

    setCompleteForm([...copyCompleteForm]);
  };

  const cancelHandler = () => {
    router.push("/home");
  };

  const saveHandler = () => {
    setSaveTempForm(true);
  };

  const finishHandler = () => {
    if (CompleteForm.length !== currentGroup.forms.length) {
      window.alert("아직 작성하지 않은 폼이 있습니다.");
    } else {
      window.location.href = `https://yangsikdang.ml/formgroup/complete/new/${id}`;
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>양식당 ｜ Form Group</title>
        <link rel="shortcut icon" href="/image/favicon.ico" />
      </Head>
      <div className={styles.form}>
        <div className={styles.form__path}>
          <span>HOME &#62; FORM GROUP &#62; </span>
          <span>{currentGroup?.title}</span>
        </div>
        <div className={styles.form__content}>
          <Forms
            formId={`Id${currentGroup?.forms[CurrentFormIndex].id}`}
            changeCurrentFormHandler={changeCurrentFormHandler}
            currentFormIndex={CurrentFormIndex}
            currentFormInfo={currentGroup?.forms[CurrentFormIndex]}
            recordCompleteForm={recordCompleteForm}
            deleteCompleteForm={deleteCompleteForm}
            saveTempForm={SaveTempForm}
            setSaveTempForm={setSaveTempForm}
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
              <div onClick={finishHandler}>작 성 완 료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormWriteHistory.getInitialProps = async (context) => {
  const { id } = context.query;

  context.store.dispatch({
    type: CURRENT_HISTORY_REQUEST,
    data: id,
  });

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });

  return { id };
};

export default FormWriteHistory;
