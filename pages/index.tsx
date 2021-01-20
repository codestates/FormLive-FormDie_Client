// import Head from "next/head";
// import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.css";
import LoginForm from "../containers/LoginForm";
import RegisterForm from "../containers/RegisterForm";
import { useState } from "react";
export default function Index() {
	const [loginClick, setLoginClick] = useState<boolean>(false);
	const [registerClick, setRegisterClick] = useState<boolean>(false);
	return (
		<div className={styles.container}>
			{<LoginForm loginClick={loginClick} setLoginClick={setLoginClick} />}
			{
				<RegisterForm
					registerClick={registerClick}
					setRegisterClick={setRegisterClick}
				/>
			}
			<header className={styles.header}>
				<div
					onClick={() => {
						setLoginClick(true);
					}}
				>
					Login
				</div>
				<button
					onClick={() => {
						setRegisterClick(true);
					}}
				>
					Register
				</button>
			</header>
			<main className={styles.main}>
				<div className={styles.main__headerWriting}>
					<div className={styles.main__article}>
						<div className={styles.main__article__text1}>
							<div>For Your Form</div>
						</div>
						<div className={styles.main__article__text2}>
							<div>Form Place</div>
						</div>
					</div>
					<div className={styles.main__headerWriting__blank}></div>
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
								<li>
									<img src="/image/home.png"></img>
								</li>
								<li>
									<img src="/image/form-group.png"></img>
								</li>
								<li>
									<img src="/image/form.png"></img>
								</li>
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
