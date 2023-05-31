import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './AdminHeader.module.scss';
import { RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBell } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown } from 'antd';
import { useLocation } from 'react-router-dom';

let cx = classNames.bind(styles);
const items = [
  {
    key: '1',
    label: <Link to={'/'}>Return UserPage</Link>,
  },
  {
    key: '2',
    label: <Link to={'/settings'}>Settings</Link>,
  },
  {
    key: '3',
    label: <Link>Log out</Link>,
  },
];

const AdminHeader = () => {
  const navigateQuery = useLocation();
  const [navTitle, setNavTitle] = useState('');
  useEffect(() => {
    if (navigateQuery.pathname.includes('all-rooms')) {
      setNavTitle('All Rooms');
    } else if (navigateQuery.pathname.includes('add-rooms')) {
      setNavTitle('Add New Room');
    }
  }, [navigateQuery]);

  return (
    <Row>
      <Col span={24}>
        <div className={cx('adminPage-header')}>
          <div className={cx('adminPage-header-left')}>
            <Link to={'/'}>
              <a href="https://logowik.com/airbnb-vector-logo-2705.html">
                <img
                  className={cx('svg1')}
                  src="https://logowik.com/content/uploads/images/123_airbnb.jpg"
                  alt="no_image"
                />
              </a>
            </Link>
            <Link to={'/'}>
              <h1>Trang chủ</h1>
            </Link>
            <RightOutlined className={cx('right__icon')} />
            <h2>Admin</h2>
            {navTitle && (
              <>
                <RightOutlined className={cx('right__icon')} />
                <h2>{navTitle}</h2>
              </>
            )}
          </div>

          <div className={cx('adminPage-header-right')}>
            <div className={cx('adminPage__notification')}>
              <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            </div>
            <Dropdown
              menu={{
                items,
              }}
              placement="top"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Button
                className={cx('admin__header--btn')}
                style={{ height: '100%', border: 'none' }}
              >
                <div className={cx('header-right-profile')}>
                  <img
                    src={
                      'https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg'
                    }
                    alt=""
                  />
                  <p className={cx('admin__header--info')}>
                    <span>Le Manh </span>
                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                  </p>
                </div>
              </Button>
            </Dropdown>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdminHeader;
