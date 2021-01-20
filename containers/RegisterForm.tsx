import { useForm } from "react-hook-form";
import styles from "../styles/RegisterForm.module.css";
export default function RegisterForm({ registerClick, setRegisterClick }) {
	return (
		<div
			className={registerClick ? styles.container__register : styles.container}
		>
			<form>
				<div className={styles.close}>
					<div
						onClick={() => {
							setRegisterClick(false);
						}}
					>
						x
					</div>
				</div>
				<section className={styles.section}>
					<div>Register</div>
					<div>양식당에 오신 것을 환영합니다. 회원가입 후 이용해주세요.</div>
					<div>
						<input
							className={styles.section__email}
							type="email"
							name="email"
							placeholder="Email Address"
						/>
					</div>
					<div>
						<input
							className={styles.section__nickname}
							type="text"
							name="nickname"
							placeholder="Nickname"
						/>
					</div>
					<div>
						<input
							className={styles.section__password}
							type="password"
							placeholder="Password"
						/>
					</div>
					<div>
						<input
							className={styles.section__pwCheck}
							type="password"
							placeholder="Confirm Password"
						/>
					</div>

					<input
						className={styles.section__register}
						type="submit"
						value="Register"
					/>
				</section>
			</form>
		</div>
	);
}
