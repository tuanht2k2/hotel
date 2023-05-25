import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import {
  handleGetData,
  handlePushData,
  handleSetData,
} from '../../utils/database';

import style from './Room.module.scss';

const cx = classNames.bind(style);

function Room() {
  const roomId = useParams();

  const [roomData, setRoomData] = useState({});

  const handleGetRoomData = (roomId) => {
    handleGetData(`rooms/${roomId}`)
      .then((snapshot) => snapshot.val() && setRoomData(snapshot.val()))
      .then((snapshot) => {
        console.log(snapshot);
      });
  };

  useEffect(() => {
    // handleGetRoomData(roomId);

    return () => {};
  }, []);

  return (
    <div className={cx('room--wrapper')}>
      <div className={cx('room__header--wrapper')}>
        <h1 className={cx('room__header__hotel--name')}>Khách sạn MTKHM</h1>
        <div className={cx('room__header__room--name')}>
          <div className={cx('room__header__room--name__label')}>Phòng:</div>
          <div className={cx('room__header__room--name__title')}>911</div>
        </div>
      </div>
      <div className={cx('room__info--wrapper')}>
        <Link to={`/images/123`} className={cx('room__info__img--wrapper')}>
          <img
            className={cx('room__info__img--tag')}
            src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
          />
        </Link>
        <div className={cx('room__info__detail--wrapper')}></div>
      </div>
      <div className={cx('room__interaction--wrapper')}></div>
    </div>
  );
}

export default Room;
