import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import { Carousel } from 'antd';

import style from './RoomImagesCarousel.module.scss';

const cx = classNames.bind(style);

function RoomImagesCarousel({ roomId, roomImages }) {
  return (
    <Carousel autoplay>
      {roomImages?.map((image, index) => (
        <Link
          key={`room__carousel__image__${image.uid}`}
          className={cx('room__image__carousel__item')}
          to={`images/${index}`}
        >
          <img className={cx('room__image__carousel__img')} src={image.imageUrl} />
        </Link>
      ))}
    </Carousel>
  );
}

export default RoomImagesCarousel;
