import React, { useState, useEffect } from "react";
import styles from "../styles/Index/LoginForm.module.css";
import { useForm } from "react-hook-form";
import Register from "../components/Register";
import { IReducerState } from "../reducers";
import { IUserReducerState, LOG_IN_REQUEST } from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface Ilogin {
  email: string;
  password: string;
}

const LoginForm = ({ loginClick, setLoginClick, setSlide }) => {
  const [registerButtonClick, setRegisterButtonClick] = useState<boolean>(
    false
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const { isSignedUp, isLoggedIn } = useSelector<
    IReducerState,
    IUserReducerState
  >((state) => state.user);

  useEffect(() => {
    if (isSignedUp) {
      setRegisterButtonClick(false);
      setSlide(false);
    }

    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isSignedUp, isLoggedIn]);

  const { register, handleSubmit, errors } = useForm<Ilogin>();

  const onSubmit = (loginData: Ilogin, event) => {
    event.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: loginData,
    });
  };

  return (
    <div className={loginClick ? styles.container__login : styles.container}>
      <div className={styles.close}>
        <div
          onClick={() => {
            setLoginClick(false);
            setTimeout(() => {
              setRegisterButtonClick(false);
            }, 500);
            setSlide(true);
          }}
        >
          x
        </div>
      </div>
      {registerButtonClick ? (
        <Register />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <div className={styles.section__text1}>Welcome</div>
            <div className={styles.section__text2}>
              양식당에 오신 것을 환영합니다. 로그인 후 이용해주세요.
            </div>
            <figure className={styles.section__figure}>
              <img
                onClick={() =>
                  window.location.assign("https://yangsikdang.ml:5000/auth/kakao")
                }
                src="/image/kakao.png"
              ></img>
              <img
                onClick={() =>
                  window.location.assign("https://yangsikdang.ml:5000/auth/naver")
                }
                src="/image/naver.png"
              ></img>
              <img
                onClick={() =>
                  window.location.assign("https://yangsikdang.ml:5000/auth/google")
                }
                src="/image/google.png"
              ></img>
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
            {errors.email && (
              <div className={styles.errorMessage}>Email is required</div>
            )}
            <div className={styles.section__input__border}>
              <input
                className={styles.section__input__border__input}
                type="password"
                name="password"
                placeholder="Password"
                ref={register({ required: true, minLength: 10 })}
              />
            </div>
            {errors.password?.type === "required" && (
              <div className={styles.errorMessage}>Password is required</div>
            )}
            {errors.password?.type === "minLength" && (
              <div className={styles.errorMessage}>
                Password length is at least 10
              </div>
            )}
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
};

export default LoginForm;
