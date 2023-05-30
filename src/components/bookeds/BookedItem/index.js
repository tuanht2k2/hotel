import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { Grid, Skeleton, Stack } from '@mui/material';

import { handleGetData } from '../../../utils/database';
import { handleGetFormatTime } from '../../../utils/time';

import style from './BookedItem.module.scss';

const cx = classNames.bind(style);

function BookedItem({ bookedId }) {
  const [bookedData, setBookedData] = useState(null);

  const handleGetBookedData = async (bookedId) => {
    const bookedData = await handleGetData(`orders/${bookedId}`).then((snapshot) => snapshot.val());

    bookedData && setBookedData(bookedData);
  };

  useEffect(() => {
    handleGetBookedData(bookedId);
  }, []);

  return (
    <div className={cx('booked__item__main__wrapper')}>
      {bookedData ? (
        <div className={cx('booked__item__wrapper')}>
          <div className={cx('booked__item__img__wrapper')}>
            <img
              className={cx('booked__item__img')}
              alt="Đã xảy ra lỗi"
              src={bookedData.room?.roomImage[0]?.imageUrl}
            />
          </div>

          <div className={cx('booked__item__details')}>
            <div className={cx('booked__item__details__item')}>
              Mã đơn:
              <div className={cx('booked__item__details__item__value')}>{bookedId}</div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Tên phòng:
              <div className={cx('booked__item__details__item__value')}>
                {bookedData.room?.roomName}
              </div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Hạng phòng:
              <div className={cx('booked__item__details__item__value')}>
                {bookedData.room?.roomRank === 'superior' ? 'Phòng cao cấp' : 'Phòng bình dân'}
              </div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Loại phòng:
              <div className={cx('booked__item__details__item__value')}>
                {bookedData.room?.roomType === 'double' ? 'Phòng đôi' : 'Phòng đơn'}
              </div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Check in:
              <div className={cx('booked__item__details__item__value')}>
                {handleGetFormatTime(bookedData.orderTime?.from)}
              </div>
              - Check out:
              <div className={cx('booked__item__details__item__value')}>
                {handleGetFormatTime(bookedData.orderTime?.to)}
              </div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Giá tiền:
              <div className={cx('booked__item__details__item__value')}>{bookedData.price} VNĐ</div>
            </div>
            <div className={cx('booked__item__details__item')}>
              Trạng thái:
              <div
                className={cx(
                  'booked__item__details__item__value',
                  bookedData.status === 'done' ? 'success' : 'isDeleted'
                )}
              >
                {bookedData.status === 'done' ? 'Thành công' : 'Đã hủy/ bị xóa'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Skeleton variant="rectangular" height={320}></Skeleton>
          </Grid>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <Skeleton variant="rectangular" height={68}></Skeleton>
              <Skeleton variant="rectangular" height={68}></Skeleton>
              <Skeleton variant="rectangular" height={68}></Skeleton>
              <Skeleton variant="rectangular" height={68}></Skeleton>
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default BookedItem;
