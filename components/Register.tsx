import React, { FC, ReactElement, useState } from "react";
import styles from "../styles/Register.module.css";
import { useForm } from "react-hook-form";
export default function Register() {
  interface login {
    email: string;
    password: string;
  }

  const { register, handleSubmit, errors } = useForm<login>();

  return (
    <form>
      <section className={styles.sectionRegister}>
        <div>Register</div>
        <div>양식당에 오신 것을 환영합니다. 회원가입 후 이용해주세요.</div>
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="email"
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="text"
            name="nickname"
            placeholder="Nickname"
          />
        </div>
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.sectionRegister__box}>
          <input
            className={styles.sectionRegister__input}
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <input
          className={styles.sectionRegister__register}
          type="submit"
          value="Register"
        />
      </section>
    </form>
  );
}
