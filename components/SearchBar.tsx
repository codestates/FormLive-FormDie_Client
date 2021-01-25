import React, { useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { FORM_LIST_REQUEST } from "../reducers/form";

export default function SearchBar({ setQuery }) {
  const dispatch = useDispatch();
  const [Value, setValue] = useState("");

  const searchClickHandler = () => {
    const params = {
      page: 1,
      query: Value,
    };

    dispatch({
      type: FORM_LIST_REQUEST,
      data: params,
    });

    setQuery(Value);
    setValue("");
  };

  const searchPressHandler = (event) => {
    if (event.key === "Enter") {
      const params = {
        page: 1,
        query: Value,
      };

      dispatch({
        type: FORM_LIST_REQUEST,
        data: params,
      });

      setQuery(Value);
      setValue("");
    }
  };

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
}
