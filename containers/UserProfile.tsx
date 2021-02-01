import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home/UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  faEdit,
  faCamera,
  faTrashAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IReducerState } from "../reducers";
import {
  EDIT_PROFILE_REQUEST,
  CHANGE_IMAGE_REQUEST,
  LOG_OUT_REQUEST,
  DELETE_USER_REQUEST,
} from "../reducers/user";
import { useRouter } from "next/router";

export interface Iuser {
  id: number;
  email: string;
  name: string;
  profileIconURL?: string;
  isAdmin: number;
}

interface IImageUpload {
  file: string;
  previewURL: any;
}

interface IEditUser {
  img: string;
  name: string;
  password: string;
  repassword: string;
}

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let userInfo = useSelector<IReducerState, Iuser>((state) => state.user.me);
  let logIn = useSelector<IReducerState, boolean>(
    (state) => state.user.isLoggedIn
  );

  let changeImage = useSelector<IReducerState, boolean>(
    (state) => state.user.isChangedImage
  );

  const [Edit, setEdit] = useState<boolean>(false);
  const [VerifyDelete, setVerifyDelete] = useState<boolean>(false);
  const [SuccessEdit, setSuccessEdit] = useState<boolean>(false);
  const [ImageEdit, setImageEdit] = useState<boolean>(false);
  const [NoneEdit, setNoneEdit] = useState<boolean>(false);
  const [NonePassword, setNonePassword] = useState<boolean>(false);
  const [Image, setImage] = useState<string | null>(
    userInfo?.profileIconURL ? userInfo.profileIconURL : null
  );
  const [ImageUpload, setImageUpload] = useState<IImageUpload>({
    file: "",
    previewURL: "",
  });

  const ICON_COLOR = "white";
  const userBaseImage: string = "/image/guest.svg";
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

  const {
    register,
    handleSubmit,
    watch,
    errors,
    getValues,
  } = useForm<IEditUser>({
    defaultValues: { name: userInfo?.name },
    mode: "onChange",
  });

  const onSubmit = async (editData, event) => {
    event.preventDefault();
    const Imgfile = ImageUpload.file;
    if (!editData.name && !editData.password && !Imgfile) {
      setNoneEdit(true);
      setTimeout(() => setNoneEdit(false), 2000);
    } else {
      if (!editData.name && !editData.password && Imgfile) {
        dispatch({ type: CHANGE_IMAGE_REQUEST, data: Imgfile });
      } else if ((editData.name || editData.password) && !Imgfile) {
        dispatch({ type: EDIT_PROFILE_REQUEST, data: editData });
      } else if ((editData.name || editData.password) && Imgfile) {
        dispatch({ type: EDIT_PROFILE_REQUEST, data: editData });
        dispatch({ type: CHANGE_IMAGE_REQUEST, data: Imgfile });
      }

      setSuccessEdit(true);
      setTimeout(() => setSuccessEdit(false), 2000);
    }
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
    const deletePassword = getValues("password");
    const confirmPassword = getValues("repassword");
    if (!deletePassword || !confirmPassword) {
      setNonePassword(true);
      setTimeout(() => setNonePassword(false), 2000);
    } else {
      setVerifyDelete(false);
      dispatch({
        type: DELETE_USER_REQUEST,
        data: { password: deletePassword },
      });
    }
  };
  const onLogoutHandler = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };

  useEffect(() => {
    if (!logIn) {
      localStorage.removeItem("persist:root");
      document.cookie = 'connect.sid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push("/");
    }
    changeImage && setImage(userInfo?.profileIconURL);
  }, [logIn, userInfo?.profileIconURL]);

  return Edit ? (
    <div className={styles.edit__container}>
      <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.edit__cancel} onClick={onCancelHandler}>
          x
        </div>
        <h2 className={styles.edit__title}>Edit Profile</h2>
        <div className={styles.edit__content}>
          <div className={styles.edit__imgBox}>
            <img
              className={styles.edit__userImage}
              src={
                ImageUpload.previewURL
                  ? ImageUpload.previewURL
                  : Image
                  ? Image
                  : userBaseImage
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
            {NoneEdit && (
              <div className={styles.edit__notice_red}>
                변경된 사항이 없습니다.
              </div>
            )}
            {NonePassword && (
              <div className={styles.edit__notice_red}>
                비밀번호를 입력해 주세요.
              </div>
            )}
            {SuccessEdit && (
              <div className={styles.edit__notice_green}>
                수정 완료되었습니다.
              </div>
            )}

            {!VerifyDelete &&
              // !Delete &&
              !SuccessEdit &&
              !ImageEdit &&
              !NoneEdit &&
              !NonePassword &&
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
        <img className={styles.user__img} src={Image ? Image : userBaseImage} />
        <div className={styles.user__nickname}>
          <span>{userInfo?.name}</span>
          <FontAwesomeIcon
            icon={faEdit}
            size="xs"
            color={ICON_COLOR}
            onClick={onEditHandler}
            className={styles.user__editIcon}
          />
        </div>
        {userInfo?.email.length <= 21 ? (
          <span className={styles.user__email}>{userInfo?.email}</span>
        ) : (
          <div className={styles.user__email__wrap}>
            <span className={styles.user__email}>
              {userInfo?.email.split("@")[0]}
            </span>
            <span className={styles.user__email__down}>
              @{userInfo?.email.split("@")[1]}
            </span>
          </div>
        )}

        <button className={styles.user__logout} onClick={onLogoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
