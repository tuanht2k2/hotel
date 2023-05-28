import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { get, limitToLast, query } from 'firebase/database';
import { handleGetDataRef } from '../../../utils/database';

import images from '../../../assets/images';
import style from './HomeRoomList.module.scss';

const cx = classNames.bind(style);

function HomeRoomList() {
  const [roomList, setRoomList] = useState({});

  const handleGetRoomList = async () => {
    const roomListPath = `admin/create-room/rooms`;

    const roomListRef = handleGetDataRef(roomListPath);
    const recentRoomsQuery = query(roomListRef, limitToLast(4));

    const roomList = await get(recentRoomsQuery).then((snapshot) => snapshot.val() || {});
    setRoomList(roomList);
  };
  useEffect(() => {
    handleGetRoomList();

    return () => {};
  }, []);

  return (
    <div className={cx('grid')}>
      <div className={cx('row')}>
        {/* Map data */}
        {Object.keys(roomList).map((roomKey) => {
          const roomData = roomList[roomKey];

          return (
            <div key={`home__room__list__item__${roomKey}`} className={cx('col c-12 m-6 l-3')}>
              <Link to={`/rooms/${roomKey}`} className={cx('room__list__item__wrapper')}>
                <img
                  className={cx('room__list__item__img')}
                  alt="Đã xảy ra lỗi"
                  src={roomData.roomImage[0]?.imageUrl}
                />
                <div className={cx('room__list__item__overlay__wrapper')}>
                  <div className={cx('room__list__item__overlay')}>
                    <div className={cx('room__list__item__overlay__room--classification')}>
                      {roomData.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng thường'}
                    </div>
                    <div className={cx('room__list__item__overlay--bottom')}>
                      <div className={cx('room__list__item__overlay--bottom__room--price')}>
                        <div
                          className={cx('room__list__item__overlay--bottom__room--price__label')}
                        >
                          Giá tiền:
                        </div>
                        <div
                          className={cx('room__list__item__overlay--bottom__room--price__value')}
                        >
                          {`${roomData.roomPrice} VNĐ/đêm`}
                        </div>
                      </div>
                      <div className={cx('room__list__item__overlay--bottom__room--rate')}>
                        <div className={cx('room__list__item__overlay--bottom__room--rate__label')}>
                          Đánh giá:
                        </div>
                        <div className={cx('room__list__item__overlay--bottom__room--rate__value')}>
                          4.2
                        </div>
                        <img
                          className={cx('room__list__item__overlay--bottom__room--rate__icon')}
                          src={images.starIcon}
                        />
                      </div>
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

export default HomeRoomList;
