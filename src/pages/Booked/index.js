import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { onValue } from 'firebase/database';
import { handleGetData, handleGetDataRef } from '../../utils/database';

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

    setBookedList(bookedList);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const orderRef = handleGetDataRef(`users/${user.uid}/orders`);
        onValue(orderRef, () => {
          handleGetBookedList(user.uid);
        });
      }
    });
  }, []);

  return (
    <div className={cx('booked__wrapper')}>
      <h3>
        {bookedList ? (
          'Danh sách phòng đã đặt'
        ) : (
          <Link to={'/bookings'}>Bạn chưa có đơn đặt phòng, nhấp vào đây để đặt phòng ngay</Link>
        )}
      </h3>
      {bookedList &&
        Object.keys(bookedList).map((bookedKey) => (
          <BookedItem key={`booked__booked__item__${bookedKey}`} bookedId={bookedKey} />
        ))}
    </div>
  );
}

export default Booked;
