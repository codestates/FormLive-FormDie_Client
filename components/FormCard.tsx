import React, { FC, useState, useEffect } from "react";
import styles from "../styles/Form/FormCard.module.css";

interface Props {
  formId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  selectFormHandler: (formId: any) => void;
  selectForm: IselectForm[];
  page: number;
  number: number;
  views: number;
}

interface IselectForm {
  formId: number;
  title: string;
  description: string;
  updated_at: string;
  organization: string;
  views: number;
}

const FormCard: FC<Props> = ({
  formId,
  title,
  description,
  updated_at,
  selectForm,
  organization,
  views,
  selectFormHandler,
  number,
  page,
}) => {
  const [formViewClick, setFormViewClick] = useState<boolean>(false);

  const checkFormHandler = () => {
    let newSelectForm: IselectForm[];

    if (selectForm.findIndex((form) => form.formId === formId) >= 0) {
      newSelectForm = selectForm.filter((form) => form.formId !== formId);
    } else {
      newSelectForm = [
        ...selectForm,
        { formId, title, description, updated_at, organization, views },
      ];
    }
    selectFormHandler(newSelectForm);
  };

  useEffect(() => {
    if (selectForm.findIndex((form) => form.formId === formId) >= 0) {
      setFormViewClick(true);
    } else {
      setFormViewClick(false);
    }
  }, [formId]);

  return (
    <section
      className={`${styles.section2__formView} ${
        formViewClick && styles.section2__formView__click
      }`}
      onClick={() => {
        if (selectForm.length >= 10 && !formViewClick) {
          window.alert("최대 10개의 폼을 선택할 수 있어요.");
        } else {
          setFormViewClick(!formViewClick);
          checkFormHandler();
        }
      }}
    >
      <div className={styles.section2__formView__formId}>
        <div>
          {(page - 1) * 12 + number < 10
            ? `0${number}`
            : number + (page - 1) * 12}
        </div>
      </div>
      <section className={styles.section2__formView__text}>
        <div className={styles.section2__formView__text__title}>{title}</div>
        <div className={styles.section2__formView__text__main}>
          <div>{organization}</div>
          <div>({new Date(updated_at).toLocaleDateString("ko")} updated)</div>
        </div>
      </section>
    </section>
  );
};

export default FormCard;
