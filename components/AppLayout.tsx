import React, { FC, ReactElement } from "react";
import styles from "../styles/AppLayout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  faHome,
  faFolderOpen,
  faFileAlt,
  faHistory,
  faEnvelopeOpenText,
  faKey,
  faEdit,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import UserProfile from "../containers/UserProfile";

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {
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

  const router = useRouter();
  const ICON_COLOR: string = "white";
  const ICON_CLICK_COLOR: string = "#ffc000";
  const ICON_SIZE = "lg";

  interface ICategory {
    path: string;
    icon: IconDefinition;
    size: SizeProp;
    text: string;
  }

  const categories: ICategory[] = [
    {
      path: "/",
      icon: faHome,
      size: ICON_SIZE,
      text: "HOME",
    },
    {
      path: "/formgroup",
      icon: faFolderOpen,
      size: ICON_SIZE,
      text: "FORM GROUP",
    },
    {
      path: "/form",
      icon: faFileAlt,
      size: ICON_SIZE,
      text: "FORM",
    },
    {
      path: "/history",
      icon: faHistory,
      size: ICON_SIZE,
      text: "HISTORY",
    },
    {
      path: "/suggestion",
      icon: faEnvelopeOpenText,
      size: ICON_SIZE,
      text: "SUGGESTION",
    },
    {
      path: "/admin",
      icon: faKey,
      size: ICON_SIZE,
      text: "ADMIN",
    },
  ];

  const renderCategory = () =>
    categories.map((category, index) => {
      const iconColor =
        router.pathname === category.path ? ICON_CLICK_COLOR : ICON_COLOR;
      const textColor =
        router.pathname === category.path ? styles.yellow : styles.white;

      return (
        <Link href={category.path} key={index}>
          <a>
            <div className={styles.menubar__categories__category}>
              <FontAwesomeIcon
                icon={category.icon}
                size={category.size}
                color={iconColor}
              />
              <span className={textColor}>{category.text}</span>
            </div>
          </a>
        </Link>
      );
    });

  return (
    <div className={styles.container}>
      <div className={styles.menubar}>
        <div className={styles.menubar__logo}>
          <Link href="/home">
            <a>
              <img src="/image/logo_black.png" />
            </a>
          </Link>
        </div>
        <div className={styles.menubar__container}>
          <div className={styles.menubar__categories}>{renderCategory()}</div>

          {/* user profile */}
          {/* <div className={styles.menubar__user}>
            <img className={styles.menubar__user__img} src="/image/guest.svg" />
            <div className={styles.menubar__user__nickname}>
              <span>Yeongbba</span>
              <FontAwesomeIcon icon={faEdit} size="xs" color={ICON_COLOR} />
            </div>
            <span className={styles.menubar__user__email}>
              yeongmolee@gmail.com
            </span>
            <button className={styles.menubar__user__logout}>Logout</button>
          </div> */}

          <UserProfile />
        </div>
      </div>

      {children}
    </div>
  );
};

export default AppLayout;
