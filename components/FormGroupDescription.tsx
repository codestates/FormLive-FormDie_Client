import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Description.module.css";
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

export default function FormGroupDescription() {
  const FILE_COLOR = "#ffc000";

  const [groupName, setGroupName] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<groupNameEdit>();

  const onSubmit = () => {};

  return (
    <section className={styles.container}>
      <section className={styles.groupName}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={FILE_COLOR} />
        <div
          className={styles.groupName__title}
          onClick={() => {
            setGroupName(!groupName);
          }}
        >
          새 그룹
        </div>
      </section>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>주최기관 </div>
          <span> ｜ </span>
        </div>
        <div className={styles.description__text}>
          <div>최근 업데이트 일자 </div>
          <span> ｜ </span>
        </div>
        <div className={styles.description__text}>
          <div>폼 목록 </div>
          <span> ｜ </span>
        </div>
        <div className={styles.description__text}>
          <div>현재 선택된 폼 목록</div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        <div className={styles.number}>CLICK 351+</div>
        <div className={styles.border}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPen} size="sm" color="black" />
          </div>
        </div>
      </div>
    </section>
  );
}
