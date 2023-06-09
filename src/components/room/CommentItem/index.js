import classNames from 'classnames/bind';

import style from './CommentItem.module.scss';
import images from '../../../assets/images';
import useRating from '../../common/useRating';
import { useEffect, useState } from 'react';
import { handleGetData } from '../../../utils/database';
import { handleGetFormatTime } from '../../../utils/time';

const cx = classNames.bind(style);

function CommentItem({ ratingData }) {
  const [user, setUser] = useState(null);

  const useRatingRender = useRating(ratingData ? ratingData.data?.star : null).useRatingRender;

  const handleGetUserData = async (uid) => {
    const userPath = `users/${uid}`;
    const snapshot = await handleGetData(userPath);
    const user = snapshot.val();
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    handleGetUserData(ratingData?.uid);

    return () => {};
  }, []);

  return (
    <div className={cx('comment__wrapper')}>
      <img className={cx('comment__user__img')} src={user?.photoURL || images.defaultAvatar} />
      <div className={cx('comment__user--main')}>
        <div className={cx('comment__user--main__user__name')}>{user?.fullName}</div>
        <div className={cx('comment__user--main__rating')}>{useRatingRender}</div>
        <div className={cx('comment__user--main__text')}>{ratingData?.data?.text}</div>
        <div className={cx('comment__user--main__time')}>
          {handleGetFormatTime(ratingData?.data?.timeCreated)}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
