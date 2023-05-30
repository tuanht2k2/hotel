import { Fragment, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { Button } from 'antd';

import HeadlessTippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import useRating from '../../common/useRating';

import images from '../../../assets/images';

import { onValue } from 'firebase/database';

import {
  handleGetData,
  handleGetDataRef,
  handlePushData,
  handleRemoveData,
  handleSetData,
} from '../../../utils/database';

import style from './CreateComment.module.scss';
import { handleGetFormatTime } from '../../../utils/time';

const cx = classNames.bind(style);

function CreateComment({ user, roomId, roomData }) {
  const [existingRating, setExistingRating] = useState(null);
  const [ratingTextValue, setRatingTextValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const { useRatingRender, rating } = useRating(existingRating?.rating?.data?.star);

  // check did user rate and get it
  const handleGetExistingRating = async (roomId, uid) => {
    const roomData = await handleGetData(`admin/create-room/rooms/${roomId}`).then((snapshot) =>
      snapshot.val()
    );

    const roomRatings = roomData?.roomRatings;

    if (roomRatings) {
      // get the key of the existing rating
      const ratingKey = Object.keys(roomRatings).find((ratingKey) => {
        const rating = roomRatings[ratingKey];
        return rating.uid === uid;
      });

      // get data of the existing rating
      ratingKey
        ? handleGetData(`ratings/${ratingKey}`).then(
            (snapshot) =>
              snapshot.val() && setExistingRating({ rating: snapshot.val(), key: ratingKey })
          )
        : setExistingRating(null);
    } else setExistingRating(null);
  };

  // submit rating
  const handleSendRating = async (uid, roomId) => {
    const ratingObj = {
      uid,
      roomId,
      data: { star: rating, text: ratingTextValue, timeCreated: Date.now() },
    };

    const newRatingKey = await handlePushData(`ratings`, ratingObj).then(
      (snapshot) => snapshot.key
    );

    const roomRatingsPath = `admin/create-room/rooms/${roomId}/roomRatings/${newRatingKey}`;
    handleSetData(roomRatingsPath, { uid, roomId });

    const userRatingsPath = `users/${uid}/ratings/${newRatingKey}`;
    handleSetData(userRatingsPath, { uid, roomId });
  };

  //check enter and shift + enter
  const handleRatingKeyDown = (e) => {
    if (e.keyCode == 13) {
      if (!e.shiftKey) {
        e.preventDefault();
        handleSendRating(user.uid, roomId);
      }
    }
  };

  const handleDeleteRating = async (uid, roomId, ratingId) => {
    const ratingPath = `ratings/${ratingId}`;
    const userRatingPath = `users/${uid}/ratings/${ratingId}`;
    const roomRatingPath = `admin/create-room/rooms/${roomId}/roomRatings/${ratingId}`;

    Promise.all([
      handleRemoveData(roomRatingPath),
      handleRemoveData(ratingPath),
      handleRemoveData(userRatingPath),
    ]);
  };

  useEffect(() => {
    const ratingsPath = `users/${user.uid}/ratings`;
    const ratingsRef = handleGetDataRef(ratingsPath);
    onValue(ratingsRef, () => {
      handleGetExistingRating(roomId, user.uid).then(() => {
        setIsLoaded(true);
      });
    });
  }, [roomId]);

  return isLoaded ? (
    <div className={cx('comments--main__create__comment')}>
      <div className={cx('comments--main__create__comment__header')}>
        {existingRating ? 'Đánh giá của bạn' : 'Viết đánh giá của bạn'}
      </div>
      <div className={cx('comments--main__create__comment__content')}>
        <div className={cx('comments--main__create__comment__content__rating')}>
          Chất lượng: {useRatingRender}
        </div>
        <div className={cx('comments--main__create__comment__content__main')}>
          <img
            className={cx('comments--main__create__comment__content__main__user__avatar')}
            src={user.photoURL || images.defaultAvatar}
          />
          {existingRating ? (
            <div className={cx('comments--main__create__comment__content__main--existing')}>
              <div className={cx('comments--main__create__comment__content__main--existing__top')}>
                <div
                  className={cx('comments--main__create__comment__content__main--existing__detail')}
                >
                  {user.fullName}
                  <div
                    className={cx(
                      'comments--main__create__comment__content__main--existing__detail__text'
                    )}
                  >
                    {existingRating.rating.data.text}
                  </div>
                </div>
                <HeadlessTippy
                  trigger="click"
                  interactive
                  placement="right-start"
                  render={() => (
                    <div
                      className={cx(
                        'comments--main__create__comment__content__main--existing__action__tippy__wrapper'
                      )}
                    >
                      <div
                        className={cx(
                          'comments--main__create__comment__content__main--existing__action__tippy__item'
                        )}
                      >
                        Sửa đánh giá
                      </div>
                      <div
                        className={cx(
                          'comments--main__create__comment__content__main--existing__action__tippy__item'
                        )}
                        onClick={() => {
                          handleDeleteRating(user.uid, roomId, existingRating.key);
                        }}
                      >
                        Xóa đánh giá
                      </div>
                    </div>
                  )}
                >
                  <div
                    className={cx(
                      'comments--main__create__comment__content__main--existing__action',
                      'global__icon__wrapper'
                    )}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </HeadlessTippy>
              </div>
              <div
                className={cx('comments--main__create__comment__content__main--existing__bottom')}
              >
                {handleGetFormatTime(existingRating.rating.data.timeCreated)}
              </div>
            </div>
          ) : (
            <Fragment>
              <textarea
                className={cx('comments--main__create__comment__content__main__textarea')}
                placeholder="Viết đánh giá của bạn"
                value={ratingTextValue}
                onChange={(e) => {
                  setRatingTextValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleRatingKeyDown(e);
                }}
              ></textarea>
              <div
                className={cx('comments--main__create__comment__content__main__submit__comment')}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    handleSendRating(user.uid, roomId);
                  }}
                >
                  Gửi đánh giá
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default CreateComment;
