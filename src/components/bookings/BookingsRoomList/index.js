import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { handleGetData } from '../../../utils/database';
import images from '../../../assets/images';

import style from './BookingsRoomList.module.scss';

const cx = classNames.bind(style);

function BookingsRoomList() {
  const [roomList, setRoomList] = useState({});

  const handleGetRoomsData = async () => {
    const roomsPath = `admin/create-room/rooms`;
    const roomList = await handleGetData(roomsPath).then((snapshot) => snapshot.val() || {});
    setRoomList(roomList);
  };

  useEffect(() => {
    handleGetRoomsData();

    return () => {};
  }, []);

  return (
    <div className={cx('bookings__room__list', 'grid')}>
      <div className={cx('row')}>
        {Object.keys(roomList).map((roomKey) => {
          const roomData = roomList[roomKey];

          return (
            <div key={`bookings__room__list__item${roomKey}`} className={cx('col c-6 m-4 l-3')}>
              <Link to={`/rooms/${roomKey}`} className={cx('room__list__item__wrapper')}>
                <div className={cx('item__img__wrapper')}>
                  <img
                    className={cx('item__img__tag')}
                    alt="Đã xảy ra lỗi"
                    src={roomData.roomImage[0]?.imageUrl}
                  />
                  <div className={cx('item__img__overlay__wrapper')}>
                    <div className={cx('item__img__overlay')}></div>
                  </div>
                  {roomData.roomRank === 'superior' && (
                    <img
                      className={cx('item__img__classification--img')}
                      src={images.premiumIcon}
                    />
                  )}
                </div>
                <div className={cx('item__detail__wrapper')}>
                  <div className={cx('item__detail__name')}>
                    <div className={cx('item__detail__name--label', 'label')}>Tên phòng:</div>
                    <div className={cx('item__detail__name--value', 'value')}>
                      {roomData.roomName}
                    </div>
                  </div>
                  <div className={cx('item__detail__desc')}>
                    <div className={cx('item__detail__desc__type')}>
                      {roomData.roomType === 'single' ? 'Phòng đôi' : 'Phòng đơn'}
                    </div>
                    <div className={cx('item__detail__desc__classification')}>
                      {roomData.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng thường'}
                    </div>
                  </div>
                  <div className={cx('item__detail__price')}>
                    <div className={cx('item__detail__price__label', 'label')}>Giá :</div>
                    <div className={cx('item__detail__price__value', 'value')}>
                      {`${roomData.roomPrice} VNĐ/đêm`}
                    </div>
                  </div>
                  <div className={cx('separator')}></div>
                  <div className={cx('item__detail__rate')}>
                    <div className={cx('item__detail__rate--avg')}>
                      <div className={cx('item__detail__rate--avg__title', 'value')}>4.2</div>
                      <img className={cx('item__detail__rate--avg__img')} src={images.starIcon} />
                    </div>

                    <div className={cx('item__detail__rate--quantity', 'value')}>
                      102 lượt đánh giá
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingsRoomList;
