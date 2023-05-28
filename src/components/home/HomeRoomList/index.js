import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import images from '../../../assets/images';
import style from './HomeRoomList.module.scss';

const cx = classNames.bind(style);

function HomeRoomList() {
  return (
    <div className={cx('grid')}>
      <div className={cx('row')}>
        {/* Map data */}
        <div className={cx('col c-6 m-6 l-3')}>
          <Link to={''} className={cx('room--list__item--wrapper')}>
            <img
              className={cx('room--list__item__img')}
              src="https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000"
            />
            <div className={cx('room--list__item__overlay--wrapper')}>
              <div className={cx('room--list__item__overlay')}>
                <div className={cx('room--list__item__overlay__room--classification')}>
                  Phòng thường
                </div>
                <div className={cx('room--list__item__overlay--bottom')}>
                  <div className={cx('room--list__item__overlay--bottom__room--price')}>
                    <div className={cx('room--list__item__overlay--bottom__room--price__label')}>
                      Giá tiền:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--price__value')}>
                      1000000/đêm
                    </div>
                  </div>
                  <div className={cx('room--list__item__overlay--bottom__room--rate')}>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__label')}>
                      Đánh giá:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__value')}>
                      4.2
                    </div>
                    <img
                      className={cx('room--list__item__overlay--bottom__room--rate__icon')}
                      src={images.starIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={cx('col c-6 m-6 l-3')}>
          <Link to={''} className={cx('room--list__item--wrapper')}>
            <img
              className={cx('room--list__item__img')}
              src="https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000"
            />
            <div className={cx('room--list__item__overlay--wrapper')}>
              <div className={cx('room--list__item__overlay')}>
                <div className={cx('room--list__item__overlay__room--classification')}>
                  Phòng thường
                </div>
                <div className={cx('room--list__item__overlay--bottom')}>
                  <div className={cx('room--list__item__overlay--bottom__room--price')}>
                    <div className={cx('room--list__item__overlay--bottom__room--price__label')}>
                      Giá tiền:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--price__value')}>
                      1000000/đêm
                    </div>
                  </div>
                  <div className={cx('room--list__item__overlay--bottom__room--rate')}>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__label')}>
                      Đánh giá:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__value')}>
                      4.2
                    </div>
                    <img
                      className={cx('room--list__item__overlay--bottom__room--rate__icon')}
                      src={images.starIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={cx('col c-6 m-6 l-3')}>
          <Link to={''} className={cx('room--list__item--wrapper')}>
            <img
              className={cx('room--list__item__img')}
              src="https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000"
            />
            <div className={cx('room--list__item__overlay--wrapper')}>
              <div className={cx('room--list__item__overlay')}>
                <div className={cx('room--list__item__overlay__room--classification')}>
                  Phòng thường
                </div>
                <div className={cx('room--list__item__overlay--bottom')}>
                  <div className={cx('room--list__item__overlay--bottom__room--price')}>
                    <div className={cx('room--list__item__overlay--bottom__room--price__label')}>
                      Giá tiền:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--price__value')}>
                      1000000/đêm
                    </div>
                  </div>
                  <div className={cx('room--list__item__overlay--bottom__room--rate')}>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__label')}>
                      Đánh giá:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__value')}>
                      4.2
                    </div>
                    <img
                      className={cx('room--list__item__overlay--bottom__room--rate__icon')}
                      src={images.starIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={cx('col c-6 m-6 l-3')}>
          <Link to={''} className={cx('room--list__item--wrapper')}>
            <img
              className={cx('room--list__item__img')}
              src="https://imageio.forbes.com/specials-images/imageserve/5cdb058a5218470008b0b00f/Nobu-Ryokan-Malibu/0x0.jpg?format=jpg&height=1009&width=2000"
            />
            <div className={cx('room--list__item__overlay--wrapper')}>
              <div className={cx('room--list__item__overlay')}>
                <div className={cx('room--list__item__overlay__room--classification')}>
                  Phòng thường
                </div>
                <div className={cx('room--list__item__overlay--bottom')}>
                  <div className={cx('room--list__item__overlay--bottom__room--price')}>
                    <div className={cx('room--list__item__overlay--bottom__room--price__label')}>
                      Giá tiền:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--price__value')}>
                      1000000/đêm
                    </div>
                  </div>
                  <div className={cx('room--list__item__overlay--bottom__room--rate')}>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__label')}>
                      Đánh giá:
                    </div>
                    <div className={cx('room--list__item__overlay--bottom__room--rate__value')}>
                      4.2
                    </div>
                    <img
                      className={cx('room--list__item__overlay--bottom__room--rate__icon')}
                      src={images.starIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeRoomList;
