import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/FormGroupDescription.module.css";
import {
  faFolder,
  faPen,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormGroupDescription = ({
  title,
  organization,
  updated_at,
  forms,
  description,
  views,
}) => {
  const FILE_COLOR = "#ffc000";

  return (
    <section className={styles.container}>
      <section className={styles.groupName}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={FILE_COLOR} />
        <div className={styles.groupName__title}>{title}</div>
      </section>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>주최기관 ｜ {organization}</div>
        </div>
        <div className={styles.description__text}>
          <div>
            최근 업데이트 일자 ｜{" "}
            {new Date(updated_at).toLocaleDateString("ko")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>
            폼 목록 ｜ {forms?.join(", ")}
            (총 {forms?.length}개)
          </div>
        </div>
        <div className={styles.description__text}>
          <div>{description}</div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        <div className={styles.number}>CLICK {views}+</div>
        <div className={styles.border}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPen} size="sm" color="black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormGroupDescription;
