import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { auth } from '../../../../../firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faGear,
  faPeopleRoof,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { signOutAction } from '../../../../../actions/user';

import style from './UserDropdown.module.scss';

const cx = classNames.bind(style);

function UserDropdown({ children }) {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      const signOut = signOutAction();
      dispatch(signOut);

      navigate('/sign-in');
    });
  };

  return (
    <HeadlessTippy
      interactive
      trigger="click"
      offset={[0, 10]}
      placement="bottom"
      render={() => (
        <div className={cx('sidebar__item__tippy--dropdown-wrapper')}>
          <Link to={''} className={cx('tippy--dropdown__item__wrapper')}>
            <div className={cx('tippy--dropdown__item__icon__wrapper')}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>Thông tin cá nhân</div>
          </Link>
          {user.role === 'admin' && (
            <Link to={'/admin/all-rooms'} className={cx('tippy--dropdown__item__wrapper')}>
              <div className={cx('tippy--dropdown__item__icon__wrapper')}>
                <FontAwesomeIcon icon={faPeopleRoof} />
              </div>
              <div className={cx('tippy--dropdown__item__title')}>Chuyển tới trang quản lý</div>
            </Link>
          )}
          <Link to={'/booked'} className={cx('tippy--dropdown__item__wrapper')}>
            <div className={cx('tippy--dropdown__item__icon__wrapper')}>
              <FontAwesomeIcon icon={faBed} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>Phòng đã đặt</div>
          </Link>
          <Link to={''} className={cx('tippy--dropdown__item__wrapper')}>
            <div className={cx('tippy--dropdown__item__icon__wrapper')}>
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>Cài đặt</div>
          </Link>
          <div
            className={cx('tippy--dropdown__item__wrapper')}
            onClick={() => {
              handleSignOut();
            }}
          >
            <div className={cx('tippy--dropdown__item__icon__wrapper')}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
            <div className={cx('tippy--dropdown__item__title')}>Đăng xuất</div>
          </div>
        </div>
      )}
    >
      {children}
    </HeadlessTippy>
  );
}

export default UserDropdown;
