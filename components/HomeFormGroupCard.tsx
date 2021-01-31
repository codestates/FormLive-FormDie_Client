import React, { FC } from "react";
import { faPen, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Home/HomeFormGroupCard.module.css";
import Link from "next/link";

interface Props {
  organization: string;
  title: string;
  groupId: number;
}

const HomeFormGroupCard: FC<Props> = ({ title, organization, groupId }) => {
  const LIGHT_GREEN = "#83cd7f";
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faFolder} size="2x" color={LIGHT_GREEN} />
      <div className={styles.infoBox}>
        <div className={styles.title}>{title}</div>
        <div className={styles.operation}>{organization}</div>
      </div>
      <div className={styles.buttonBox}>
        <Link href={`/formgroup/basic/${groupId}`}>
          <a>
            <div className={styles.border}>
              <div className={styles.button}>
                <FontAwesomeIcon icon={faPen} size="sm" color="black" />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomeFormGroupCard;
