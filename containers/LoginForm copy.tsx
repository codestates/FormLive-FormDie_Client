import React, { FC, ReactElement, useState } from "react";
import styles from "../styles/LoginForm.module.css";
import { useForm } from "react-hook-form";
import Register from "../components/Register";
export default function LoginForm({ loginClick, setLoginClick, setSlide }) {
  interface login {
    email: string;
    password: string;
  }
  const [registerButtonClick, setRegisterButtonClick] = useState<boolean>(
    false
  );
  const { register, handleSubmit, errors } = useForm<login>();
  return (
    <div className={loginClick ? styles.container__login : styles.container}>
      {registerButtonClick ? (
        <Register />
      ) : (
        // <form>
        //   <div className={styles.close}>
        //     <div
        //       onClick={() => {
        //         setLoginClick(false);
        //         setTimeout(() => {
        //           setRegisterButtonClick(false);
        //         }, 500);
        //         setSlide(true);
        //       }}
        //     >
        //       x
        //     </div>
        //   </div>
        //   <section className={styles.sectionRegister}>
        //     <div>Register</div>
        //     <div>양식당에 오신 것을 환영합니다. 회원가입 후 이용해주세요.</div>
        //     <div>
        //       <input
        //         className={styles.sectionRegister__email}
        //         type="email"
        //         name="email"
        //         placeholder="Email Address"
        //       />
        //     </div>
        //     <div>
        //       <input
        //         className={styles.sectionRegister__nickname}
        //         type="text"
        //         name="nickname"
        //         placeholder="Nickname"
        //       />
        //     </div>
        //     <div>
        //       <input
        //         className={styles.sectionRegister__password}
        //         type="password"
        //         placeholder="Password"
        //       />
        //     </div>
        //     <div>
        //       <input
        //         className={styles.sectionRegister__pwCheck}
        //         type="password"
        //         placeholder="Confirm Password"
        //       />
        //     </div>

        //     <input
        //       className={styles.sectionRegister__register}
        //       type="submit"
        //       value="Register"
        //     />
        //   </section>
        // </form>
        <form>
          <div className={styles.close}>
            <div
              onClick={() => {
                setLoginClick(false);
                setSlide(true);
              }}
            >
              x
            </div>
          </div>
          <section className={styles.section}>
            <div className={styles.section__text1}>Welcome</div>
            <div className={styles.section__text2}>
              양식당에 오신 것을 환영합니다. 로그인 후 이용해주세요.
            </div>
            <figure className={styles.section__figure}>
              <img src="/image/kakao.png"></img>
              <img src="/image/naver.png"></img>
              <img src="/image/google.png"></img>
            </figure>
            <div className={styles.section__input__border}>
              <input
                className={styles.section__input__border__input}
                type="email"
                name="email"
                placeholder="Email Address"
                ref={register({ required: true })}
              />
            </div>
            <div className={styles.section__input__border}>
              <input
                className={styles.section__input__border__input}
                type="password"
                name="password"
                placeholder="Password"
                ref={register({ required: true, minLength: 10 })}
              />
            </div>
            <input
              className={styles.section__submit}
              type="submit"
              value="Sign in"
            />
            <div className={styles.section__login__register}>
              <div className={styles.section__login__register__text1}>
                아이디가 없으신가요?
              </div>
              <div
                className={styles.section__login__register__text2}
                onClick={() => {
                  setRegisterButtonClick(true);
                }}
              >
                REGISTER
              </div>
            </div>
          </section>
        </form>
      )}
    </div>
  );
}
