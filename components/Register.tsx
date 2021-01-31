import React from "react";
import styles from "../styles/Index/Register.module.css";
import { useForm } from "react-hook-form";
import { REGISTER_REQUEST, IUserReducerState } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { IReducerState } from "../reducers";

export interface IRegister {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

export default function Register() {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector<IReducerState, IUserReducerState>(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    errors,
    watch,
  } = useForm<IRegister>();

  const onSubmit = async (registerData: IRegister, event) => {
    event.preventDefault();
    dispatch({
      type: REGISTER_REQUEST,
      data: registerData,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.sectionRegister}>
        <div>Register</div>
        <div>양식당에 오신 것을 환영합니다. 회원가입 후 이용해주세요.</div>
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="email"
            name="email"
            ref={register({
              required: true,
            })}
            placeholder="Email Address"
          />
        </div>
        {errors.email && (
          <div className={styles.errorMessage}>Email is required</div>
        )}
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="text"
            name="name"
            ref={register({
              required: true,
              maxLength: 10,
            })}
            placeholder="Nickname"
          />
        </div>
        {errors.name?.type === "required" && (
          <div className={styles.errorMessage}>Nickname is required</div>
        )}
        {errors.name?.type === "minLength" && (
          <div className={styles.errorMessage}>
            Password length is at least 10
          </div>
        )}
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="password"
            name="password"
            ref={register({
              required: true,
              minLength: 10,
            })}
            placeholder="Password"
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

        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="password"
            name="confirm"
            ref={register({
              required: true,
              minLength: 10,
              validate: (value) => value === watch("password"),
            })}
            placeholder="Confirm Password"
          />
        </div>
        {errors.confirm?.type === "required" && (
          <div className={styles.errorMessage}>
            Confirm password is required
          </div>
        )}
        {errors.confirm?.type === "minLength" && (
          <div className={styles.errorMessage}>
            Password length is at least 10
          </div>
        )}
        {errors.confirm?.type === "validate" && (
          <div className={styles.errorMessage}>
            Please make sure your passwords match
          </div>
        )}

        <input
          className={styles.sectionRegister__register}
          type="submit"
          value={isSigningUp ? "Loading..." : "Register"}
        />
      </section>
    </form>
  );
}
