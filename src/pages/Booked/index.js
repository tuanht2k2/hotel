import { Fragment, useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { Grid, Skeleton, Stack } from '@mui/material';

import { handleGetData } from '../../utils/database';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

import style from './Booked.module.scss';
import BookedItem from '../../components/bookeds/BookedItem';

const cx = classNames.bind(style);

function Booked() {
  const [bookedList, setBookedList] = useState(null);
  const [uid, setUid] = useState(null);

  const handleGetBookedList = async (uid) => {
    const bookedPath = `users/${uid}/orders`;
    const bookedList = await handleGetData(bookedPath).then((snapshot) => snapshot.val());

    bookedList && setBookedList(bookedList);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleGetBookedList(user.uid);
      }
    });
  }, []);

  return (
    <div className={cx('booked__wrapper')}>
      <h3>{bookedList ? 'Danh sách phòng đã đặt' : 'Bạn chưa đặt phòng nào'}</h3>
      {bookedList &&
        Object.keys(bookedList).map((bookedKey) => (
          <BookedItem key={`booked__booked__item__${bookedKey}`} bookedId={bookedKey} />
        ))}
    </div>
  );
}

export default Booked;
