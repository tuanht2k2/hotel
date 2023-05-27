import classNames from 'classnames/bind';

import { Carousel, Button } from 'antd';

import images from '../../assets/images';
import style from './Home.module.scss';
import HomeRoomList from '../../components/home/HomeRoomList';

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx('home--wrapper')}>
      <div className={cx('home__carousel--wrapper')}>
        <Carousel autoplay>
          <div className={cx('home__carousel__item--wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://pix10.agoda.net/hotelImages/659/6592334/6592334_19022704090072546036.jpg?ca=7&ce=1&s=1024x768"
            />
          </div>
          <div className={cx('home__carousel__item--wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://pix10.agoda.net/hotelImages/659/6592334/6592334_19022704090072546036.jpg?ca=7&ce=1&s=1024x768"
            />
          </div>
          <div className={cx('home__carousel__item--wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://pix10.agoda.net/hotelImages/659/6592334/6592334_19022704090072546036.jpg?ca=7&ce=1&s=1024x768"
            />
          </div>
        </Carousel>
      </div>
      <div className={cx('home__content--wrapper')}>
        <div className={cx('home__content--intro')}>
          <div className={cx('home__content--intro--left')}>
            <img className={cx('home__content--intro--left-img')} src={images.homeIntroImage} />
          </div>
          <div className={cx('home__content--intro--right')}>
            <div className={cx('home__content--intro--right__header')}>
              Luxury & Comfort Our services and wonders of MKTHM
            </div>
            <div className={cx('home__content--intro--right__content')}>
              The concept and service of the best luxury hotels in VietName in our sophisticated
              Urban Double and Unique Junior Suite rooms, with the possibility of enjoying a
              furnished terrace in our Double Urban Loft and Unique Junior Loft Suite.
            </div>
            <a href="#booking" className={cx('home__content--intro--right-btn')}>
              <Button type="primary" ghost danger>
                Xem thêm về dịch vụ của chúng tôi
              </Button>
            </a>
          </div>
        </div>
        <div className={cx('home__content__video--wrapper')}>
          <iframe
            className={cx('home__content__video')}
            src="https://www.youtube.com/embed/WJThNmE_ehE"
            title="Introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div id="booking" className={cx('home__content__room--list--wrapper')}>
          <div className={cx('home__content__room--list--header')}>Đặt phòng ngay</div>
          <HomeRoomList />
        </div>
      </div>
    </div>
  );
}

export default Home;
