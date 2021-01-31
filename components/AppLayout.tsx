import React, { FC, ReactElement } from "react";
import styles from "../styles/Home/AppLayout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  faHome,
  faFolderOpen,
  faFileAlt,
  faHistory,
  faEnvelopeOpenText,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import UserProfile from "../containers/UserProfile";

interface Props {
  children: ReactElement;
}

interface ICategory {
  path: string;
  icon: IconDefinition;
  size: SizeProp;
  text: string;
}

const AppLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const ICON_COLOR: string = "white";
  const ICON_CLICK_COLOR: string = "#ffc000";
  const ICON_SIZE = "lg";

  const categories: ICategory[] = [
    {
      path: "/home",
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
    // {
    //   path: "/admin",
    //   icon: faKey,
    //   size: ICON_SIZE,
    //   text: "ADMIN",
    // },
  ];

  const renderCategory = () =>
    categories.map((category, index) => {
      const iconColor =
        router.pathname === category.path ||
        (router.pathname.match(/formgroup/i) &&
          category.path.match(/formgroup/i))
          ? ICON_CLICK_COLOR
          : ICON_COLOR;
      const textColor =
        router.pathname === category.path ||
        (router.pathname.match(/formgroup/i) &&
          category.path.match(/formgroup/i))
          ? styles.yellow
          : styles.white;

      if (router.pathname !== category.path) {
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
      } else {
        return (
          <div className={styles.menubar__categories__category} key={index}>
            <FontAwesomeIcon
              icon={category.icon}
              size={category.size}
              color={iconColor}
            />
            <span className={textColor}>{category.text}</span>
          </div>
        );
      }
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

          <UserProfile />
        </div>
      </div>

      {children}
    </div>
  );
};

export default AppLayout;
