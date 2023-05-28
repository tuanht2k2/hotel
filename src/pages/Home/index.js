import classNames from 'classnames/bind';

import { Carousel, Button } from 'antd';

import images from '../../assets/images';
import style from './Home.module.scss';
import HomeRoomList from '../../components/home/HomeRoomList';

const cx = classNames.bind(style);

function Home() {
  return (
    <div className={cx('home__wrapper')}>
      <div className={cx('home__carousel__wrapper')}>
        <Carousel autoplaySpeed={3000} autoplay>
          <div className={cx('home__carousel__item__wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://wallpapers.com/images/featured/sdr508awonqxixqe.jpg"
            />
          </div>
          <div className={cx('home__carousel__item__wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://images7.alphacoders.com/362/362619.jpg"
            />
          </div>
          <div className={cx('home__carousel__item__wrapper')}>
            <img
              className={cx('home__carousel__item__img')}
              src="https://pixelz.cc/wp-content/uploads/2018/12/costa-adeje-gran-hotel-pool-spain-uhd-4k-wallpaper.jpg"
            />
          </div>
        </Carousel>
      </div>
      <div className={cx('home__content__wrapper')}>
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
        <div className={cx('home__content__video__wrapper')}>
          <iframe
            className={cx('home__content__video')}
            src="https://www.youtube-nocookie.com/embed/9I2xta0ahIs"
            title="Introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div id="booking" className={cx('home__content__room__list__wrapper')}>
          <div className={cx('home__content__room__list--header')}>Đặt phòng ngay</div>
          <HomeRoomList />
        </div>
      </div>
    </div>
  );
}

export default Home;
