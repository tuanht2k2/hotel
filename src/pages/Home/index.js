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
              src="https://cdn1.tablethotels.com/media/ecs/global/email/assets/20200402_Zoom/TabletHotels_Public-Mirrored.jpg"
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
              src="https://cdn-clakn.nitrocdn.com/ZMLOYQkeFDkqDYTmCLYthpixBbhBLKdj/assets/static/optimized/wp-content/uploads/2018/03/30ee1df08c055fd481808818f999d1ed.crew-89808-unsplash.jpg"
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
              MKTHM Luxury là phân khúc khách sạn hạng sang cao cấp nhất của MKTHM, nằm ở các thành
              phố lớn và trung tâm du lịch nổi tiếng trong nước và quốc tế. Quy mô lớn và đẳng cấp
              khác biệt, MKTHM Luxury mang đến cho khách hàng không gian nghỉ dưỡng tuyệt vời mang
              đậm giá trị Việt đến từ dịch vụ tận tâm và văn hóa ẩm thực bản địa độc đáo
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
