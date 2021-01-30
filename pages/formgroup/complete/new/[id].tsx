import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IReducerState } from "../../../../reducers";
import { Iuser } from "../../../../containers/UserProfile";
import { GET_USER_REQUEST } from "../../../../reducers/user";
import { styles } from "../../../../styles/preview";
import { Page, Text, Document, PDFViewer, Image } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import Documents from "../../../../containers/Documents";
import { IFormReducerState } from "../../../../reducers/form";
import style from "../../../../styles/CompleteForm.module.css";
import Head from "next/head";

// const MyDoc = ({ userInfo }) => {
// 	const uri: string = "https://yangsikdang.ml:5000/user/icon/example.png";
// 	console.log(userInfo);
// 	return (
// 		<Document>
// 			<Page>
// 				<Image
// 					src={require("../../../../public/image/formPreview-min.png")}
// 					style={styles.image}
// 				/>
// 				{/* <Image src={uri} /> */}
// 				<Text style={styles.text__name}>{userInfo.name}</Text>
// 				<Text style={styles.text__birthday}>21.01.29</Text>
// 				<Text style={styles.text__numbers}>010-1234-1234</Text>
// 				<Text style={styles.text__position}>팀장</Text>
// 				<Text style={styles.text__gender}>asb</Text>
// 				<Text style={styles.text__email}>{userInfo.email}</Text>
// 				<Text style={styles.text__company}>asb</Text>
// 				<Text style={styles.text__job}>asb</Text>
// 				<Text style={styles.text__sign__year}>2021</Text>
// 				<Text style={styles.text__sign__month}>01</Text>
// 				<Text style={styles.text__sign__day}>29</Text>
// 				<Text style={styles.text__academic__year1}>2021</Text>
// 				<Text style={styles.text__academic__year2}>2021</Text>
// 				<Text style={styles.text__academic__school}>코딩</Text>
// 				<Text style={styles.text__academic__university}>코딩</Text>
// 				<Text style={styles.text__academic__university_department}>컴공</Text>
// 				<Text style={styles.text__sign__name}>{userInfo.name}</Text>

// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__military1}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__military2}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__military3}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__military4}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__military5}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic1}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic2}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic3}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic4}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic5}
// 				/>
// 				<Image
// 					src={require("../../../../public/image/015-check-mark.png")}
// 					style={styles.checkImg__academic6}
// 				/>

// 				{/* {userInfo.map((el, index) => {
// 					return (
// 						<Text key={index}>{el}</Text>
// 				})} */}
// 			</Page>
// 		</Document>
// 	);
// };

const Preview = () => {
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
            <div>수 정 하 기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Preview.getInitialProps = async (context) => {
  const { id } = context.query;

  console.log("hashtag getInitialProps", id);

  context.store.dispatch({
    type: GET_USER_REQUEST,
  });

  return { id };
};

export default Preview;
