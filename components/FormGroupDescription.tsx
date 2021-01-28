import styles from "../styles/FormGroupDescription.module.css";
import { faFolder, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { WRITE_GROUP_REQUEST } from "../reducers/form";

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
            최근 업데이트 일자 ｜ {new Date(updatedAt).toLocaleDateString("ko")}
          </div>
        </div>
        <div className={styles.description__text}>
          <div>
            폼 목록 ｜ {forms?.map((form) => form.title).join(", ")}
            (총 {forms?.length}개)
          </div>
        </div>
        <div className={styles.description__text}>
          <div>{description}</div>
        </div>
      </section>
      <div className={styles.buttonBox}>
        <div className={styles.number}>CLICK {views}+</div>

        {groupId ? (
          <Link href={`/formgroup/write/${groupId}`}>
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
            <div className={styles.button}>
              <FontAwesomeIcon icon={faPen} size="sm" color="black" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormGroupDescription;
