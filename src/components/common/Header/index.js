import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHotel } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

import images from '../../../assets/images';
import style from './Header.module.scss';
import UserDropdown from './components/UserDropdown';

const cx = classNames.bind(style);

function Header() {
  const [user, setUser] = useState({});

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
      icon: '',
      tag:
        Object.keys(user).length > 0 ? (
          <img src={images.defaultAvatar} className={cx('item__icon__img')} />
        ) : (
          <Link to={'/sign-in'}>
            <Button type="primary">Đăng nhập</Button>
          </Link>
        ),
      to: '',
      tippyDropdown: Object.keys(user).length > 0 ? UserDropdown : null,
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
            <Link key={`header-item-${index}`} className={cx('header__item')} to={item.to}>
              {item.icon && <div className={cx('item__icon--wrapper')}>{item.icon}</div>}
              {item.tag && item.tag}
              <div className={cx('item--title')}>{item.title}</div>
            </Link>
          </TippyDropdown>
        );
      })}
    </div>
  );
}

export default Header;
