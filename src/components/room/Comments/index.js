import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { Button } from 'antd';
import { Grid, Skeleton, Stack } from '@mui/material';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { handleGetData, handleGetDataRef } from '../../../utils/database';

import images from '../../../assets/images';

import CommentItem from '../CommentItem';

import style from './Comments.module.scss';
import CreateComment from '../CreateComment';
import { onValue } from 'firebase/database';

const cx = classNames.bind(style);

function Comments({ roomId, roomData }) {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratings, setRatings] = useState(null);

  const handleGetUser = async (uid) => {
    const userPath = `users/${uid}`;
    const user = await handleGetData(userPath).then((snapshot) => snapshot.val());
    if (user) {
      setUser(user);
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
        handleGetUser(user.uid).then(() => {
          setIsLoaded(true);
        });
      } else {
        setIsLoaded(true);
      }
    });
  }, []);

  const handleGetRatings = async (roomId) => {
    const ratingsPath = `admin/create-room/rooms/${roomId}/roomRatings`;
    const ratings = await handleGetData(ratingsPath).then((snapshot) => snapshot.val());
    if (ratings) {
      const promises = Object.keys(ratings).map(async (ratingKey) => {
        const ratingPath = `ratings/${ratingKey}`;
        const rating = await handleGetData(ratingPath).then((snapshot) => snapshot.val());
        return rating;
      });

      const ratingsData = await Promise.all(promises);
      ratingsData && setRatings(ratingsData);
    }
  };

  useEffect(() => {
    const ratingsPath = `admin/create-room/rooms/${roomId}/roomRatings`;
    const ratingsRef = handleGetDataRef(ratingsPath);
    onValue(ratingsRef, () => {
      handleGetRatings(roomId);
    });

    return () => {};
  }, [roomId]);

  return isLoaded ? (
    <div className={cx('comments__wrapper')}>
      <div className={cx('comments__header')}>
        <div className={cx('comments__header__title')}>Đánh giá</div>
        <div className={cx('comments__header__rate__wrapper')}>
          <div className={cx('comments__header__rate__quantity')}>{`${
            ratings ? Object.keys(ratings).length : 0
          } đánh giá`}</div>
          <div className={cx('comments__header__rate__quantity__text')}>
            {ratings && handleGetAvgStar(ratings)}
          </div>
          <img className={cx('comments__header__rate__quantity__img')} src={images.starIcon} />
        </div>
      </div>
      <div className={cx('comments--main__wrapper')}>
        {Object.keys(user).length > 0 ? (
          <CreateComment user={user} roomId={roomId} roomData={roomData} />
        ) : (
          <Link to={'/sign-in'} className={cx('comment--main__signin__btn')}>
            <Button type="primary" ghost>
              Đăng nhập để bình luận
            </Button>
          </Link>
        )}

        <div className={cx('comments--main__comment__list')}>
          {/* map render  */}
          {ratings
            ? Object.keys(ratings).map((ratingKey) =>
                user?.uid === ratings[ratingKey].uid ? null : (
                  <CommentItem
                    key={`comments--main__comment__list__${ratingKey}`}
                    ratingData={ratings[ratingKey]}
                  />
                )
              )
            : null}
        </div>
      </div>
    </div>
  ) : (
    <Stack>
      <Grid container>
        <Grid item xs={2}>
          <Skeleton variant="circular" height={80} width={80}></Skeleton>
        </Grid>
        <Grid item xs={10}>
          <Skeleton variant="text" height={80}></Skeleton>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Comments;
