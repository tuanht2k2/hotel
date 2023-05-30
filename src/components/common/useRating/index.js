import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import style from './useRating.module.scss';

const cx = classNames.bind(style);

function useRating(defaultRating) {
  const [rating, setRating] = useState(defaultRating || 5);
  const [hover, setHover] = useState(0);

  return {
    useRatingRender: (
      <div className={cx('star-rating')}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={cx(index <= (hover || rating) ? 'on' : 'off')}
              onClick={() => !defaultRating && setRating(index)}
              onMouseEnter={() => !defaultRating && setHover(index)}
              onMouseLeave={() => !defaultRating && setHover(rating)}
            >
              <span className={cx('star')}>&#9733;</span>
            </button>
          );
        })}

        <span
          className={cx(
            'value',
            rating == 1
              ? 'very-bad'
              : rating == 2
              ? 'bad'
              : rating == 3
              ? 'normal'
              : rating == 4
              ? 'good'
              : 'very-good'
          )}
        >
          {rating == 1
            ? 'Tệ'
            : rating == 2
            ? 'Không thích'
            : rating == 3
            ? 'Tạm được'
            : rating == 4
            ? 'Hài lòng'
            : 'Rất hài lòng'}
        </span>
      </div>
    ),
    rating,
  };
}

export default useRating;
