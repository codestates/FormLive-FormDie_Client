import styles from "../styles/Index/RegisterForm.module.css";
import Register from "../components/Register";
import { useEffect } from "react";
import { IReducerState } from "../reducers";
import { IUserReducerState } from "../reducers/user";
import { useSelector } from "react-redux";

const RegisterForm = ({
  registerClick,
  setRegisterClick,
  setSlide,
  setLoginClick,
}) => {
  const { isSignedUp } = useSelector<IReducerState, IUserReducerState>(
    (state) => state.user
  );

  useEffect(() => {
    if (isSignedUp) {
      window.alert("회원가입에 성공했습니다.");
      setRegisterClick(false);
      setTimeout(() => {
        setLoginClick(true);
      }, 500);
      setSlide(false);
    } else if (isSignedUp === false) {
      window.alert("이미 가입된 아이디입니다.");
    }
  }, [isSignedUp]);

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
};

export default RegisterForm;
