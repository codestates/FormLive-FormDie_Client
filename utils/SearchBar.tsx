import React, { useState } from "react";
import styles from "../styles/utils/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  FORM_LIST_REQUEST,
  FORM_GROUP_REQUEST,
  HISTORY_LIST_REQUEST,
} from "../reducers/form";

const SearchBar = ({ where, setQuery }) => {
  const dispatch = useDispatch();
  const [Value, setValue] = useState("");

  const searchClickHandler = () => {
    const params = {
      page: 1,
      q: Value,
    };

    if (where === "form") {
      dispatch({
        type: FORM_LIST_REQUEST,
        data: params,
      });
    } else if (where === "formGroup") {
      dispatch({
        type: FORM_GROUP_REQUEST,
        data: params,
      });
    } else if (where === "history") {
      dispatch({
        type: HISTORY_LIST_REQUEST,
        data: params,
      });
    }

    setQuery(Value);
    setValue("");
  };

  const searchPressHandler = (event) => {
    if (event.key === "Enter") {
      const params = {
        page: 1,
        q: Value,
      };

      if (where === "form") {
        dispatch({
          type: FORM_LIST_REQUEST,
          data: params,
        });
      } else if (where === "formGroup") {
        dispatch({
          type: FORM_GROUP_REQUEST,
          data: params,
        });
      } else if (where === "history") {
        dispatch({
          type: HISTORY_LIST_REQUEST,
          data: params,
        });
      }

      setQuery(Value);
      setValue("");
    }
  };
  // * 검색 시 엔터 버튼으로 검색을 눌렀을 때는 onKeyPress를 사용했고
  // * 검색 버튼 클릭 시 onClick을 사용하여 사용자가 편하게 검색하도록 기능구현했습니다. 
  return (
    <section className={styles.section1__searchBar}>
      <input
        value={Value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onKeyPress={searchPressHandler}
      />
      <div>
        <FontAwesomeIcon
          icon={faSearch}
          size={"lg"}
          color={"#ffffff"}
          onClick={searchClickHandler}
        />
      </div>
    </section>
  );
};

export default SearchBar;
