import Head from "next/head";
import styles from "../styles/Index/Index.module.css";
import LoginForm from "../containers/LoginForm";
import RegisterForm from "../containers/RegisterForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";

interface IimageInfo {
  url: string;
  title: string;
  content: string;
}

const Index = () => {
  const dispatch = useDispatch();

  const [loginClick, setLoginClick] = useState<boolean>(false);
  const [registerClick, setRegisterClick] = useState<boolean>(false);
  const [Slide, setSlide] = useState<boolean>(true);

  const imageInfo: IimageInfo[] = [
    {
      url: "/image/main__formgroup.png",
      title: "Form Group",
      content: "그룹 단위로 묶여 있어 빠르게 문서를 작성할 수 있어요.",
    },
    {
      url: "/image/main__form.png",
      title: "Form",
      content: "개별 폼들을 모아 커스텀한 폼 그룹을 만들 수 있어요.",
    },
    {
      url: "/image/main__write.png",
      title: "Fill Out",
      content: "각 항목에 필요한 정보만 쏙쏙 넣어주면 작성 완료!",
    },
    {
      url: "/image/main__complete.png",
      title: "Print & Download",
      content: "다 작성한 문서는 프린트하거나 다운로드 할 수 있어요.",
    },
    {
      url: "/image/main__history.png",
      title: "History",
      content: "작성한 폼들은 히스토리에서 다시 확인 또는 작성이 가능해요.",
    },
  ];

  const renderImage = () =>
    imageInfo.map((info, index) => (
      <li key={index}>
        <img src={info.url}></img>
        <div className={styles.main__view__animation__imgSlide__desc}>
          <span>{info.title}</span>
          <span>{info.content}</span>
        </div>
      </li>
    ));

  const onLoginGuestMode = (event) => {
    event.preventDefault();

    const guest = { email: "yangsikdang@gmail.com", password: "1111111111" };

    dispatch({
      type: LOG_IN_REQUEST,
      data: guest,
    });
  };

  return (
    <div className={styles.box}>
      <div className={styles.bg}></div>

      <div className={styles.container}>
      
        <Head>
          <title>양식당 ｜ Welcome</title>
          <link rel="shortcut icon" href="/image/favicon.ico" />
        </Head>

        <LoginForm
          loginClick={loginClick}
          setLoginClick={setLoginClick}
          setSlide={setSlide}
        />

        <RegisterForm
          registerClick={registerClick}
          setRegisterClick={setRegisterClick}
          setSlide={setSlide}
          setLoginClick={setLoginClick}
        />

        <header className={styles.header}>
          <div
            onClick={() => {
              setLoginClick(true);
              setTimeout(() => {
                setSlide(false);
              }, 380);
            }}
          >
            Login
          </div>
          <button
            onClick={() => {
              setRegisterClick(true);
              setTimeout(() => {
                setSlide(false);
              }, 380);
            }}
          >
            Register
          </button>
        </header>
        <main className={styles.main}>
          <div className={styles.main__headerWriting}>
            <div className={styles.main__article}>
              <div className={styles.main__article__text1}>For Your Form</div>
              <div className={styles.main__article__text2}>Form Place</div>
            </div>
            <div className={styles.main__headerWriting__blank}></div>
          </div>

          <div className={styles.main__view}>
            <article className={styles.main__view__article}>
              <div>폼플레이스 양식당</div>
              <div>한 번 작성한 그 양식, 또 필요할 때 있잖아요.</div>
              <div>써두었던 양식을 바로바로 꺼내보세요.</div>
              <div>양식당은 여러분의 편리함을 추구하고자 완성되었습니다.</div>
              <button onClick={onLoginGuestMode}>GUEST MODE</button>
            </article>

            <div className={styles.main__view__animation}>
              <div className={styles.main__view__animation__buttonsSlide}>
                {Slide && (
                  <>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </>
                )}
              </div>
              <div
                className={`${styles.main__view__animation__imgSlide} ${
                  !Slide && styles.borderNone
                }`}
              >
                {Slide && (
                  <ul className={styles.main__view__animation__imgSlide__img}>
                    {renderImage()}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </main>
        <footer className={styles.footer}>
          <img className={styles.footer__img} src="/image/logo_white.png"></img>
        </footer>
      </div>
    </div>
  );
};

export default Index;
