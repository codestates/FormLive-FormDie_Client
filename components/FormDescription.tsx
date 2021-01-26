import React, { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/FormDescription.module.css";
import {
  faFolder,
  faPen,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface groupNameEdit {
  name: string;
}

interface Props {
  selectForm: any[];
}

const FormDescription: FC<Props> = ({ selectForm }) => {
  const FILE_COLOR = "#ffc000";

  const [newName, setNewName] = useState<string>("새 그룹");
  const [changeName, setChangeName] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<groupNameEdit>({
    defaultValues: { name: newName },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (nameData, event) => {
    event.preventDefault();
    console.log(errors);

    setNewName(nameData.name);
    setChangeName(false);
  };

  useEffect(() => {
    if (errors?.name?.type === "required") {
      window.alert("그룹 이름은 필수 사항입니다.");
    } else if (errors?.name?.type === "maxLength") {
      window.alert("그룹 이름은 15글자 이하로 지어주세요.");
    }
  }, [errors?.name?.type]);

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
            주최기관 ｜ {selectForm.map((form) => form.organization).join(", ")}
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
        <div className={styles.border}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPen} size="sm" color="black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormDescription;
