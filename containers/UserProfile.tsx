import React, { useState, useRef } from "react";
import styles from "../styles/UserProfile.module.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  faEdit,
  faCamera,
  faTrashAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile = () => {
  /* 
  * TODO : 유저 API 생성 후 작업 예정.
  * const { me } = useSelector((state) => state.user);

  * const onSearch = (value) => {
  *   Router.push(
  *     { pathname: "/hashtag", query: { tag: value } },
  *     `/hashtag/${value}`
  *   );
  * };
  
  */

  /*  유저 정보 가져오기 useSelector */

  const dispatch = useDispatch();

  //   let { email, name, profileIconURL } = useSelector((userState) => {
  //     return userState.userReducer.user.userInfo.data;
  //   });

  interface IImageUpload {
    file: string;
    previewURL: any;
  }

  const [Edit, setEdit] = useState<boolean>(false);
  const [VerifyDelete, setVerifyDelete] = useState<boolean>(false);
  const [Delete, setDelete] = useState<boolean>(false);
  const [SuccessEdit, setSuccessEdit] = useState<boolean>(false);
  const [ImageEdit, setImageEdit] = useState<boolean>(false);
  const [ImageUpload, setImageUpload] = useState<IImageUpload>({
    file: "",
    previewURL: "",
  });
  const ICON_COLOR = "white";

  //프로필 이미지가 설정 안되어 있는 유저는 기본 이미지 등록
  let profileIconURL: string | null = null;
  const userBaseImage: string = "/image/guest.svg";
  profileIconURL = profileIconURL ? profileIconURL : userBaseImage;

  //프로필 이미지 변경
  const inputRef = useRef<HTMLInputElement>();

  const onButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChangeImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    if (file.size > 5242880) {
      setImageEdit(true);
      setTimeout(() => setImageEdit(false), 2000);
    } else {
      reader.onloadend = () => {
        setImageUpload({
          file: file,
          previewURL: reader.result,
        });
      };
      file && reader.readAsDataURL(file);
    }
  };

  interface IEditUser {
    img: string;
    name: string;
    password: string;
    repassword: string;
  }

  //유저 수정 폼 제출
  const { register, handleSubmit, watch, errors } = useForm<IEditUser>();

  // {
  //   defaultValues: { name: name },
  // }

  const onSubmit = async (editData, event) => {
    event.preventDefault();
    console.log(editData);
    const Imgfile = ImageUpload.file;
    console.log(Imgfile);
    setSuccessEdit(true);
    setTimeout(() => setSuccessEdit(false), 2000);
  };

  const onEditHandler = () => {
    setEdit(true);
  };

  const onCancelHandler = () => {
    setEdit(false);
    setVerifyDelete(false);
  };

  const onVerifyDeleteHandler = () => {
    setVerifyDelete(true);
  };

  const onDeleteUserHandler = () => {
    // TODO: dispatch로 계정 삭제, 성공 후 2초 정도 삭제 알림 메시지 후 메인으로 push
    setDelete(true);
    setVerifyDelete(false);
    setTimeout(() => setDelete(false), 2000);
  };

  return Edit ? (
    <div className={styles.edit__container}>
      <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.edit__cancel} onClick={onCancelHandler}>
          X
        </div>
        <h2 className={styles.edit__title}>Edit Profile</h2>
        <div className={styles.edit__content}>
          <div className={styles.edit__imgBox}>
            <img
              className={styles.edit__userImage}
              src={
                ImageUpload.previewURL ? ImageUpload.previewURL : profileIconURL
              }
              alt="profile"
            ></img>
            <input
              ref={inputRef}
              className={styles.edit__imageInput}
              type="file"
              accept="image/*"
              name="img"
              onChange={onChangeImage}
            />

            <div className={styles.edit__cameraIcon} onClick={onButtonClick}>
              <FontAwesomeIcon icon={faCamera} size="xs" color={ICON_COLOR} />
            </div>
          </div>

          <div className={styles.edit__userInfo}>
            <input
              type="text"
              name="name"
              ref={register({ maxLength: 10 })}
              placeholder="Nickname"
            />
            {errors.name && (
              <div className={styles.edit__notice_red}>
                닉네임은 최대 10자입니다.
              </div>
            )}
            <input
              type="password"
              name="password"
              ref={register({
                minLength: 10,
              })}
              placeholder="Password"
            />
            {errors.password?.type === "validate" && (
              <div className={styles.edit__notice_red}>
                패스워드가 일치하지 않습니다.
              </div>
            )}
            {errors.password?.type === "minLength" && (
              <div className={styles.edit__notice_red}>
                패스워드는 최소 10자입니다.
              </div>
            )}
            <input
              type="password"
              name="repassword"
              ref={register({
                minLength: 10,
                validate: (value) => value === watch("password"),
              })}
              placeholder="Confirm Password"
            />
            {errors.repassword?.type === "minLength" && (
              <div className={styles.edit__notice_red}>
                패스워드는 최소 10자입니다.
              </div>
            )}
            {errors.repassword?.type === "validate" && (
              <div className={styles.edit__notice_red}>
                패스워드가 일치하지 않습니다.
              </div>
            )}
            {VerifyDelete && (
              <div
                className={styles.edit__notice_red}
                onClick={onDeleteUserHandler}
              >
                계정을 삭제하시겠습니까?
              </div>
            )}
            {ImageEdit && (
              <div className={styles.edit__notice_red}>
                이미지는 5MB 이하입니다.
              </div>
            )}
            {Delete && (
              <div className={styles.edit__notice_green}>
                삭제 완료되었습니다.
              </div>
            )}
            {SuccessEdit && (
              <div className={styles.edit__notice_green}>
                수정 완료되었습니다.
              </div>
            )}

            {!VerifyDelete &&
              !Delete &&
              !SuccessEdit &&
              !ImageEdit &&
              !errors.name &&
              !errors.password &&
              !errors.repassword && (
                <div className={styles.btn}>
                  <div
                    className={styles.btn__delete}
                    onClick={onVerifyDeleteHandler}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="1x"
                      color={ICON_COLOR}
                    />
                  </div>
                  <button className={styles.btn__edit}>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      size="lg"
                      color={ICON_COLOR}
                    />
                  </button>
                </div>
              )}
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className={styles.profile__container}>
      {/* user profile */}
      <div className={styles.user}>
        <img className={styles.user__img} src="/image/guest.svg" />
        <div className={styles.user__nickname}>
          <span>Yeongbba</span>
          <FontAwesomeIcon
            icon={faEdit}
            size="xs"
            color={ICON_COLOR}
            onClick={onEditHandler}
            className={styles.user__editIcon}
          />
        </div>
        <span className={styles.user__email}>yeongmolee@gmail.com</span>
        <button className={styles.user__logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
