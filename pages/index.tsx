// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.css"

export default function Index() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <button>Login</button>
          <button>Register</button>
      </header>
      <main className={styles.main}>
        <div className={styles.main__headerWriting}>
          <section>
            <article className={styles.main__article}>
                  For Your Form <h3>Form Place</h3>
            </article>
          </section>
          <div></div>
        </div>
        
        <div className={styles.main__view}>
          <article className={styles.main__view__article}>
            <div>폼플레이스 양식당</div>
            <div>한 번 작성한 그 양식, 또 필요할 때 있잖아요.</div>
            <div>써두었던 양식을 바로바로 꺼내보세요.</div>
            <div>양식당은 여러분의 편리함을 추구하고자 완성되었습니다.</div>  
            <button>Guest Mode</button>
            
            
          </article>
          <div className={styles.main__view__animation}>
              <div className={styles.main__view__animation__buttonsSlide}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={styles.main__view__animation__imgSlide}>
                <ul className={styles.main__view__animation__imgSlide__img}>
                  <li><img src="https://codestates-photo.s3.ap-northeast-2.amazonaws.com/codestates_logo_thumbnail.png"></img></li>
                  <li><img src="https://media.vlpt.us/images/dlrbwls0302/post/9618b335-487e-4207-abf5-3cd1314c4b19/8912e6c97048361c976be8808888a11063dd917b30e81fbeff41bed064c3abc8_1566706128983642.jpg"></img></li>
                  <li><img src="https://miro.medium.com/max/11284/1*-kUcpLIhlGEL3dIgDYegVg.jpeg"></img></li>
                </ul>
              </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <img className={styles.footer__img} src="/image/logo_white.png"></img>
      </footer>
    </div>
    
  );
}
