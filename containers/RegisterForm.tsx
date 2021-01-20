import styles from "../styles/RegisterForm.module.css";
import Register from "../components/Register";
export default function RegisterForm({
  registerClick,
  setRegisterClick,
  setSlide,
}) {
  return (
    <div
      className={registerClick ? styles.container__register : styles.container}
    >
      <div className={styles.close}>
        <div
          onClick={() => {
            setRegisterClick(false);
            setSlide(true);
          }}
        >
          x
        </div>
      </div>
      <Register />
    </div>
  );
}
