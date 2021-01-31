import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/FormWrite/FormsId.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  SEND_FORM_REQUEST,
  IFormReducerState,
  GET_FORM_REQUEST,
  RESEND_FORM_REQUEST,
} from "../../reducers/form";
import { IReducerState } from "../../reducers";

const Id8 = ({
  changeCurrentFormHandler,
  currentFormIndex,
  recordCompleteForm,
  deleteCompleteForm,
  currentFormInfo,
  setSaveTempForm,
  saveTempForm,
}) => {
  const FORM_ID = 8;
  const dispatch = useDispatch();
  const saveTemp = useRef(null);
  const { sentFormData, resentFormData } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      ...currentFormInfo?.contents,
    },
  });

  const [Required, setRequired] = useState(true);
  const [Service, setService] = useState(true);
  const [FinishService, setFinishService] = useState(true);
  const [School, setSchool] = useState(true);
  const [FirstTime, setFirstTime] = useState(true);

  const onSubmit = (formData, event) => {
    event.preventDefault();

    if (saveTempForm) {
      const tempData = {
        formId: FORM_ID,
        isComplete: false,
        contents: formData,
      };

      if (currentFormInfo.isComplete === null) {
        dispatch({
          type: SEND_FORM_REQUEST,
          data: tempData,
        });
      } else {
        dispatch({
          type: RESEND_FORM_REQUEST,
          data: tempData,
        });
      }
    } else {
      const data = {
        formId: FORM_ID,
        isComplete: true,
        contents: formData,
      };

      if (currentFormInfo.isComplete === null) {
        dispatch({
          type: SEND_FORM_REQUEST,
          data: data,
        });
      } else {
        dispatch({
          type: RESEND_FORM_REQUEST,
          data: data,
        });
      }
    }
  };

  const serviceChangeHandler = (event) => {
    const value = event.currentTarget.value;
    if (value === "필" || value === "전역예정") {
      setService(false);
    } else {
      setService(true);
    }

    if (value === "전역예정") {
      setFinishService(false);
    } else {
      setFinishService(true);
    }
  };

  const schoolChangeHandler = (event) => {
    const value = event.currentTarget.value;
    if (value === "대학교") {
      setSchool(false);
    } else {
      setSchool(true);
    }
  };

  const resetInputHandler = () => {
    reset({});
    deleteCompleteForm(currentFormIndex);
  };

  useEffect(() => {
    if (Object.keys(errors).length && !saveTempForm) {
      window.alert(
        "작성하지 않은 칸이 있습니다.\n빈칸으로 완료하시려면 다시 제출 버튼을 눌러주세요."
      );
      setRequired(false);
    }

    if (FirstTime && sentFormData && !saveTempForm) {
      recordCompleteForm(currentFormIndex);
      dispatch({
        type: GET_FORM_REQUEST,
        data: FORM_ID,
      });
      window.alert("폼이 성공적으로 저장되었습니다.");
    } else if (!FirstTime && sentFormData && saveTempForm) {
      setSaveTempForm(false);
      setTimeout(() => {
        setFirstTime(true);
      }, 1000);
      window.alert("지금까지 작성하신 폼은 히스토리에 임시저장되었습니다.");
    }

    if (FirstTime && resentFormData && !saveTempForm) {
      recordCompleteForm(currentFormIndex);

      dispatch({
        type: GET_FORM_REQUEST,
        data: FORM_ID,
      });
      window.alert("폼이 성공적으로 수정되었습니다.");
    } else if (!FirstTime && resentFormData && saveTempForm) {
      setSaveTempForm(false);
      setTimeout(() => {
        setFirstTime(true);
      }, 1000);

      window.alert("지금까지 작성하신 폼은 히스토리에 임시저장되었습니다.");
    }

    if (FirstTime && saveTempForm) {
      setRequired(false);
      setFirstTime(false);
      deleteCompleteForm(currentFormIndex);
      setTimeout(() => {
        saveTemp.current.click();
      }, 1000);
    }
  }, [errors, sentFormData, resentFormData, saveTempForm]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__header}>
        <div className={styles.form__header__title}>양식당 서류 (예시8)</div>
        <div
          className={styles.form__header__button}
          onClick={resetInputHandler}
        >
          모두 지우기
        </div>
      </div>

      <div className={styles.form__content}>
        <label className={styles.label}>
          <span>성명</span>
          <input
            type="text"
            name="name"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          성별
          <div className={styles.inputBox}>
            <input
              type="radio"
              name="gender"
              value="남"
              checked={true}
              ref={register}
              readOnly
            />
            <span>남</span>
            <input
              type="radio"
              name="gender"
              value="여"
              className={styles.radio}
              ref={register}
              readOnly
            />
            <span>여</span>
          </div>
        </label>
        <label className={styles.label}>
          생년월일{" "}
          <input
            type="date"
            name="birth"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          이메일{" "}
          <input
            type="email"
            name="email"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          전화번호
          <input
            type="tel"
            name="phone"
            className={styles.input}
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            placeholder="010-0000-0000"
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          회사명{" "}
          <input
            type="text"
            name="company"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          직책{" "}
          <input
            type="text"
            name="position"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          직무{" "}
          <input
            type="text"
            name="job"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          병역사항{" "}
          <select
            name="service"
            className={styles.select}
            ref={register({ required: Required })}
            onChange={serviceChangeHandler}
          >
            <option value="">선택 필요</option>
            <option value="필">필</option>
            <option value="미필">미필</option>
            <option value="면제">면제</option>
            <option value="전역예정">전역예정</option>
            <option value="해당없음">해당없음</option>
          </select>
        </label>
        <label className={styles.label}>
          입대일자{" "}
          <input
            type="date"
            name="serviceStart"
            className={styles.input}
            disabled={Service}
            ref={register}
          />
        </label>
        <label className={styles.label}>
          제대(예정)일자{" "}
          <input
            type="date"
            name="serviceEnd"
            className={styles.input}
            disabled={Service}
            ref={register}
          />
        </label>
        <label className={styles.label}>
          취업희망일자(전역예정자){" "}
          <input
            type="date"
            name="jobStart"
            className={styles.input}
            disabled={FinishService}
            ref={register}
          />
        </label>
        <label className={styles.label}>
          최종 학력
          <select
            name="school"
            className={styles.select}
            ref={register({ required: Required })}
            onChange={schoolChangeHandler}
          >
            <option value="">선택 필요</option>
            <option value="중학교">중학교</option>
            <option value="고등학교">고등학교</option>
            <option value="대학교">대학교</option>
          </select>
        </label>
        <label className={styles.label}>
          학교명
          <input
            type="text"
            name="schoolName"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
        <label className={styles.label}>
          학과명(대학교)
          <input
            type="text"
            name="major"
            className={styles.input}
            disabled={School}
            ref={register}
          />
        </label>
        <label className={styles.label}>
          학년
          <select
            name="grade"
            className={styles.select}
            ref={register({ required: Required })}
          >
            <option value="">선택 필요</option>
            <option>1학년</option>
            <option>2학년</option>
            <option>3학년</option>
            <option>4학년</option>
            <option>5학년</option>
          </select>
        </label>
        <label className={styles.label}>
          졸업 여부
          <select
            name="graduate"
            className={styles.select}
            ref={register({ required: Required })}
          >
            <option value="">선택 필요</option>
            <option>졸업</option>
            <option>수료</option>
            <option>중퇴</option>
            <option>휴학</option>
            <option>졸업예정</option>
            <option>재학</option>
          </select>
        </label>
        <label className={styles.label}>
          최종 학력 해당 년도{" "}
          <input
            type="month"
            name="finalYear"
            className={styles.input}
            ref={register({ required: Required })}
          />
        </label>
      </div>
      <div className={styles.form__btn}>
        <div
          className={styles.form__btn__before}
          onClick={() => {
            changeCurrentFormHandler(currentFormIndex - 1);
          }}
        >
          이전
        </div>
        <button className={styles.form__btn__submit} ref={saveTemp}>
          제출
        </button>
        <div
          className={styles.form__btn__next}
          onClick={() => {
            changeCurrentFormHandler(currentFormIndex + 1);
          }}
        >
          다음
        </div>
      </div>
    </form>
  );
};

export default Id8;
