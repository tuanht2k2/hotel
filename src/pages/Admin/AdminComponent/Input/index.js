import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminInput.module.scss";

let cx = classNames.bind(styles);

const AdminInput = ({ type = "text", placeholder = "", icon }) => {
  return (
    <div className={cx("form-group")}>
      <label for="email">Full Name:</label>
      <div className="relative">
        <input
          className={cx("form-control")}
          type={type}
          maxlength="10"
          oninput="this.value=this.value.replace(/[^0-9]/g,'');"
          required=""
          placeholder={placeholder}
        ></input>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export default AdminInput;
