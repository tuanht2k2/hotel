import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { handleGetData } from '../../utils/database';

import classNames from 'classnames/bind';
import { Button } from 'antd';

import useRequireSignIn from '../../components/common/useRequireSignIn';
import Comments from '../../components/room/Comments';
import RoomImagesCarousel from '../../components/room/RoomImagesCarousel';

import images from '../../assets/images';
import style from './Room.module.scss';
import useBooking from '../../components/room/useBooking';
import { Grid, Skeleton, Stack } from '@mui/material';

const cx = classNames.bind(style);

function Room() {
  const { roomId } = useParams();

  const [roomData, setRoomData] = useState({});
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratings, setRatings] = useState(null);

  const { handleToggleTippy, requireSignInRender } = useRequireSignIn();
  const { handleToggleBookingTippy, bookingTippyRender } = useBooking(roomId, roomData);

  const handleGetRoomData = async () => {
    const roomPath = `admin/create-room/rooms/${roomId}`;

    const roomData = await handleGetData(roomPath).then((snapshot) => snapshot.val() || {});
    setRoomData(roomData);

    // get the rating list data of this room
    if (roomData.roomRatings) {
      const promises = Object.keys(roomData.roomRatings).map((ratingKey) =>
        handleGetData(`ratings/${ratingKey}`).then((snapshot) => snapshot.val())
      );

      Promise.all(promises).then((res) => {
        res && setRatings(res);
      });
    }
  };

  const handleGetAvgStar = (ratings) => {
    if (!ratings) return;

    let initialAvg = 0;
    const result = Object.keys(ratings).reduce(
      (acc, rating) => acc + ratings[rating].data.star,
      initialAvg
    );

    const avg = Math.round((result / Object.keys(ratings).length) * 10) / 10;
    return avg;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      }
    });

    handleGetRoomData().then(() => {
      setIsLoaded(true);
    });

    return () => {};
  }, []);

  return isLoaded ? (
    <div className={cx('room__wrapper--padding')}>
      <div className={cx('room__wrapper')}>
        <div className={cx('room__header__wrapper')}>
          <h1 className={cx('room__header__hotel--name')}>Khách sạn MKTHM</h1>
          <div className={cx('room__header__room--name')}>
            <div className={cx('room__header__room--name__label')}>Phòng:</div>
            <div className={cx('room__header__room--name__title')}>{roomData.roomName}</div>
          </div>
        </div>
        <div className={cx('room__info__wrapper')}>
          {/* room images */}
          <div className={cx('room__info__carousel__wrapper')}>
            <RoomImagesCarousel roomId={roomId} roomImages={roomData.roomImage} />
          </div>

          {/* room detail */}
          <div className={cx('room__info__detail__wrapper')}>
            <div className={cx('room__info__detail__rating__wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__rating__label', 'label')}>Đánh giá:</div>
              <div className={cx('room__info__detail__rating__value', 'value--orange')}>
                {ratings ? handleGetAvgStar(ratings) : null}
              </div>
              <img className={cx('room__info__detail__rating__icon')} src={images.starIcon} />
            </div>
            <div className={cx('room__info__detail__price__wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__price__label', 'label')}>Giá tiền:</div>
              <div className={cx('room__info__detail__price__value', 'value--orange')}>
                {`${roomData.roomPrice} VNĐ/đêm`}
              </div>
            </div>
            <div className={cx('room__info__detail__type__wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__type__label', 'label')}>Loại phòng:</div>
              <div className={cx('room__info__detail__type__value', 'value--orange')}>
                {roomData.roomType === 'single' ? 'Phòng đôi' : 'Phòng đơn'}
              </div>
            </div>
            <div className={cx('room__info__detail__classification__wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__classification__label', 'label')}>
                Hạng phòng:
              </div>
              <div className={cx('room__info__detail__classification__value', 'value--orange')}>
                {roomData.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng thường'}
              </div>
            </div>
            <div className={cx('room__info__detail__desc__wrapper', 'detail-item')}>
              <div className={cx('room__info__detail__desc__label', 'label')}>
                Mô tả:
                <div className={cx('room__info__detail__desc__value')}>{roomData.roomDesc}</div>
              </div>
            </div>
          </div>

          {/* bookings */}
          <div className={cx('booking__btn__wrapper')}>
            <Button
              type="primary"
              ghost
              danger
              onClick={() => {
                user ? handleToggleBookingTippy() : handleToggleTippy();
              }}
            >
              Đặt phòng
            </Button>
          </div>
        </div>

        {/* comments  */}
        <div className={cx('room__interaction__wrapper')}>
          <Comments roomId={roomId} roomData={roomData} />
        </div>
      </div>

      {/* tippy render  */}
      {!user ? requireSignInRender : bookingTippyRender}
    </div>
  ) : (
    <Stack padding={[1, 4, 1, 4]}>
      <Skeleton variant="text" height={80}></Skeleton>
      <Skeleton variant="text" height={80}></Skeleton>
      <Skeleton variant="rectangular" height={300}></Skeleton>
      <Skeleton variant="text" height={80}></Skeleton>
      <Skeleton variant="text" height={80}></Skeleton>
      {/* <Skeleton variant="rectangular" width={40} height={80}></Skeleton> */}
      <Grid spacing={2} container>
        <Grid item xs={1}>
          <Skeleton variant="circular" width={80} height={80}></Skeleton>
        </Grid>
        <Grid item xs={11}>
          <Skeleton variant="text" height={80}></Skeleton>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Room;
