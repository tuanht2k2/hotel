import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHotel } from '@fortawesome/free-solid-svg-icons';

import images from '../../../assets/images';
import style from './Header.module.scss';
import UserDropdown from './components/UserDropdown';

const cx = classNames.bind(style);

function Header() {
  const HEADER = [
    {
      title: 'Trang chủ',
      icon: <FontAwesomeIcon icon={faHome} />,
      to: '/home',
    },
    {
      title: 'Đặt phòng',
      icon: <FontAwesomeIcon icon={faHotel} />,
      to: '/bookings',
    },
    {
      title: '',
      icon: (
        <img src={images.defaultAvatar} className={cx('item__icon__img')} />
      ),
      to: '',
      tippyDropdown: UserDropdown,
    },
  ];

  return (
    <div className={cx('header__wrapper')}>
      <Link to={'/home'} className={cx('header__logo--wrapper')}>
        <img src={images.logo} className={cx('header__logo__img')} />
      </Link>
      {HEADER.map((item, index) => {
        const TippyDropdown = item.tippyDropdown || Fragment;
        return (
          <TippyDropdown key={`header__tippy--dropdown${index}`}>
            <Link
              key={`header-item-${index}`}
              className={cx('header__item')}
              to={item.to}
            >
              <div className={cx('item__icon--wrapper')}>{item.icon}</div>
              <div className={cx('item--title')}>{item.title}</div>
            </Link>
          </TippyDropdown>
        );
      })}
    </div>
  );
}

export default Header;
