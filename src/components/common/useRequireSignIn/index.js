import { useState } from 'react';
import { Link } from 'react-router-dom';

import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';

import style from './useRequireSignIn.module.scss';

import images from '../../../assets/images';

const cx = classNames.bind(style);

function useRequireSignIn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleTippy = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    handleToggleTippy,
    requireSignInRender: (
      <HeadlessTippy
        visible={isVisible}
        interactive
        appendTo={document.body}
        offset={[-10, 0]}
        placement="bottom"
        render={() => (
          <div className={cx('full__screen__wrapper')}>
            <div className={cx('tippy__wrapper')}>
              <div
                className={cx('tippy__close')}
                onClick={() => {
                  handleToggleTippy();
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className={cx('tippy__header')}>
                <div className={cx('tippy__header__title')}>
                  Bạn phải đăng nhập để thực hiện tính năng này
                </div>
                <img className={cx('tippy__header__img')} src={images.logo} />
              </div>
              <Link to={'/sign-in'} className={cx('tippy__signin__signup__wrapper')}>
                <Button type="primary" danger>
                  Đăng nhập
                </Button>
              </Link>
              <div className={cx('tippy__separator__wrapper')}>
                <div className={cx('tippy__separator__line')}></div>
                <div className={cx('tippy__separator__text')}>hoặc</div>
                <div className={cx('tippy__separator__line')}></div>
              </div>
              <Link to={'/sign-up'} className={cx('tippy__signin__signup__wrapper')}>
                <Button type="primary" ghost>
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        )}
      ></HeadlessTippy>
    ),
  };
}

export default useRequireSignIn;
