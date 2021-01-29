import { FC } from "react";
import styles from "../styles/HistoryCard.module.css";
import { faFolder, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HISTORY_LIST_REQUEST } from "../reducers/history";
import { historyQuery } from "../pages/history";

interface Props {
  groupId: number;
  title: string;
  updatedAt: string;
  forms: [{ id: number; title: string }];
}
const HistoryCard: FC<Props> = ({ groupId, title, updatedAt, forms }) => {
  const dispatch = useDispatch();
  const queryParameter: historyQuery = {
    page: 1,
  };
  const LIGHT_GREEN = "#83cd7f";
  const onDeleteClick = () => {
    console.log(groupId);
    axios
      .delete("/group", { data: { groupId: groupId }, withCredentials: true })
      .then((result) =>
        dispatch({ type: HISTORY_LIST_REQUEST, data: queryParameter })
      );
  };
  return (
    <section className={styles.container}>
      <div className={styles.section}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={LIGHT_GREEN} />
        <div className={styles.section__title}>{title}</div>
      </div>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>주최기관 ｜ {title}</div>
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
        <div className={styles.border}>
          <div className={styles.button}>
            <img src="/image/002-eye.svg" className={styles.icon} />
          </div>
        </div>
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
