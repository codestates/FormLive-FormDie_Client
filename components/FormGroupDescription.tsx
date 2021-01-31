import styles from "../styles/FormGroup/FormGroupDescription.module.css";
import { faFolder, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const FormGroupDescription = ({
  title,
  organization,
  updatedAt,
  forms,
  description,
  views,
  groupId,
}) => {
  const FILE_COLOR = "#ffc000";

  const nothingHappenHandler = () => {
    !groupId && window.alert("현재 선택된 폼그룹이 없습니다.");
  };

  return (
    <section className={styles.container}>
      <section className={styles.groupName}>
        <FontAwesomeIcon icon={faFolder} size={"4x"} color={FILE_COLOR} />
        <div className={styles.groupName__title}>
          {!title ? "양식당 폼그룹" : title}
        </div>
      </section>
      <section className={styles.description}>
        <div className={styles.description__text}>
          <div>주최기관 ｜ {organization}</div>
        </div>
        <div className={styles.description__text}>
          <div>
            최근 업데이트 일자 ｜{" "}
            {!updatedAt
              ? new Date().toLocaleDateString("ko")
              : new Date(updatedAt).toLocaleDateString("ko")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>
            폼 목록 ｜ {forms?.map((form) => form.title).join(", ")}
            (총 {!forms?.length ? 0 : forms?.length}개)
          </div>
        </div>
        <div className={styles.description__text}>
          <div>{description}</div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        <div className={styles.number}>{!views ? 0 : views} VIEWS</div>

        {groupId ? (
          <Link href={`/formgroup/basic/${groupId}`}>
            <a>
              <div className={styles.border}>
                <div className={styles.button}>
                  <FontAwesomeIcon icon={faPen} size="sm" color="black" />
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className={styles.border}>
            <div className={styles.button} onClick={nothingHappenHandler}>
              <FontAwesomeIcon icon={faPen} size="sm" color="black" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormGroupDescription;
