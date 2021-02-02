import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/History/HistoryCard.module.css";
import { faFolder, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import {
  CURRENT_HISTORY_REQUEST,
  EDIT_GROUP_REQUEST,
  HISTORY_DELETE_REQUEST,
  IFormReducerState,
} from "../reducers/form";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface Props {
  groupId: number;
  title: string;
  updatedAt: string;
  organization: string;
  isDefaultGroup: boolean;
  forms: [{ id: number; title: string; organization: string }];
}

interface groupNameEdit {
  name: string;
}

const HistoryCard: FC<Props> = ({
  groupId,
  title,
  updatedAt,
  forms,
  organization,
  isDefaultGroup,
}) => {
  const dispatch = useDispatch();
  const LIGHT_GREEN = "#83cd7f";

  const { getCurrentHistory, currentGroup } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);
  const [GoToLink, setGoToLink] = useState(false);
  const [LinkPage, setLinkPage] = useState(false);
  const [newName, setNewName] = useState<string>(title);
  const [changeName, setChangeName] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<groupNameEdit>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (nameData, event) => {
    event.preventDefault();
    setNewName(nameData.name);
    setChangeName(false);

    dispatch({
      type: EDIT_GROUP_REQUEST,
      data: {
        groupId,
        title: nameData.name,
      },
    });
  };

  const formWritePage = useRef(null);

  const goToFormPageHandler = () => {
    setGoToLink(true);
    setLinkPage(true);

    dispatch({
      type: CURRENT_HISTORY_REQUEST,
      data: groupId,
    });
  };

  const onDeleteClick = () => {
    const confirm = window.confirm(`${title} 기록을 정말 삭제하시겠습니까?`);

    if (confirm) {
      dispatch({
        type: HISTORY_DELETE_REQUEST,
        data: groupId,
      });
    }
  };

  const organizationSet = () => {
    const organizationList = forms.map((form) => form.organization);

    const set: any = new Set<string>(organizationList);

    return [...set];
  };

  useEffect(() => {
    if (errors?.name?.type === "required") {
      window.alert("그룹 이름은 필수 사항입니다.");
    } else if (errors?.name?.type === "maxLength") {
      window.alert("그룹 이름은 15글자 이하로 지어주세요.");
    }

    if (GoToLink && getCurrentHistory) {
      const finish = currentGroup.forms.every(
        (form) => form.isComplete === true
      );
      setGoToLink(false);

      if (finish) {
        window.location.href = `https://yangsikdang.ml/formgroup/complete/history/${groupId}`;
      } else {
        formWritePage.current.click();
      }
    }

    setNewName(title);
  }, [errors, getCurrentHistory, title]);

  return (
    <section className={styles.container}>
      <div className={styles.section}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={LIGHT_GREEN} />
        {changeName && !isDefaultGroup ? (
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
            className={`${styles.section__title} ${
              !isDefaultGroup && styles.cursor
            }`}
            onClick={() => {
              setChangeName(!changeName);
            }}
          >
            {newName}
          </div>
        )}
      </div>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>
            주최기관 ｜{" "}
            {organization ? organization : organizationSet().join(", ")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>
            최근 업데이트 일자 ｜ {new Date(updatedAt).toLocaleDateString("ko")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>
            선택된 폼 목록 ｜ {forms.map((el) => el.title).join(", ")}(총{" "}
            {forms?.length}개)
          </div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        {LinkPage ? (
          <Link href={`/formgroup/history/${groupId}`}>
            <a ref={formWritePage}>
              <div className={styles.border}>
                <div className={styles.button}>
                  <img src="/image/002-eye.svg" className={styles.icon} />
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className={styles.border}>
            <div className={styles.button} onClick={goToFormPageHandler}>
              <img src="/image/002-eye.svg" className={styles.icon} />
            </div>
          </div>
        )}
        <div className={styles.border}>
          <div
            className={styles.button}
            onClick={() => {
              onDeleteClick();
            }}
          >
            <img src="/image/003-trash.svg" className={styles.icon} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HistoryCard;
