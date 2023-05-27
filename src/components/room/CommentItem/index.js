import classNames from 'classnames/bind';

import style from './CommentItem.module.scss';
import images from '../../../assets/images';
import useRating from '../../common/useRating';

const cx = classNames.bind(style);

function CommentItem() {
  const user = {};

  const useRatingRender = useRating(4).useRatingRender;

  return (
    <div className={cx('comment--wrapper')}>
      <img className={cx('comment__user__img')} src={user.photoURL || images.defaultAvatar} />
      <div className={cx('comment__user--main')}>
        <div className={cx('comment__user--main__user__name')}>Lê Quốc Mạnh</div>
        <div className={cx('comment__user--main__rating')}>{useRatingRender}</div>
        <div className={cx('comment__user--main__text')}>Phòng chất vkl</div>
        <div className={cx('comment__user--main__time')}>2/5/2023</div>
      </div>
    </div>
  );
}

export default CommentItem;
