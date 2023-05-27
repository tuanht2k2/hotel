import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { Button } from 'antd';

import { handleGetData, handlePushData, handleSetData } from '../../utils/database';
import images from '../../assets/images';
import style from './Room.module.scss';
import useRequireSignIn from '../../components/common/useRequireSignIn';
import Comments from '../../components/room/Comments';

const cx = classNames.bind(style);

function Room() {
  const roomId = useParams();
  const [user, setUser] = useState({});

  const [roomData, setRoomData] = useState({});

  const handleGetRoomData = (roomId) => {
    handleGetData(`rooms/${roomId}`)
      .then((snapshot) => snapshot.val() && setRoomData(snapshot.val()))
      .then((snapshot) => {
        console.log(snapshot);
      });
  };

  const { handleToggleTippy, requireSignInRender } = useRequireSignIn();

  useEffect(() => {
    // handleGetRoomData(roomId);

    return () => {};
  }, []);

  return (
    <div className={cx('room--wrapper--padding')}>
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

          {/* room detail */}
          <div className={cx('room__info__detail--wrapper')}>
            <div className={cx('room__info__detail__rating--wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__rating__label', 'label')}>Đánh giá:</div>
              <div className={cx('room__info__detail__rating__value', 'value')}>4.9</div>
              <img className={cx('room__info__detail__rating__icon')} src={images.starIcon} />
            </div>
            <div className={cx('room__info__detail__price--wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__price__label', 'label')}>Giá tiền:</div>
              <div className={cx('room__info__detail__price__value', 'value')}>1299000/đêm</div>
            </div>
            <div className={cx('room__info__detail__type--wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__type__label', 'label')}>Loại phòng:</div>
              <div className={cx('room__info__detail__type__value', 'value')}>Đơn</div>
            </div>
            <div className={cx('room__info__detail__classification--wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__classification__label', 'label')}>
                Hạng phòng:
              </div>
              <div className={cx('room__info__detail__classification__value', 'value')}>
                Cao cấp
              </div>
            </div>
            <div className={cx('room__info__detail__desc--wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__desc__label', 'label')}>Mô tả:</div>
              <div className={cx('room__info__detail__desc__values', 'value')}>
                <div className={cx('room__info__detail__desc__values__item')}>
                  Phòng Deluxe, 2 Giường Đôi, Nhìn Ra Hồ Nước
                </div>
                <div className={cx('room__info__detail__desc__values__item')}>
                  Miễn Phí hủy phòng
                </div>
                <div className={cx('room__info__detail__desc__values__item')}>
                  Không cần thanh toán trước
                </div>
              </div>
            </div>
            <div className={cx('booking__btn--wrapper')}>
              <Button
                type="primary"
                ghost
                danger
                onClick={() => {
                  Object.keys(user).length > 0 ? console.log('sign in') : handleToggleTippy();
                }}
              >
                Đặt phòng
              </Button>
            </div>
          </div>
        </div>

        {/* comments  */}
        <div className={cx('room__interaction--wrapper')}>
          <Comments roomId={123} handleToggleSignInTippy={handleToggleTippy} />
        </div>
      </div>

      {/* tippy render  */}
      {Object.keys(user).length === 0 && requireSignInRender}
    </div>
  );
}

export default Room;
