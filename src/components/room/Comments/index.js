import { useState } from 'react';

import classNames from 'classnames/bind';

import images from '../../../assets/images';
import style from './Comments.module.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import useRating from '../../common/useRating';
import CommentItem from '../CommentItem';

const cx = classNames.bind(style);

function Comments({ handleToggleSignInTippy }) {
  const [user, setUser] = useState({ uid: 123 });
  const [commentValue, setCommentValue] = useState('');

  const { useRatingRender, rating } = useRating();

  return (
    <div className={cx('comments--wrapper')}>
      <div className={cx('comments__header')}>
        <div className={cx('comments__header__title')}>Đánh giá</div>
        <div className={cx('comments__header__rate--wrapper')}>
          <div className={cx('comments__header__rate__quantity')}>124 lượt đánh giá</div>
          <div className={cx('comments__header__rate__quantity__text')}>4.9</div>
          <img className={cx('comments__header__rate__quantity__img')} src={images.starIcon} />
        </div>
      </div>
      <div className={cx('comments--main--wrapper')}>
        {Object.keys(user).length > 0 ? (
          <div className={cx('comments--main__create__comment')}>
            <div className={cx('comments--main__create__comment__header')}>
              Viết đánh giá của bạn
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
                <textarea
                  className={cx('comments--main__create__comment__content__main__textarea')}
                  placeholder="Viết đánh giá của bạn"
                  value={commentValue}
                  onChange={(e) => {
                    setCommentValue(e.target.value);
                  }}
                ></textarea>
                <div
                  className={cx('comments--main__create__comment__content__main__submit__comment')}
                >
                  <Button type="primary">Gửi đánh giá</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link to={'/sign-in'} className={cx('comment--main__signin__btn')}>
            <Button type="primary" ghost>
              Đăng nhập để bình luận
            </Button>
          </Link>
        )}

        <div className={cx('comments--main__comment__list')}>
          {/* map render  */}
          <CommentItem />
        </div>
      </div>
    </div>
  );
}

export default Comments;
