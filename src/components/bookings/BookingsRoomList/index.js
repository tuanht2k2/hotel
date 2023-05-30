import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { handleGetData } from '../../../utils/database';
import images from '../../../assets/images';

import style from './BookingsRoomList.module.scss';

const cx = classNames.bind(style);

function BookingsRoomList({ roomList }) {
  return roomList ? (
    <div className={cx('bookings__room__list', 'grid')}>
      <div className={cx('row')}>
        {Object.keys(roomList).map((roomKey) => {
          const roomData = roomList[roomKey];
          return (
            <div key={`bookings__room__list__item${roomKey}`} className={cx('col c-12 m-4 l-3')}>
              <Link to={`/rooms/${roomKey}`} className={cx('room__list__item__wrapper')}>
                <div className={cx('item__img__wrapper')}>
                  <img
                    className={cx('item__img__tag')}
                    alt="Đã xảy ra lỗi"
                    src={roomData?.roomImage[0]?.imageUrl}
                  />
                  <div className={cx('item__img__overlay__wrapper')}>
                    <div className={cx('item__img__overlay')}></div>
                  </div>
                  {roomData?.roomRank === 'superior' && (
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
                      {roomData?.roomName}
                    </div>
                  </div>
                  <div className={cx('item__detail__desc')}>
                    <div className={cx('item__detail__desc__type')}>
                      {roomData?.roomType === 'single' ? 'Phòng đơn' : 'Phòng đôi'}
                    </div>
                    <div className={cx('item__detail__desc__classification')}>
                      {roomData?.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng bình dân'}
                    </div>
                  </div>
                  <div className={cx('item__detail__price')}>
                    <div className={cx('item__detail__price__label', 'label')}>Giá :</div>
                    <div className={cx('item__detail__price__value', 'value')}>
                      {`${roomData?.roomPrice} VNĐ/đêm`}
                    </div>
                  </div>
                  <div className={cx('separator')}></div>
                  <div className={cx('item__detail__rate')}>
                    {/* {roomData.roomRatings ? (
                      Object.keys(roomData.roomRatings).length > 0 ? (
                        <div className={cx('item__detail__rate--avg')}>
                          <div className={cx('item__detail__rate--avg__title', 'value')}>
                            {handleGetAvgStar(roomData.roomRatings)}
                          </div>
                          <img
                            className={cx('item__detail__rate--avg__img')}
                            src={images.starIcon}
                          />
                        </div>
                      ) : null
                    ) : null} */}

                    <div className={cx('item__detail__rate--quantity', 'value')}>
                      {roomData?.roomRatings
                        ? `${Object.keys(roomData?.roomRatings).length} lượt đánh giá`
                        : 'Chưa có đánh giá'}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}

export default BookingsRoomList;
