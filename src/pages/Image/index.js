import classNames from 'classnames/bind';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { handleGetData } from '../../utils/database';

import images from '../../assets/images';

import style from './Image.module.scss';

const cx = classNames.bind(style);

function Image() {
  const { roomId, imageIndex } = useParams();
  const navigate = useNavigate();

  const [imagePath, setImagePath] = useState('');
  const [imageScale, setImageScale] = useState(1);

  const handleGetImage = (imageIndex) => {
    const imagePath = `admin/create-room/rooms/${roomId}/roomImage/${imageIndex}`;
    handleGetData(imagePath).then((snapshot) => {
      setImagePath(snapshot.val()?.imageUrl || '');
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleZoom = (action) => {
    if (action === 'ZOOM_IN') {
      setImageScale((prev) => prev + 0.2);
    } else {
      setImageScale((prev) => prev - 0.2);
    }
  };

  useEffect(() => {
    handleGetImage(imageIndex);

    document.title = 'Ảnh';

    return () => {};
  }, []);

  return (
    <div className={cx('image__wrapper')}>
      <div className={cx('image--control')}>
        <div className={cx('image--control__left')}>
          <span
            className={cx('image--control__left__icon__wrapper')}
            onClick={() => {
              handleBack();
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <Link to={'/'} className={cx('image--control__left--brand--icon__wrapper')}>
            <img className={cx('logo--img')} src={images.logo} />
          </Link>
        </div>
        <div className={cx('image--control__right')}>
          <span
            className={cx('image--control__right__icon__wrapper', imageScale >= 1.9 && 'disabled')}
            onClick={() => {
              imageScale < 1.9 && handleZoom('ZOOM_IN');
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
          </span>
          <span
            className={cx(
              'icon__wrapper',
              'image--control__right__icon__wrapper',
              imageScale <= 1 && 'disabled'
            )}
            onClick={() => {
              imageScale > 1 && handleZoom('ZOOM_OUT');
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
          </span>
        </div>
      </div>
      <img
        className={cx('image__tag')}
        src={imagePath}
        alt="Ảnh này đã bị xóa"
        style={{ transform: `scale(${imageScale})` }}
      />
    </div>
  );
}

export default Image;
