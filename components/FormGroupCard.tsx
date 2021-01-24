import React, { FC, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/FormGroupCard.module.css";

interface Props {
  formId?: number;
  title: string;
  description: string;
  date: string;
  count: number;
}
const FormGroupCard: FC<Props> = ({ title, description, date, count }) => {
  const [formGroupCardViewClick, setFormGroupCardViewClick] = useState<boolean>(
    false
  );
  const LIGHT_GREEN = "#83cd7f";

  return (
    <section
      className={`${styles.container} ${
        formGroupCardViewClick && styles.container__click
      }`}
      onClick={() => {
        setFormGroupCardViewClick(!formGroupCardViewClick);
      }}
    >
      <FontAwesomeIcon icon={faFolder} size={"3x"} color={LIGHT_GREEN} />
      <article className={styles.title}>{title}</article>
      <section className={styles.formGroupInfo}>
        <div className={styles.formGroupInfo__description}>{description}</div>
        <div className={styles.formGroupInfo__count}>{count}+</div>
      </section>
      <div className={styles.date}>({date} Updated)</div>
    </section>
  );
};

export default FormGroupCard;
