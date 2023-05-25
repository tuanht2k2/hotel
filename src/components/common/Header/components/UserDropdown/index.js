import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

import style from './UserDropdown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function UserDropdown({ children }) {
  return (
    <HeadlessTippy
      interactive
      trigger="click"
      offset={[2, 10]}
      placement="bottom"
      render={() => (
        <div className={cx('sidebar__item__tippy--dropdown-wrapper')}>
          <Link to={'/profile'} className={cx('tippy--dropdown__item--link')}>
            <div className={cx('tippy--dropdown__item__icon--wrapper')}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>
              Thông tin cá nhân
            </div>
          </Link>
          <Link to={'/booked'} className={cx('tippy--dropdown__item--link')}>
            <div className={cx('tippy--dropdown__item__icon--wrapper')}>
              <FontAwesomeIcon icon={faBed} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>
              Phòng đã đặt
            </div>
          </Link>
          <Link to={'/settings'} className={cx('tippy--dropdown__item--link')}>
            <div className={cx('tippy--dropdown__item__icon--wrapper')}>
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>Cài đặt</div>
          </Link>
        </div>
      )}
    >
      {children}
    </HeadlessTippy>
  );
}

export default UserDropdown;
