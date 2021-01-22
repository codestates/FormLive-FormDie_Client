import React, { FC, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/HomeFormCard.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { IUserReducerState } from "../reducers/user";
import { Iuser } from "../containers/UserProfile";
interface Props {
  title: string;
  views: number;
  description?: any;
  number: string;
  updated_at?: any;
  organization: string;
}
const HomeFormCard: FC<Props> = ({
  title,
  description,
  views,
  updated_at,
  number,
  organization,
}) => {
  number = number.length === 1 ? `0${number}` : number;

  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.formInfo}>
        <div className={styles.formInfo__operation}>{organization}</div>
        <div className={styles.formInfo__click}>{views}+</div>
      </div>
      <div className={styles.buttonBox}>
        <div className={styles.border}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPen} size="sm" color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFormCard;
