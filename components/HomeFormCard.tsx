import React, { FC, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/HomeFormCard.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { IUserReducerState } from "../reducers/user";
import { Iuser } from "../containers/UserProfile";

const HomeFormCard = () => {
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);

  return (
    <div className={styles.container}>
      <div className={styles.number}>01</div>
      <div className={styles.title}>청년내일채움공제</div>
      <div className={styles.formInfo}>
        <div className={styles.formInfo__operation}>한국장학재단</div>
        <div className={styles.formInfo__click}>2351+</div>
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
