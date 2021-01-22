import React, { FC, useState } from "react";
import { faPen, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/HomeFormGroupCard.module.css";
import { useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { Iuser } from "../containers/UserProfile";

interface Props {
  organization: string;
  title: string;
}

const HomeFormGroupCard: FC<Props> = ({ title, organization }) => {
  const userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  const LIGHT_GREEN = "#83cd7f";
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faFolder} size="2x" color={LIGHT_GREEN} />
      <div className={styles.infoBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.operation}>{organization}</div>
      </div>
      <div className={styles.buttonBox}>
        <div className={styles.border}>
          <div className={styles.button}>
            <FontAwesomeIcon icon={faPen} size="sm" color="black" />
          </div>
        </div>
      </div>

      {/* <div className={styles.number}>01</div>
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
      </div> */}
    </div>
  );
};

export default HomeFormGroupCard;
