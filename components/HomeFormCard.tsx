import React, { FC, useEffect, useRef, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Home/HomeFormCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IReducerState } from "../reducers";
import { IFormReducerState, NEW_GROUP_REQUEST } from "../reducers/form";
import Link from "next/link";

interface Props {
  formId: number;
  title: string;
  views: number;
  description?: string | null | undefined;
  number: string;
  updated_at: string;
  organization: string;
}
const HomeFormCard: FC<Props> = ({
  formId,
  title,
  views,
  number,
  organization,
}) => {
  number = number.length === 1 ? `0${number}` : number;

  const dispatch = useDispatch();
  const linkToFormGroup = useRef(null);

  const { makeNewFormGroup, currentGroup } = useSelector<
    IReducerState,
    IFormReducerState
  >((state) => state.form);
  const [LinkPage, setLinkPage] = useState<boolean>(false);

  const makeNewFormGroupHandler = () => {
    setLinkPage(true);

    dispatch({
      type: NEW_GROUP_REQUEST,
      data: {
        title: title,
        forms: [formId],
      },
    });
  };

  useEffect(() => {
    if (makeNewFormGroup) {
      linkToFormGroup.current?.click();
    }
  }, [makeNewFormGroup]);

  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.formInfo}>
        <div className={styles.formInfo__operation}>{organization}</div>
        <div className={styles.formInfo__click}>{views}+</div>
      </div>
      <div className={styles.buttonBox}>
        {LinkPage ? (
          <Link href={`/formgroup/custom/${currentGroup?.groupId}`}>
            <a ref={linkToFormGroup}>
              <div className={styles.border}>
                <div
                  className={styles.button}
                  onClick={makeNewFormGroupHandler}
                >
                  <FontAwesomeIcon icon={faPen} size="sm" color="black" />
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className={styles.border}>
            <div className={styles.button} onClick={makeNewFormGroupHandler}>
              <FontAwesomeIcon icon={faPen} size="sm" color="black" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFormCard;
