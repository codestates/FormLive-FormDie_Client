import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IReducerState } from "../../../../reducers";
import { GET_USER_REQUEST } from "../../../../reducers/user";
import { styles } from "../../../../styles/FormComplete/preview";
import { PDFViewer } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import Documents from "../../../../containers/Documents";
import { IFormReducerState } from "../../../../reducers/form";
import style from "../../../../styles/FormComplete/CompleteForm.module.css";
import Head from "next/head";
import Link from "next/link";

const PreviewHistory = () => {
  const router = useRouter();
  const { id } = router.query;

  const { currentGroup } = useSelector<IReducerState, IFormReducerState>(
    (state) => state.form
  );

  const formList = currentGroup?.forms.map((form) => {
    return { id: `Id${form.id}`, contents: form.contents };
  });

  const [isClient, setIsClient] = useState(false);

  const renderFormList = () =>
    currentGroup?.forms.map((form, index) => {
      return (
        <div key={index} className={style.formListBox}>
          <div className={style.formListBox__border}>
            <img src="/image/check.png" alt="check" />
          </div>
          <div className={style.formListBox__title}>{form.title}</div>
        </div>
      );
    });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={style.container}>
      <Head>
        <title>양식당 ｜ Form Group</title>
        <link rel="shortcut icon" href="/image/favicon.ico" />
      </Head>
      <div className={style.form}>
        <div className={style.form__content}>
          <div className={style.form__path}>
            <span>HOME &#62; FORM GROUP &#62; </span>
            <span>{currentGroup?.title}</span>
          </div>
          {isClient && (
            <PDFViewer style={styles.viewer}>
              <Documents formList={formList} />
            </PDFViewer>
          )}
        </div>
        <div className={style.form__right}>
          <div className={style.form__right__list}>
            <div className={style.form__right__list__title}>FORM LIST</div>
            <div className={style.form__right__list__text}>
              {renderFormList()}
            </div>
          </div>
          <div className={style.form__right__btns}>
            <Link href={`/formgroup/history/${id}`}>
              <a>
                <div>수 정 하 기</div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

PreviewHistory.getInitialProps = async (context) => {
  const { id } = context.query;

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });

  return { id };
};

export default PreviewHistory;
