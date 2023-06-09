import { Link, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHotel } from '@fortawesome/free-solid-svg-icons';
import { Skeleton, Stack } from '@mui/material';
import { Button } from 'antd';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

import images from '../../../assets/images';
import style from './Header.module.scss';
import UserDropdown from './components/UserDropdown';

const cx = classNames.bind(style);

function Header() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const split = location.pathname.split('/');
  const path = '/' + split[split.length - 1];

  const HEADER = [
    {
      title: 'Trang chủ',
      icon: <FontAwesomeIcon icon={faHome} />,
      to: '/',
    },
    {
      title: 'Đặt phòng',
      icon: <FontAwesomeIcon icon={faHotel} />,
      to: '/bookings',
    },
    {
      title: '',
      icon: '',
      tag: user ? (
        <img src={images.defaultAvatar} className={cx('item__icon__img')} />
      ) : (
        <Button type="primary" danger>
          Đăng nhập
        </Button>
      ),
      to: user ? '' : '/sign-in',
      tippyDropdown: user ? UserDropdown : null,
    },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        setIsLoaded(true);
      } else {
        setIsLoaded(true);
      }
    });
  }, []);

  return isLoaded ? (
    <div className={cx('header__wrapper')}>
      <Link to={'/'} className={cx('header__logo__wrapper')}>
        <img src={images.logo} className={cx('header__logo__img')} />
      </Link>
      {HEADER.map((item, index) => {
        const TippyDropdown = item.tippyDropdown || Fragment;
        return (
          <TippyDropdown key={`header__tippy--dropdown${index}`}>
            <Link
              key={`header-item-${index}`}
              className={cx('header__item', item.to === path ? 'active' : '')}
              to={item.to}
            >
              {item.icon && <div className={cx('item__icon__wrapper')}>{item.icon}</div>}
              {item.tag && item.tag}
              <div className={cx('item__title')}>{item.title}</div>
            </Link>
          </TippyDropdown>
        );
      })}
    </div>
  ) : (
    <div className={cx('header__skeleton__wrapper')}>
      <Stack spacing={0}>
        <Skeleton variant="text" height={80}></Skeleton>
      </Stack>
    </div>
  );
}

export default Header;
