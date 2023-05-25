import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';

import images from '../../../../assets/images';

import style from './RoomList.module.scss';

const cx = classNames.bind(style);

function RoomList() {
  return (
    <div className={cx('bookings__room--list', 'grid')}>
      <div className={cx('row')}>
        <div className={cx('col c-6 m-4 l-3')}>
          <Link to={''} className={cx('room--list__item--wrapper')}>
            <div className={cx('item__img--wrapper')}>
              <img
                className={cx('item__img--tag')}
                src="https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"
              />
              <div className={cx('item__img__overlay--wrapper')}>
                <div className={cx('item__img__overlay')}></div>
              </div>
              <img
                className={cx('item__img__classification--img')}
                src={images.premiumIcon}
              />
            </div>
            <div className={cx('item__detail--wrapper')}>
              <div className={cx('item__detail__name')}>
                <div className={cx('item__detail__name--label', 'label')}>
                  Tên phòng:
                </div>
                <div className={cx('item__detail__name--value', 'value')}>
                  911
                </div>
              </div>
              <div className={cx('item__detail__desc')}>
                <div className={cx('item__detail__desc__type')}>Phòng đôi</div>
                <div className={cx('item__detail__desc__classification')}>
                  Premium
                </div>
              </div>
              <div className={cx('item__detail__price')}>
                <div className={cx('item__detail__price__label', 'label')}>
                  Giá :
                </div>
                <div className={cx('item__detail__price__value', 'value')}>
                  1.000.000 VND/đêm
                </div>
              </div>
              <div className={cx('separator')}></div>
              <div className={cx('item__detail__rate')}>
                <div className={cx('item__detail__rate--avg')}>
                  <div
                    className={cx('item__detail__rate--avg__title', 'value')}
                  >
                    4.2
                  </div>
                  <img
                    className={cx('item__detail__rate--avg__img')}
                    src={images.starIcon}
                  />
                </div>

                <div className={cx('item__detail__rate--quantity', 'value')}>
                  102 lượt đánh giá
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomList;
