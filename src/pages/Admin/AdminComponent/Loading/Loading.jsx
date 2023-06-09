import styles from "./Loading.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function Loading({ heightBlock = "310px", borderRadius }) {
  return (
    <div
      className={cx("loader__wrapper")}
      style={{ height: heightBlock, borderRadius: borderRadius }}
    >
      <div className={cx("loader-inner")}>
        <div className={cx("loader-line-wrap")}>
          <div className={cx("loader-line")}></div>
        </div>
        <div className={cx("loader-line-wrap")}>
          <div className={cx("loader-line")}></div>
        </div>
        <div className={cx("loader-line-wrap")}>
          <div className={cx("loader-line")}></div>
        </div>
        <div className={cx("loader-line-wrap")}>
          <div className={cx("loader-line")}></div>
        </div>
        <div className={cx("loader-line-wrap")}>
          <div className={cx("loader-line")}></div>
        </div>
      </div>
    </div>
  );
}
