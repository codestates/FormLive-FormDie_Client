import React, { FC, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Form/FormDescription.module.css";
import {
  faFolder,
  faPen,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IFormReducerState, NEW_GROUP_REQUEST } from "../reducers/form";
import { IReducerState } from "../reducers";
import Link from "next/link";

interface groupNameEdit {
  name: string;
}

interface Props {
  selectForm: any[];
}

const FormDescription: FC<Props> = ({ selectForm }) => {
  const FILE_COLOR = "#ffc000";
  const dispatch = useDispatch();
  const { makeNewFormGroup, currentGroup } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);
  const linkToFormGroup = useRef(null);

  const [newName, setNewName] = useState<string>("새 그룹");
  const [changeName, setChangeName] = useState<boolean>(false);
  const [FormIdArr, setFormIdArr] = useState<number[]>([]);
  const [LinkPage, setLinkPage] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<groupNameEdit>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const onSubmit = (nameData, event) => {
    event.preventDefault();
    setNewName(nameData.name);
    setChangeName(false);
  };

  useEffect(() => {
    if (errors?.name?.type === "required") {
      window.alert("그룹 이름은 필수 사항입니다.");
    } else if (errors?.name?.type === "maxLength") {
      window.alert("그룹 이름은 15글자 이하로 지어주세요.");
    }

    if (selectForm && selectForm.length !== FormIdArr.length) {
      const formToId = selectForm.map((form) => form.formId);
      setFormIdArr([...formToId]);
    }

    if (makeNewFormGroup) {
      linkToFormGroup.current?.click();
    }
  }, [errors?.name?.type, selectForm, makeNewFormGroup]);

  const makeNewFormGroupHandler = () => {
    if (!selectForm.length) {
      window.alert("현재 선택된 폼이 없습니다.");
    } else {
      setLinkPage(true);

      dispatch({
        type: NEW_GROUP_REQUEST,
        data: {
          title: newName,
          forms: FormIdArr,
        },
      });
    }
  };

  const organizationSet = () => {

    const organizationList = selectForm.map((form) => form.organization)

    const set: any = new Set<string>(organizationList);

    return [...set]
  }

  return (
    <section className={styles.container}>
      <section className={styles.groupName}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={FILE_COLOR} />
        {changeName ? (
          <form
            className={styles.groupName__form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              name="name"
              className={styles.groupName__form__input}
              ref={register({ required: true, maxLength: 15 })}
            />
            <div className={styles.groupName__form__btn}>
              <button className={styles.groupName__form__submit}>
                <FontAwesomeIcon icon={faCheck} size="sm" color="black" />
              </button>

              <div
                className={styles.groupName__form__cancel}
                onClick={() => {
                  setChangeName(!changeName);
                }}
              >
                <FontAwesomeIcon icon={faTimes} size="sm" color="black" />
              </div>
            </div>
          </form>
        ) : (
          <div
            className={styles.groupName__title}
            onClick={() => {
              setChangeName(!changeName);
            }}
          >
            {newName}
          </div>
        )}
      </section>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>
            주최기관 ｜ {organizationSet().join(", ")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>생성일자 ｜ {new Date().toLocaleDateString("ko")}</div>
        </div>
        <div className={styles.description__text}>
          <div>
            현재 선택된 폼 목록 ｜
            {selectForm.map((form) => form.title).join(", ")}
            (총 {selectForm.length}개)
          </div>
        </div>
        <div className={styles.description__text}>
          <div></div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        {LinkPage ? (
          <Link href={`/formgroup/custom/${currentGroup?.groupId}`}>
            <a ref={linkToFormGroup}>
              <div className={styles.border}>
                <div className={styles.button}>
                  <FontAwesomeIcon icon={faPen} size="sm" color="black" />
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className={styles.border}>
            <div className={styles.button} onClick={makeNewFormGroupHandler}>
              <FontAwesomeIcon icon={faPen} size="sm" color="black" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormDescription;
