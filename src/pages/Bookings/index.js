// react import
import { useState } from 'react';

import classNames from 'classnames/bind';

// ant design import
import { Button, Menu } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faRankingStar, faUsers } from '@fortawesome/free-solid-svg-icons';

import BookingsRoomList from '../../components/bookings/BookingsRoomList';
import style from './Bookings.module.scss';

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem('Hạng phòng', 'sub1', <FontAwesomeIcon icon={faRankingStar} />, [
    getItem('Phòng bình dân', '1'),
    getItem('Phòng cao cấp', '2'),
  ]),
  getItem('Loại phòng', 'sub2', <FontAwesomeIcon icon={faUsers} />, [
    getItem('Phòng đơn', '3'),
    getItem('Phòng đôi', '4'),
  ]),
  getItem('Giá tiền ( Theo ngày)', 'sub3', <FontAwesomeIcon icon={faMoneyBill} />, [
    getItem('8.000.000 VND - 10.000.000', '5'),
    getItem('6.000.000 VND - 8.000.000', '6'),
    getItem('4.000.000 VND - 6.000.000', '7'),
    getItem('2.000.000 VND - 4.000.000', '8'),
    getItem('Dưới 2.000.000 VND', '9'),
  ]),
];

const cx = classNames.bind(style);

function Bookings() {
  return (
    <div className={cx('bookings__wrapper')}>
      <div className={cx('bookings__selector__wrapper')}>
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark" items={items} />
      </div>
      <BookingsRoomList />
    </div>
  );
}

export default Bookings;
